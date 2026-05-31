# Fork Development Notes

This fork is centered on the standalone HWPX MCP server under `mcp-server/`.

## Working Style

- No external spec/proposal CLI is required for this fork's normal development
  workflow.
- For small bug fixes, keep changes focused and update tests when practical.
- For risky HWPX/HWPML changes, write or update a short Markdown note under
  `docs/bug-notes/` or `docs/design-notes/` before or alongside the code change.
- Prefer preserving original HWPML XML structure and styles over regenerating
  broad document sections.
- Treat table, nested-table, image, save/load, and XML mutation paths carefully;
  these areas should have focused verification.

## Project Shape

- `mcp-server/src/index.ts` defines MCP tools and request handling.
- `mcp-server/src/HwpxDocument.ts` owns document mutation, save behavior, XML
  persistence, and undo/redo state.
- `mcp-server/src/HwpxParser.ts` parses HWPX ZIP/XML content into in-memory
  structures.
- `docs/development-workflow.md` describes this fork's lightweight development
  workflow.

## Commands

```bash
cd mcp-server
npm install
npm run build
npm test
```
