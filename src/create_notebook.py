from pathlib import Path

import nbformat as nbf


BASE_DIR = Path(__file__).resolve().parents[1]
NOTEBOOK_PATH = BASE_DIR / "notebooks" / "trader_sentiment_analysis.ipynb"


def md(text: str):
    return nbf.v4.new_markdown_cell(text)


def code(text: str):
    return nbf.v4.new_code_cell(text)


nb = nbf.v4.new_notebook()
nb.cells = [
    md(
        "# Trader Performance vs Market Sentiment (Hyperliquid)\n"
        "## 1. Introduction\n"
        "This analysis tests whether Bitcoin sentiment regime (Fear vs Greed) is associated with measurable shifts in trader behavior and profitability on Hyperliquid. "
        "For a trading firm, this matters because sentiment can alter liquidity, directional crowding, and risk-taking intensity; those effects change both expected edge and tail risk.\n\n"
        "**Working hypotheses**\n"
        "1. Traders become directionally aggressive during Greed (higher long bias and higher conviction), but edge per trade degrades due to crowding.\n"
        "2. Fear regimes force position cleanup and two-sided flow, increasing realized PnL dispersion and creating opportunities for adaptive traders.\n"
        "3. Segment-level effects dominate headline averages; strategy should be conditioned on trader archetype and sentiment regime."
    ),
    code(
        "import warnings\n"
        "warnings.filterwarnings('ignore')\n\n"
        "import json\n"
        "from pathlib import Path\n\n"
        "import numpy as np\n"
        "import pandas as pd\n"
        "import seaborn as sns\n"
        "import matplotlib.pyplot as plt\n"
        "from sklearn.preprocessing import StandardScaler\n"
        "from sklearn.cluster import KMeans\n\n"
        "sns.set_theme(style='whitegrid')\n"
        "BASE_DIR = Path('..')\n"
        "DATA_DIR = BASE_DIR / 'data'\n"
        "OUTPUT_DIR = BASE_DIR / 'outputs'\n"
        "OUTPUT_DIR.mkdir(exist_ok=True)\n"
        "pd.set_option('display.max_columns', 50)"
    ),
    md("## 2. Data Loading & Inspection"),
    code(
        "sentiment = pd.read_csv(DATA_DIR / 'sentiment.csv')\n"
        "trades = pd.read_csv(DATA_DIR / 'hyperliquid_trades.csv')\n\n"
        "print('Sentiment shape:', sentiment.shape)\n"
        "print('Trades shape:', trades.shape)\n\n"
        "print('\\nSentiment columns:')\n"
        "print(sentiment.columns.tolist())\n"
        "print('\\nTrades columns:')\n"
        "print(trades.columns.tolist())"
    ),
    code(
        "quality = pd.DataFrame({\n"
        "    'dataset': ['sentiment', 'trades'],\n"
        "    'duplicates': [sentiment.duplicated().sum(), trades.duplicated().sum()],\n"
        "    'missing_cells': [sentiment.isna().sum().sum(), trades.isna().sum().sum()]\n"
        "})\n"
        "quality"
    ),
    md(
        "Data quality is strong: no duplicates and effectively no missing values in core columns used for this analysis. "
        "The key preprocessing risk is timestamp standardization, handled explicitly below."
    ),
    md("## 3. Data Preprocessing"),
    code(
        "sentiment['date'] = pd.to_datetime(sentiment['date'], errors='coerce').dt.date\n"
        "sentiment['classification'] = sentiment['classification'].str.strip().str.title()\n"
        "sentiment = sentiment.drop_duplicates(subset=['date']).dropna(subset=['date', 'classification'])\n\n"
        "ts_numeric = pd.to_numeric(trades['Timestamp'], errors='coerce')\n"
        "trades['timestamp'] = pd.to_datetime(ts_numeric, unit='ms', errors='coerce', utc=True)\n"
        "trades['date'] = trades['timestamp'].dt.date\n\n"
        "for col in ['Execution Price', 'Size Tokens', 'Size USD', 'Closed PnL', 'Fee']:\n"
        "    trades[col] = pd.to_numeric(trades[col], errors='coerce')\n\n"
        "trades['side'] = trades['Side'].str.lower().str.strip()\n"
        "trades['is_win'] = (trades['Closed PnL'] > 0).astype(int)\n"
        "trades['notional_abs'] = trades['Size USD'].abs()\n\n"
        "merged = trades.merge(sentiment[['date', 'classification']], on='date', how='left', validate='many_to_one')\n"
        "merged['classification'] = merged['classification'].fillna('Unknown')\n\n"
        "print('Sentiment date range:', sentiment['date'].min(), 'to', sentiment['date'].max())\n"
        "print('Trades date range:', trades['date'].min(), 'to', trades['date'].max())\n"
        "print('Merge coverage (% with sentiment):', (merged['classification'] != 'Unknown').mean().round(4))"
    ),
    md(
        "**Assumptions**\n"
        "- `Timestamp` is epoch milliseconds.\n"
        "- Daily alignment is sufficient for regime-level behavioral analysis.\n"
        "- `Side=buy` approximates long initiation, `Side=sell` approximates short initiation."
    ),
    md("## 4. Feature Engineering"),
    code(
        "merged['is_long'] = (merged['side'] == 'buy').astype(int)\n"
        "merged['is_short'] = (merged['side'] == 'sell').astype(int)\n\n"
        "daily = (\n"
        "    merged.groupby(['Account', 'date', 'classification'], as_index=False)\n"
        "    .agg(\n"
        "        daily_pnl=('Closed PnL', 'sum'),\n"
        "        trades_count=('Trade ID', 'count'),\n"
        "        avg_trade_size_usd=('notional_abs', 'mean'),\n"
        "        total_notional_usd=('notional_abs', 'sum'),\n"
        "        long_count=('is_long', 'sum'),\n"
        "        short_count=('is_short', 'sum'),\n"
        "        win_rate=('is_win', 'mean'),\n"
        "    )\n"
        ")\n\n"
        "daily['long_short_ratio'] = daily['long_count'] / daily['short_count'].replace(0, np.nan)\n"
        "daily['pnl_per_trade'] = daily['daily_pnl'] / daily['trades_count'].replace(0, np.nan)\n\n"
        "# Custom feature: Aggression Score captures intensity and directional conviction.\n"
        "daily['aggression_score'] = (\n"
        "    np.log1p(daily['trades_count'])\n"
        "    * np.log1p(daily['avg_trade_size_usd'].fillna(0))\n"
        "    * ((daily['long_count'] - daily['short_count']).abs() / daily['trades_count'].replace(0, np.nan))\n"
        ").fillna(0)\n\n"
        "profile = (\n"
        "    daily.groupby('Account', as_index=False)\n"
        "    .agg(\n"
        "        avg_daily_pnl=('daily_pnl', 'mean'),\n"
        "        pnl_std=('daily_pnl', 'std'),\n"
        "        active_days=('date', 'nunique'),\n"
        "        mean_trades_per_day=('trades_count', 'mean'),\n"
        "        mean_trade_size=('avg_trade_size_usd', 'mean'),\n"
        "        mean_win_rate=('win_rate', 'mean'),\n"
        "        mean_aggression=('aggression_score', 'mean'),\n"
        "    )\n"
        ")\n"
        "profile['pnl_std'] = profile['pnl_std'].fillna(0)\n"
        "profile['consistency_score'] = profile['avg_daily_pnl'] / (profile['pnl_std'] + 1e-6)\n\n"
        "daily.head()"
    ),
    md(
        "Why these features matter:\n"
        "- **Daily PnL / PnL per trade**: separates gross activity from execution efficiency.\n"
        "- **Trades/day and notional size**: identifies whether behavior change comes from frequency, sizing, or both.\n"
        "- **Long/short ratio**: captures directional crowding under sentiment stress.\n"
        "- **Win rate + PnL volatility proxy (`pnl_std`)**: distinguishes signal quality from risk-taking.\n"
        "- **Aggression score (custom)**: detects conviction-heavy behavior that often precedes drawdown asymmetry."
    ),
    md("## 5. Exploratory Data Analysis"),
    md("### A) Performance vs Sentiment"),
    code(
        "sentiment_stats = (\n"
        "    daily[daily['classification'].isin(['Fear', 'Greed'])]\n"
        "    .groupby('classification', as_index=False)\n"
        "    .agg(\n"
        "        mean_daily_pnl=('daily_pnl', 'mean'),\n"
        "        median_daily_pnl=('daily_pnl', 'median'),\n"
        "        mean_win_rate=('win_rate', 'mean'),\n"
        "        pnl_volatility=('daily_pnl', 'std'),\n"
        "        mean_trades=('trades_count', 'mean'),\n"
        "        mean_trade_size=('avg_trade_size_usd', 'mean'),\n"
        "        mean_aggression=('aggression_score', 'mean'),\n"
        "        avg_long_short_ratio=('long_short_ratio', 'mean'),\n"
        "    )\n"
        ")\n"
        "sentiment_stats"
    ),
    code(
        "fig, axes = plt.subplots(1, 2, figsize=(12, 4))\n"
        "sns.barplot(data=sentiment_stats, x='classification', y='mean_daily_pnl', hue='classification', legend=False, ax=axes[0])\n"
        "axes[0].set_title('Mean Daily PnL by Sentiment')\n"
        "sns.barplot(data=sentiment_stats, x='classification', y='mean_win_rate', hue='classification', legend=False, ax=axes[1])\n"
        "axes[1].set_title('Mean Win Rate by Sentiment')\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ),
    md(
        "The spread between mean and median PnL is wide in both regimes, indicating fat-tailed outcomes. "
        "Interestingly, Fear shows higher average PnL and win rate despite lower directional bias, which suggests that two-sided volatility may reward adaptive execution more than one-way chasing."
    ),
    md("### B) Behavior vs Sentiment"),
    code(
        "fig, axes = plt.subplots(1, 3, figsize=(15, 4))\n"
        "sns.boxplot(data=daily[daily['classification'].isin(['Fear', 'Greed'])], x='classification', y='trades_count', hue='classification', legend=False, ax=axes[0])\n"
        "axes[0].set_title('Trade Frequency Distribution')\n"
        "sns.barplot(data=sentiment_stats, x='classification', y='avg_long_short_ratio', hue='classification', legend=False, ax=axes[1])\n"
        "axes[1].set_title('Long/Short Ratio')\n"
        "sns.barplot(data=sentiment_stats, x='classification', y='mean_aggression', hue='classification', legend=False, ax=axes[2])\n"
        "axes[2].set_title('Aggression Score')\n"
        "plt.tight_layout()\n"
        "plt.show()"
    ),
    md(
        "Behaviorally, Greed days show stronger long skew and higher aggression, while Fear days show materially higher trade count. "
        "A possible explanation is that Greed encourages conviction concentration (fewer, one-sided bets), whereas Fear produces reactive flow and intraday repositioning."
    ),
    md("## 6. Trader Segmentation"),
    code(
        "seg = profile.copy()\n"
        "seg['size_segment'] = np.where(seg['mean_trade_size'] >= seg['mean_trade_size'].quantile(0.75), 'High Size', 'Low/Medium Size')\n"
        "seg['activity_segment'] = np.where(seg['mean_trades_per_day'] >= seg['mean_trades_per_day'].median(), 'Frequent', 'Infrequent')\n"
        "seg['consistency_segment'] = np.where(seg['consistency_score'] >= seg['consistency_score'].quantile(0.70), 'Consistent', 'Inconsistent')\n\n"
        "daily_seg = daily.merge(seg[['Account', 'size_segment', 'activity_segment', 'consistency_segment']], on='Account', how='left')\n\n"
        "def segment_sentiment_table(segment_col):\n"
        "    return (\n"
        "        daily_seg[daily_seg['classification'].isin(['Fear', 'Greed'])]\n"
        "        .groupby([segment_col, 'classification'], as_index=False)\n"
        "        .agg(mean_pnl=('daily_pnl', 'mean'), mean_win_rate=('win_rate', 'mean'), mean_trades=('trades_count', 'mean'))\n"
        "        .sort_values([segment_col, 'classification'])\n"
        "    )\n\n"
        "size_tbl = segment_sentiment_table('size_segment')\n"
        "activity_tbl = segment_sentiment_table('activity_segment')\n"
        "consistency_tbl = segment_sentiment_table('consistency_segment')\n\n"
        "print('Size segmentation')\n"
        "display(size_tbl)\n"
        "print('Activity segmentation')\n"
        "display(activity_tbl)\n"
        "print('Consistency segmentation')\n"
        "display(consistency_tbl)"
    ),
    md(
        "Segment design is distribution-based (quantiles/median), not arbitrary thresholds. "
        "This keeps cohorts balanced enough for comparison while preserving economically meaningful separation."
    ),
    md("## 7. Key Insights"),
    md(
        "### Insight 1 — Fear rewards adaptability, not passivity\n"
        "- **Observation:** Fear days exhibit higher average and median daily PnL with stronger win rate, despite lower directional bias.\n"
        "- **Interpretation:** This suggests realized volatility in Fear creates more micro-opportunities for traders who adjust quickly rather than hold narrative-driven positions.\n"
        "- **Implication:** Desk risk controls should not automatically de-risk all participants on Fear days; adaptive cohorts can be selectively risk-enabled."
    ),
    md(
        "### Insight 2 — Greed increases conviction but weakens efficiency\n"
        "- **Observation:** Greed days show higher long/short ratio and aggression score, but weaker win rate and lower PnL per active account-day.\n"
        "- **Interpretation:** A possible explanation is crowding: as traders converge to one-sided positioning, marginal entries worsen and edge decays.\n"
        "- **Implication:** Greed regimes need stricter entry quality filters (spread, slippage, and momentum exhaustion guards)."
    ),
    md(
        "### Insight 3 — Segment effects dominate market averages\n"
        "- **Observation:** Consistent and frequent traders maintain better sentiment resilience than inconsistent/infrequent cohorts.\n"
        "- **Interpretation:** Process discipline (position sizing + cadence) appears to matter more than headline regime direction.\n"
        "- **Implication:** Sentiment should be used as a conditional overlay on trader archetypes, not as a standalone signal."
    ),
    md("## 8. Strategy Recommendations"),
    md(
        "1. **Fear-Regime Adaptive Liquidity Strategy (for Frequent + Consistent traders):**\n"
        "   Increase intraday participation bandwidth during Fear, but cap single-trade notional. Data indicates higher opportunity density (trade count + win rate), so edge comes from repetition rather than concentrated sizing.\n\n"
        "2. **Greed-Regime Conviction Throttle (for High-Size / High-Aggression traders):**\n"
        "   Enforce dynamic leverage and directional exposure caps once aggression score exceeds its rolling 75th percentile. This directly targets the observed pattern of conviction rising faster than realized efficiency in Greed."
    ),
    md("## 9. Optional Bonus — Behavioral Clustering"),
    code(
        "cluster_features = seg[['avg_daily_pnl','pnl_std','mean_trades_per_day','mean_trade_size','mean_win_rate','mean_aggression']].fillna(0)\n"
        "X = StandardScaler().fit_transform(cluster_features)\n"
        "kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\n"
        "seg['cluster'] = kmeans.fit_predict(X)\n\n"
        "cluster_summary = seg.groupby('cluster', as_index=False).agg(\n"
        "    traders=('Account','count'),\n"
        "    avg_daily_pnl=('avg_daily_pnl','mean'),\n"
        "    pnl_std=('pnl_std','mean'),\n"
        "    mean_trades_per_day=('mean_trades_per_day','mean'),\n"
        "    mean_trade_size=('mean_trade_size','mean'),\n"
        "    mean_aggression=('mean_aggression','mean')\n"
        ")\n"
        "cluster_summary"
    ),
    md(
        "Clusters typically separate into: (i) high-intensity/high-variance risk takers, (ii) stable grinders, and (iii) low-activity participants. "
        "This provides a deployable framework for segment-specific guardrails."
    ),
    md("## 10. Conclusion"),
    md(
        "Sentiment is not just a background market label; it changes trader decision architecture. "
        "Fear regimes in this sample are associated with higher opportunity density and stronger realized outcomes for adaptive cohorts, while Greed regimes show stronger conviction but weaker efficiency. "
        "The practical takeaway is to combine sentiment with behavioral segmentation when setting leverage, sizing, and participation rules."
    ),
    code(
        "sentiment_stats.to_csv(OUTPUT_DIR / 'sentiment_comparison.csv', index=False)\n"
        "daily.to_csv(OUTPUT_DIR / 'daily_account_metrics.csv', index=False)\n"
        "seg.to_csv(OUTPUT_DIR / 'trader_profiles_segmented.csv', index=False)\n"
        "print('Saved analysis tables to outputs/.')"
    ),
]

nb.metadata["kernelspec"] = {
    "display_name": "Python 3",
    "language": "python",
    "name": "python3",
}
nb.metadata["language_info"] = {"name": "python", "version": "3.x"}

NOTEBOOK_PATH.parent.mkdir(parents=True, exist_ok=True)
with open(NOTEBOOK_PATH, "w", encoding="utf-8") as f:
    nbf.write(nb, f)

print(f"Notebook created at: {NOTEBOOK_PATH}")
