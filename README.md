# Hyperliquid Trader Performance vs Market Sentiment

This project analyzes how Bitcoin market sentiment regimes (Fear/Greed) relate to trader behavior and performance on Hyperliquid.

## Project Structure

- `data/` - raw datasets (`sentiment.csv`, `hyperliquid_trades.csv`)
- `notebooks/trader_sentiment_analysis.ipynb` - main assignment notebook
- `src/run_analysis.py` - reproducible analysis pipeline (generates outputs)
- `src/create_notebook.py` - generates the notebook programmatically
- `outputs/` - generated tables, figures, and quality checks

## Setup

Use Python 3.10+ (tested with Python 3.14).

```bash
py -m pip install --user -r requirements.txt
```

## Run

1. Generate analysis artifacts:

```bash
py src/run_analysis.py
```

2. (Optional) regenerate notebook skeleton:

```bash
py src/create_notebook.py
```

3. Open and run:
- `notebooks/trader_sentiment_analysis.ipynb`

## What This Covers

- Data quality checks (shape, missing values, duplicates)
- Timestamp normalization and daily alignment
- Feature engineering (PnL, win rate, trade frequency, size, long/short ratio)
- Custom behavior metric: **aggression score**
- Performance and behavior comparison across Fear vs Greed
- Trader segmentation (size/activity/consistency based on distribution thresholds)
- Bonus behavioral clustering (KMeans)
- Actionable sentiment-conditioned strategy rules
