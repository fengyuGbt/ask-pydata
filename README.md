# Ask PyData

A version-aware Q&A agent for Python data-analysis libraries (pandas, Polars, DuckDB).

Why this exists: pandas 3.0 (Jan 2026) and Polars 2.0 (Sep 2026) changed enough APIs
that generic web search returns outdated advice. This project stores curated,
**version-structured** knowledge in Sanity and answers questions via Sanity's hosted
MCP (`https://mcp.sanity.io`), so every claim cites its source.

## Layout

- `sanity/` — Sanity Studio + 6 document types (library, versionNote, apiEquivalent,
  migrationGuide, performanceBenchmark, comparisonClaim)
- `agent/ask_pydata.py` — Python CLI that calls `query_documents` over MCP

## Run

```bash
cd agent
python -m venv venv && source venv/bin/activate
pip install mcp httpx
python ask_pydata.py versions     # all version notes
python ask_pydata.py migrate      # pandas -> polars API equivalents
python ask_pydata.py benchmarks
python ask_pydata.py controversy
```

Needs a Sanity read token in `~/.copilot/mcp-config.json` (or `SANITY_MCP_TOKEN`).

Project ID: `654gu2bk` · Dataset: `production`

Built for the [Sanity Challenge](https://dev.to/devteam/join-the-sanity-challenge-2500-in-prizes-for-five-winners-514m) on dev.to.
