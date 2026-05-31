# Cell Image XML Attributes

## Problem

Images inserted into table cells through `insert_image_in_cell` and
`render_mermaid_in_cell` can appear correctly in preview tooling while failing
to display in the native Korean Hancom Office application.

The suspected cause is that the generated HWPML image attributes differ from
the XML produced by Hancom Office for an image inside a table cell.

## Affected Area

- `mcp-server/src/HwpxDocument.ts`
- `applyCellImageInsertsToXml()`
- MCP tools that create cell images, including `insert_image_in_cell` and
  `render_mermaid_in_cell`

## Reference XML

Hancom Office generated working cell image:

```xml
<hp:pic textWrap="TOP_AND_BOTTOM" ...>
  <hp:pos treatAsChar="1" affectLSpacing="0" holdAnchorAndSO="0"
          vertRelTo="PARA" horzRelTo="COLUMN" .../>
</hp:pic>
```

Previously generated MCP cell image:

```xml
<hp:pic textWrap="SQUARE" ...>
  <hp:pos treatAsChar="1" affectLSpacing="1" holdAnchorAndSO="1"
          vertRelTo="PARA" horzRelTo="PARA" .../>
</hp:pic>
```

## Proposed Fix

For table-cell images, generate XML with these values:

- `textWrap="TOP_AND_BOTTOM"`
- `affectLSpacing="0"`
- `holdAnchorAndSO="0"`
- `horzRelTo="COLUMN"`
- keep `vertRelTo="PARA"`

The HWPML notes from the archived analysis indicate that `affectLSpacing` and
`holdAnchorAndSO` default to false, and that `COLUMN` better matches the cell
context used by Hancom Office.

## Verification Checklist

- Insert an image into a table cell with `insert_image_in_cell`.
- Render a Mermaid diagram into a table cell with `render_mermaid_in_cell`.
- Save the HWPX file and inspect the generated `hp:pic` and `hp:pos` XML.
- Open the generated HWPX file in native Hancom Office and confirm the image is
  visible inside the target cell.
- Confirm existing preview behavior is not regressed.
