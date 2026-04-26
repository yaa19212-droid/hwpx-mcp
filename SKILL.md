---
name: hwpx-mcp
description: Use this skill when Codex needs to inspect, edit, verify, or troubleshoot Korean HWPX/HWP documents through the local hwpx-mcp MCP server, especially for table-heavy documents, template filling, Ctrl+number style slots, content-range reading, visual assets inside containers or table cells, and safe save/verification workflows.
---

# HWPX MCP

## Core Rule

Use the MCP tools as the source of truth for HWPX content. Prefer high-level tools first, save raw XML tools for diagnosis or carefully scoped fixes, and verify after any edit that changes landed in the intended paragraph, table cell, or range.

HWP files are effectively read-only. HWPX files can be edited and saved.

## Default Workflow

1. Open with `open_document`.
2. Identify the target using a reading/search tool.
3. Make the smallest appropriate edit.
4. Verify with a read/context tool before saving when the edit is non-trivial.
5. Save with `save_document`, keeping backup and integrity verification enabled unless the user asks otherwise.
6. Close with `close_document` when finished.

## Reading Strategy

Use these in preference order:

- Whole-document overview: `get_document_structure`, `get_document_outline`, `get_table_map`.
- Marker/page-like section: `find_content_range_after_heading`, then `get_content_range`.
- Specific table: `get_table_map` or `get_tables_summary`, then `get_table`.
- Specific cell: `get_table_cell`.
- Nearby insertion check: `get_insert_context`.
- Large document search: `search_text` first; use chunk/index tools only when ordinary search or range reading is too large.

For prompts like “PPT 3 page 아래 내용을 읽고...”:

1. Call `find_content_range_after_heading` with the marker text. If needed, pass `heading_pattern` such as `PPT \\d+ page`.
2. Call `get_content_range` for the returned section and element range.
3. Read paragraphs, tables, nested table cells, and visual summaries in order.
4. If a visual has `requires_visual_read: true` and the visual matters, call `get_visual_asset` for its `binary_id`.

Do not assume a table cell contains only text. Read `content_tree` because cells can contain paragraphs, nested tables, images, shapes, and grouped containers.

## Visual Content

Treat `container`, `image`, and `shape` nodes as visual affordances.

- `texts` are XML text labels inside shapes/containers.
- `image_refs` or `binary_id` identify raster assets.
- `requires_visual_read: true` means the model may need the image payload.
- Call `get_visual_asset` only when the image is relevant to the user’s task or verification.

For “check whether the edit landed correctly,” do not reread every image unless the visual itself changed.

## Editing Strategy

Use the most specific tool that matches the target:

- Insert paragraph outside tables: `insert_paragraph`.
- Insert paragraph inside a cell after direct cell text: `insert_paragraph_in_table_cell`.
- Replace ordinary document text: `replace_text`.
- Replace one table cell’s text: `replace_text_in_cell` or `update_table_cell`.
- Fill template cells: `update_table_cell`, `fill_by_path`, or `batch_fill_table`.
- Apply style while replacing text: `replace_text_with_style`.
- Apply style only to existing text: `apply_text_style`.
- Apply paragraph style by Ctrl slot: `apply_style_by_slot`.

Be explicit about inside vs outside table placement. If the user says “table below, not inside the table,” find the table element and insert after it. If the target text is inside a table cell, prefer cell-specific tools.

## Style Slots

When the user asks for “Ctrl+number style” behavior:

1. Call `get_style_slots`.
2. Choose the style by slot name/description and visible properties.
3. For new inserted paragraphs, pass `ctrl_slot` or `style_id` when the insertion tool supports it.
4. For existing paragraph styling, use `apply_style_by_slot`.
5. For styling only a text range, use `apply_text_style`.

Do not infer Ctrl slots from generic HWP knowledge when the current document defines custom styles. Inspect the document’s slots.

## Risky Or Debug Tools

Use these only with a clear reason:

- `get_section_xml`, `set_section_xml`: raw XML inspection or carefully scoped repair.
- `analyze_xml`, `repair_xml`: diagnosis/recovery workflows.
- `get_raw_section_xml`, `set_raw_section_xml`: legacy compatibility only; prefer `get_section_xml` and `set_section_xml`.
- `move_table`, `copy_table`, `move_paragraph`, `copy_paragraph`: use only after verifying source and destination indices.
- `insert_section`, `delete_section`, shape insertion tools: avoid unless the user explicitly needs them.

Before using `set_section_xml`, preserve the original XML mentally or in a local diff, validate if the tool supports it, and reread the affected structure afterward.

## Verification

After text/table edits, verify with the smallest relevant read:

- Paragraph edit: `get_insert_context`, `find_paragraph_by_text`, or `search_text`.
- Table edit: `get_table_cell` or `get_table`.
- Range-level task: `get_content_range`.
- Visual-dependent task: check visual summary first; call `get_visual_asset` only when needed.

Run repository tests only when modifying the MCP implementation itself, not for routine document edits.
