#!/usr/bin/env python3
"""Ask PyData — query Sanity structured content via hosted MCP.

Reads the Sanity MCP token from ~/.copilot/mcp-config.json (or env SANITY_MCP_TOKEN).
Usage:
  python ask_pydata.py versions
  python ask_pydata.py migrate
  python ask_pydata.py benchmarks
  python ask_pydata.py controversy
"""
import asyncio
import json
import os
import sys
from pathlib import Path

import httpx
from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client

MCP_URL = "https://mcp.sanity.io"
RESOURCE = {"projectId": "654gu2bk", "dataset": "production"}


def load_token() -> str:
    tok = os.environ.get("SANITY_MCP_TOKEN")
    if tok:
        return tok
    cfg = Path.home() / ".copilot" / "mcp-config.json"
    if cfg.exists():
        data = json.loads(cfg.read_text())
        return data["mcpServers"]["Sanity"]["headers"]["Authorization"].removeprefix("Bearer ").strip()
    raise SystemExit("No MCP token: set SANITY_MCP_TOKEN or ~/.copilot/mcp-config.json")


PRESETS = {
    "versions": "*[_type == 'versionNote']{version, changeType, summary, sourceUrl} | order(package, version desc)",
    "migrate": "*[_type == 'apiEquivalent']{fromApi, toApi, semanticDiff, sourceUrl}",
    "benchmarks": "*[_type == 'performanceBenchmark']{metric, value, unit, lib, sourceUrl}",
    "controversy": "*[_type == 'comparisonClaim']{status, sourceUrl}",
}


async def run(preset: str):
    groq = PRESETS.get(preset)
    if not groq:
        print(f"presets: {list(PRESETS)}")
        return
    token = load_token()
    async with httpx.AsyncClient(headers={"Authorization": f"Bearer {token}"}) as hc:
        async with streamable_http_client(MCP_URL, http_client=hc) as (r, w):
            async with ClientSession(r, w) as s:
                await s.initialize()
                result = await s.call_tool("query_documents", {"resource": RESOURCE, "query": groq})
                for block in result.content:
                    if hasattr(block, "text"):
                        print(block.text)


if __name__ == "__main__":
    asyncio.run(run(sys.argv[1] if len(sys.argv) > 1 else "versions"))
