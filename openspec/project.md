# Project Context

## Purpose
This repository provides a standalone Model Context Protocol (MCP) server for reading and editing Hangul Word Processor HWPX documents with AI tools. The primary product lives under `mcp-server/`.

## Tech Stack
- Node.js
- TypeScript
- Model Context Protocol SDK
- JSZip for HWPX ZIP archive handling
- Vitest for tests

## Project Conventions

### Code Style
- Keep changes focused on the MCP server unless a task explicitly concerns repository packaging or documentation.
- Prefer preserving original HWPML XML structure and styles over regenerating broad document sections.
- Use clear tool names that match MCP workflows.

### Architecture Patterns
- `mcp-server/src/index.ts` defines MCP tools and request handling.
- `mcp-server/src/HwpxDocument.ts` owns document mutation, save behavior, XML persistence, and undo/redo state.
- `mcp-server/src/HwpxParser.ts` parses HWPX ZIP/XML content into in-memory structures.

### Testing Strategy
- Use Vitest tests under `mcp-server/src`.
- For persistence bugs, prefer save-reload tests that inspect both memory and generated HWPX/XML output.
- Manual scripts under `mcp-server/scripts` are supplemental diagnostics, not substitutes for automated tests.

### Git Workflow
- Keep commits scoped and descriptive.
- Do not commit generated build output, dependency folders, or local HWPX test output.

## Domain Context
- HWPX files are ZIP archives containing HWPML XML.
- Native Hancom Office compatibility is the final target for generated HWPX files.
- HWP binary files are not a primary editing target; convert to HWPX for reliable editing.

## Important Constraints
- Avoid XML corruption: validate tag balance and preserve original structure where practical.
- Treat table and nested-table XML carefully because naive regex matching can corrupt nested structures.
- Keep completed OpenSpec changes under `openspec/changes/archive`.

## External Dependencies
- Hancom Office is the practical compatibility reference for rendered HWPX behavior.
- LibreOffice support for HWPX is limited and should not be treated as the primary compatibility oracle.
