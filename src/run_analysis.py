import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
OUTPUT_DIR = BASE_DIR / "outputs"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def load_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    sentiment = pd.read_csv(DATA_DIR / "sentiment.csv")
    trades = pd.read_csv(DATA_DIR / "hyperliquid_trades.csv")
    return sentiment, trades


def preprocess(sentiment: pd.DataFrame, trades: pd.DataFrame) -> pd.DataFrame:
    sentiment = sentiment.copy()
    trades = trades.copy()

    sentiment["date"] = pd.to_datetime(sentiment["date"], errors="coerce").dt.date
    sentiment["classification"] = sentiment["classification"].str.strip().str.title()
    sentiment = sentiment.drop_duplicates(subset=["date"]).dropna(subset=["date", "classification"])

    ts_numeric = pd.to_numeric(trades["Timestamp"], errors="coerce")
    trades["timestamp"] = pd.to_datetime(ts_numeric, unit="ms", errors="coerce", utc=True)
    trades["date"] = trades["timestamp"].dt.date

    numeric_cols = ["Execution Price", "Size Tokens", "Size USD", "Closed PnL", "Fee"]
    for col in numeric_cols:
        trades[col] = pd.to_numeric(trades[col], errors="coerce")

    trades["side"] = trades["Side"].astype(str).str.lower().str.strip()
    trades["is_win"] = (trades["Closed PnL"] > 0).astype(int)
    trades["notional_abs"] = trades["Size USD"].abs()

    merged = trades.merge(
        sentiment[["date", "classification"]],
        on="date",
        how="left",
        validate="many_to_one",
    )
    merged["classification"] = merged["classification"].fillna("Unknown")
    return sentiment, trades, merged


def build_daily_account_features(merged: pd.DataFrame) -> pd.DataFrame:
    df = merged.copy()
    df["is_long"] = (df["side"] == "buy").astype(int)
    df["is_short"] = (df["side"] == "sell").astype(int)

    daily = (
        df.groupby(["Account", "date", "classification"], as_index=False)
        .agg(
            daily_pnl=("Closed PnL", "sum"),
            trades_count=("Trade ID", "count"),
            avg_trade_size_usd=("notional_abs", "mean"),
            total_notional_usd=("notional_abs", "sum"),
            long_count=("is_long", "sum"),
            short_count=("is_short", "sum"),
            win_rate=("is_win", "mean"),
            avg_fee=("Fee", "mean"),
        )
    )

    daily["long_short_ratio"] = daily["long_count"] / daily["short_count"].replace(0, np.nan)
    daily["pnl_per_trade"] = daily["daily_pnl"] / daily["trades_count"].replace(0, np.nan)

    # Custom feature: aggression score = trading intensity * directional conviction.
    daily["aggression_score"] = (
        np.log1p(daily["trades_count"])
        * np.log1p(daily["avg_trade_size_usd"].fillna(0))
        * ((daily["long_count"] - daily["short_count"]).abs() / daily["trades_count"].replace(0, np.nan))
    ).fillna(0)
    return daily


def build_trader_profiles(daily: pd.DataFrame) -> pd.DataFrame:
    profile = (
        daily.groupby("Account", as_index=False)
        .agg(
            avg_daily_pnl=("daily_pnl", "mean"),
            pnl_std=("daily_pnl", "std"),
            active_days=("date", "nunique"),
            mean_trades_per_day=("trades_count", "mean"),
            mean_trade_size=("avg_trade_size_usd", "mean"),
            mean_win_rate=("win_rate", "mean"),
            mean_aggression=("aggression_score", "mean"),
        )
    )
    profile["pnl_std"] = profile["pnl_std"].fillna(0.0)
    profile["consistency_score"] = profile["avg_daily_pnl"] / (profile["pnl_std"] + 1e-6)
    return profile


def sentiment_comparison(daily: pd.DataFrame) -> pd.DataFrame:
    return (
        daily[daily["classification"].isin(["Fear", "Greed"])]
        .groupby("classification", as_index=False)
        .agg(
            mean_daily_pnl=("daily_pnl", "mean"),
            median_daily_pnl=("daily_pnl", "median"),
            mean_win_rate=("win_rate", "mean"),
            pnl_volatility=("daily_pnl", "std"),
            mean_trades=("trades_count", "mean"),
            mean_trade_size=("avg_trade_size_usd", "mean"),
            mean_aggression=("aggression_score", "mean"),
            avg_long_short_ratio=("long_short_ratio", "mean"),
        )
    )


def create_segments(profile: pd.DataFrame) -> pd.DataFrame:
    seg = profile.copy()
    seg["leverage_segment"] = np.where(
        seg["mean_trade_size"] >= seg["mean_trade_size"].quantile(0.75),
        "High Size",
        "Low/Medium Size",
    )
    seg["activity_segment"] = np.where(
        seg["mean_trades_per_day"] >= seg["mean_trades_per_day"].median(),
        "Frequent",
        "Infrequent",
    )
    seg["consistency_segment"] = np.where(
        seg["consistency_score"] >= seg["consistency_score"].quantile(0.7),
        "Consistent",
        "Inconsistent",
    )
    return seg


def cluster_traders(profile: pd.DataFrame) -> pd.DataFrame:
    feats = profile[
        ["avg_daily_pnl", "pnl_std", "mean_trades_per_day", "mean_trade_size", "mean_win_rate", "mean_aggression"]
    ].fillna(0)
    scaler = StandardScaler()
    x = scaler.fit_transform(feats)
    model = KMeans(n_clusters=3, random_state=42, n_init=10)
    profile = profile.copy()
    profile["cluster"] = model.fit_predict(x)
    return profile


def save_plots(daily: pd.DataFrame, profile: pd.DataFrame, sentiment_stats: pd.DataFrame) -> None:
    sns.set_theme(style="whitegrid")

    plt.figure(figsize=(8, 5))
    sns.barplot(data=sentiment_stats, x="classification", y="mean_daily_pnl", palette="viridis")
    plt.title("Mean Daily PnL by Sentiment")
    plt.ylabel("Mean Daily PnL (USD)")
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "pnl_by_sentiment.png", dpi=200)
    plt.close()

    plt.figure(figsize=(8, 5))
    sns.boxplot(
        data=daily[daily["classification"].isin(["Fear", "Greed"])],
        x="classification",
        y="trades_count",
        palette="Set2",
    )
    plt.title("Trade Frequency Distribution by Sentiment")
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "trade_frequency_by_sentiment.png", dpi=200)
    plt.close()

    plt.figure(figsize=(8, 5))
    sns.scatterplot(
        data=profile,
        x="mean_aggression",
        y="avg_daily_pnl",
        size="mean_trades_per_day",
        hue="consistency_score",
        palette="coolwarm",
        alpha=0.7,
    )
    plt.title("Aggression vs Profitability")
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "aggression_vs_pnl.png", dpi=200)
    plt.close()


def main() -> None:
    sentiment_raw, trades_raw = load_data()
    sentiment, trades, merged = preprocess(sentiment_raw, trades_raw)
    daily = build_daily_account_features(merged)
    profile = build_trader_profiles(daily)
    sentiment_stats = sentiment_comparison(daily)
    segmented = create_segments(profile)
    clustered = cluster_traders(segmented)

    daily.to_csv(OUTPUT_DIR / "daily_account_metrics.csv", index=False)
    clustered.to_csv(OUTPUT_DIR / "trader_profiles_segmented.csv", index=False)
    sentiment_stats.to_csv(OUTPUT_DIR / "sentiment_comparison.csv", index=False)
    save_plots(daily, clustered, sentiment_stats)

    quality = {
        "sentiment_shape": sentiment_raw.shape,
        "trades_shape": trades_raw.shape,
        "sentiment_missing": sentiment_raw.isna().sum().to_dict(),
        "trades_missing_top": trades_raw.isna().sum().sort_values(ascending=False).head(10).to_dict(),
        "sentiment_duplicates": int(sentiment_raw.duplicated().sum()),
        "trades_duplicates": int(trades_raw.duplicated().sum()),
        "date_coverage": {
            "sentiment_min": str(sentiment["date"].min()),
            "sentiment_max": str(sentiment["date"].max()),
            "trades_min": str(trades["date"].min()),
            "trades_max": str(trades["date"].max()),
        },
    }

    with open(OUTPUT_DIR / "data_quality_report.json", "w", encoding="utf-8") as f:
        json.dump(quality, f, indent=2)

    print("Analysis complete. Artifacts saved in outputs/ directory.")


if __name__ == "__main__":
    main()
