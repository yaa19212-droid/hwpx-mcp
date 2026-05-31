# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HWPX MCP Server is a standalone Model Context Protocol server for reading and editing Hangul Word Processor HWPX documents through AI tools. The repository is scoped around the server under `mcp-server/`.

The former VS Code custom editor extension has been split out of this repository's default product scope. See `docs/vscode-extension-split.md` for the split record.

## Build Commands

```bash
cd mcp-server
npm install
npm run build
npm start
```

## Testing

```bash
cd mcp-server
npm test
npm run test:watch
npx vitest run src/HwpxDocument.test.ts
```

## Architecture

```
mcp-server/src/
├── index.ts                    # MCP server entry point and tool definitions
├── HwpxDocument.ts             # Core document model and edit operations
├── HwpxParser.ts               # HWPX ZIP/XML parser
├── HangingIndentCalculator.ts  # Hanging indent calculation helpers
├── types.ts                    # HWPML-oriented type definitions
└── *.test.ts                   # Vitest coverage
```

The server exposes MCP tools for document management, text edits, table edits, styles, headers/footers, images, XML inspection/repair, chunked reading, and related HWPX workflows.

## Key Dependencies

- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `jszip`: HWPX ZIP archive handling
- `pako`: compression support
- `hwp.js`: legacy HWP parsing dependency where supported

## File Format Notes

- HWPX files are ZIP archives containing HWPML XML files.
- HWPML uses `hwpunit`, where 1 point = 100 hwpunit.
- Format reference: `docs/hwpml-format-reference.md`.
- Development workflow: `docs/development-workflow.md`.
- Design and bug notes live under `docs/design-notes/` and `docs/bug-notes/`.
- Save behavior should preserve original XML/style data where possible and avoid corrupting files.

## Compatibility Notes

- Prefer changing `mcp-server/src/HwpxDocument.ts` through focused, tested edits.
- For image and table behavior, compare generated XML with files produced by native Hancom Office when possible.
- Existing tests include persistence, XML corruption prevention, table operations, image insertion, and text duplication regressions.
