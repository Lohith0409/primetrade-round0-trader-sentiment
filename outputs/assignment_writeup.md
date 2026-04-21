# One-Page Write-up: Trader Performance vs Sentiment

## Methodology

I merged Hyperliquid trade-level data with daily Bitcoin sentiment labels (Fear/Greed) by normalizing trade timestamps from epoch milliseconds and joining at date level. Analysis was performed at **account-day granularity** to compare behavior and outcomes consistently across regimes.

Core engineered metrics:
- Daily PnL and PnL per trade
- Trade count, average trade size, total notional
- Win rate
- Long/short ratio
- Custom **aggression score** (trade intensity x size x directional conviction)
- Consistency score (`avg_daily_pnl / pnl_std`)

I then segmented traders using data-driven thresholds (median/quantiles): frequent vs infrequent, high-size vs low/medium-size, and consistent vs inconsistent.

## Findings

1. **Fear regime produced higher realized account-day PnL and win rate than Greed in this sample.**  
   This is not simply “risk-on vs risk-off.” The pattern suggests that fear periods introduced richer two-sided volatility, creating more exploitable micro-opportunities for active execution.

2. **Greed increased directional conviction (higher long/short skew and aggression) but reduced execution quality.**  
   Traders looked more confident in Greed but realized weaker win rates and lower account-day efficiency. A likely mechanism is crowding: one-sided positioning compresses edge and worsens marginal entry quality.

3. **Segment effects were stronger than market-level averages.**  
   Frequent and consistent cohorts were materially more sentiment-resilient than infrequent/inconsistent cohorts. This indicates that process quality (cadence, sizing discipline) dominates headline sentiment in determining who captures regime-specific opportunity.

## Strategy Recommendations

1. **Fear-Regime Adaptive Participation Rule**  
   For frequent + consistent traders, increase intraday trade bandwidth during Fear but keep per-trade notional capped. The data suggests opportunity is dense in Fear; performance benefits come from repetition quality rather than oversized single bets.

2. **Greed-Regime Conviction Throttle**  
   For high-size/high-aggression traders, apply dynamic exposure caps when aggression score exceeds its rolling 75th percentile. This directly targets the observed mismatch: conviction ramps up faster than realized edge in Greed.

## Practical Takeaway

Use sentiment as a **conditional risk overlay**, not a standalone trading signal. The highest value comes from combining sentiment regime with trader archetype to decide who should scale, who should throttle, and under which market state.
