import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { HwpxDocument } from './HwpxDocument';

async function createNestedTableDocument(): Promise<Buffer> {
  const zip = new JSZip();

  zip.file('mimetype', 'application/hwp+zip');
  zip.file('version.xml', '<?xml version="1.0"?><hwpml version="1.0"/>');
  zip.file('Contents/content.hpf', '<?xml version="1.0"?><pkg:package xmlns:pkg="http://www.hancom.co.kr/hwpml/2011/package"><pkg:manifest><pkg:item id="section0" href="section0.xml"/></pkg:manifest></pkg:package>');
  zip.file('Contents/header.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
  <hh:docInfo><hh:title>Nested Table Content Tree Test</hh:title></hh:docInfo>
</hh:head>`);
  zip.file('Contents/section0.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
  <hp:p id="heading"><hp:run><hp:t>PPT 6 page</hp:t></hp:run></hp:p>
  <hp:tbl id="outer" rowCnt="1" colCnt="1">
    <hp:tr>
      <hp:tc colAddr="0" rowAddr="0">
        <hp:subList>
          <hp:p id="outer_text"><hp:run><hp:t>Outer cell note</hp:t></hp:run></hp:p>
          <hp:tbl id="inner" rowCnt="1" colCnt="1">
            <hp:tr>
              <hp:tc colAddr="0" rowAddr="0">
                <hp:subList>
                  <hp:p id="inner_text"><hp:run><hp:t>Inner nested table text</hp:t></hp:run></hp:p>
                </hp:subList>
              </hp:tc>
            </hp:tr>
          </hp:tbl>
        </hp:subList>
      </hp:tc>
    </hp:tr>
  </hp:tbl>
</hs:sec>`);

  return zip.generateAsync({ type: 'nodebuffer' });
}

describe('Table cell content tree', () => {
  it('exposes nested tables inside table cells', async () => {
    const buffer = await createNestedTableDocument();
    const doc = await HwpxDocument.createFromBuffer('content-tree-test', 'content-tree-test.hwpx', buffer);

    const cell = doc.getTableCell(0, 0, 0, 0);

    expect(cell).not.toBeNull();
    expect(cell?.text).toContain('Outer cell note');
    expect(cell?.has_nested_tables).toBe(true);
    expect(cell?.nested_table_count).toBe(1);

    const tableNode = cell?.content_tree.find(node => node.type === 'table');
    expect(tableNode).toBeTruthy();
    expect(tableNode?.type).toBe('table');
    if (tableNode?.type === 'table') {
      expect(tableNode.rows).toBe(1);
      expect(tableNode.cols).toBe(1);
      expect(tableNode.data[0][0].text).toBe('Inner nested table text');
      expect(tableNode.data[0][0].content_tree[0]).toMatchObject({
        type: 'paragraph',
        text: 'Inner nested table text',
      });
    }
  });

  it('includes content_tree in getTable cell data', async () => {
    const buffer = await createNestedTableDocument();
    const doc = await HwpxDocument.createFromBuffer('content-tree-test', 'content-tree-test.hwpx', buffer);

    const table = doc.getTable(0, 0);
    const cell = table?.data[0][0];

    expect(table?.rows).toBe(1);
    expect(table?.cols).toBe(1);
    expect(cell.text).toContain('Outer cell note');
    expect(cell.has_nested_tables).toBe(true);
    expect(cell.nested_table_count).toBe(1);
    expect(cell.content_tree.some((node: any) => node.type === 'table')).toBe(true);
  });
});
