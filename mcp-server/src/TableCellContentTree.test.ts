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
  <hh:fontfaces><hh:fontface lang="HANGUL"><hh:font id="0" face="함초롬바탕"/></hh:fontface></hh:fontfaces>
  <hh:charProperties itemCnt="1">
    <hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
      <hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
    </hh:charPr>
  </hh:charProperties>
</hh:head>`);
  zip.file('Contents/section0.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"
        xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core">
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

async function createParagraphWrappedTableDocument(): Promise<Buffer> {
  const zip = new JSZip();

  zip.file('mimetype', 'application/hwp+zip');
  zip.file('version.xml', '<?xml version="1.0"?><hwpml version="1.0"/>');
  zip.file('Contents/content.hpf', '<?xml version="1.0"?><pkg:package xmlns:pkg="http://www.hancom.co.kr/hwpml/2011/package"><pkg:manifest><pkg:item id="section0" href="section0.xml"/></pkg:manifest></pkg:package>');
  zip.file('Contents/header.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
  <hh:docInfo><hh:title>Paragraph Wrapped Table Test</hh:title></hh:docInfo>
  <hh:fontfaces><hh:fontface lang="HANGUL"><hh:font id="0" face="함초롬바탕"/></hh:fontface></hh:fontfaces>
  <hh:charProperties itemCnt="1">
    <hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
      <hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
    </hh:charPr>
  </hh:charProperties>
</hh:head>`);
  zip.file('Contents/section0.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
  <hp:p id="heading"><hp:run><hp:t>PPT 6 page</hp:t></hp:run></hp:p>
  <hp:p id="table_wrapper">
    <hp:run charPrIDRef="0">
      <hp:tbl id="wrapped_table" rowCnt="1" colCnt="1">
        <hp:tr>
          <hp:tc colAddr="0" rowAddr="0">
            <hp:subList>
              <hp:p id="cell_text"><hp:run><hp:t>Wrapped table text</hp:t></hp:run></hp:p>
            </hp:subList>
          </hp:tc>
        </hp:tr>
      </hp:tbl>
      <hp:t/>
    </hp:run>
    <hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="1000" textheight="1000" baseline="850" spacing="600" horzpos="0" horzsize="1000" flags="0"/></hp:linesegarray>
  </hp:p>
  <hp:p id="after"><hp:run><hp:t>After table paragraph</hp:t></hp:run></hp:p>
</hs:sec>`);

  return zip.generateAsync({ type: 'nodebuffer' });
}

async function createTableWithCellVisualObjectDocument(): Promise<Buffer> {
  const zip = new JSZip();

  zip.file('mimetype', 'application/hwp+zip');
  zip.file('version.xml', '<?xml version="1.0"?><hwpml version="1.0"/>');
  zip.file('Contents/content.hpf', '<?xml version="1.0"?><pkg:package xmlns:pkg="http://www.hancom.co.kr/hwpml/2011/package"><pkg:manifest><pkg:item id="section0" href="section0.xml"/><pkg:item id="image2" href="BinData/image2.png" media-type="image/png"/></pkg:manifest></pkg:package>');
  zip.file('BinData/image2.png', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=', 'base64'));
  zip.file('Contents/header.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
  <hh:docInfo><hh:title>Cell Visual Object Test</hh:title></hh:docInfo>
  <hh:fontfaces><hh:fontface lang="HANGUL"><hh:font id="0" face="함초롬바탕"/></hh:fontface></hh:fontfaces>
  <hh:charProperties itemCnt="1">
    <hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
      <hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
    </hh:charPr>
  </hh:charProperties>
</hh:head>`);
  zip.file('Contents/section0.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
  <hp:p id="heading"><hp:run><hp:t>PPT 3 page</hp:t></hp:run></hp:p>
  <hp:tbl id="visual_table" rowCnt="1" colCnt="2">
    <hp:tr>
      <hp:tc colAddr="0" rowAddr="0">
        <hp:subList>
          <hp:p id="left_text"><hp:run><hp:t>Typical course</hp:t></hp:run></hp:p>
        </hp:subList>
      </hp:tc>
      <hp:tc colAddr="1" rowAddr="0">
        <hp:subList>
          <hp:container id="chart_group">
            <hp:rect id="chart_box">
              <hp:drawText><hp:p id="phase_label"><hp:run><hp:t>잠복기</hp:t></hp:run></hp:p></hp:drawText>
            </hp:rect>
            <hp:pic id="chart_image"><hc:img binaryItemIDRef="image2"/></hp:pic>
          </hp:container>
        </hp:subList>
      </hp:tc>
    </hp:tr>
  </hp:tbl>
  <hp:p id="after"><hp:run><hp:t>After table paragraph</hp:t></hp:run></hp:p>
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

  it('inserts a styled paragraph after direct text inside a table cell', async () => {
    const buffer = await createNestedTableDocument();
    const doc = await HwpxDocument.createFromBuffer('cell-paragraph-insert-test', 'cell-paragraph-insert-test.hwpx', buffer);

    const ok = doc.insertParagraphInTableCell(
      0,
      0,
      0,
      0,
      'Outer cell note',
      '주석: 셀 내부 문장 바로 다음 줄',
      { fontColor: '#0000FF' }
    );
    expect(ok).toBe(true);

    const saved = await doc.save();
    const reloaded = await HwpxDocument.createFromBuffer('cell-paragraph-insert-test-reload', 'cell-paragraph-insert-test.hwpx', saved);
    const cell = reloaded.getTableCell(0, 0, 0, 0);

    expect(cell?.content_tree[0]).toMatchObject({
      type: 'paragraph',
      text: 'Outer cell note',
    });
    expect(cell?.content_tree[1]).toMatchObject({
      type: 'paragraph',
      text: '주석: 셀 내부 문장 바로 다음 줄',
    });
    expect(cell?.content_tree[2]).toMatchObject({
      type: 'table',
      rows: 1,
      cols: 1,
    });

    const zip = await JSZip.loadAsync(saved);
    const headerXml = await zip.file('Contents/header.xml')?.async('string');
    expect(headerXml).toContain('textColor="#0000FF"');
  });

  it('inserts styled paragraphs after paragraph-wrapped tables', async () => {
    const buffer = await createParagraphWrappedTableDocument();
    const doc = await HwpxDocument.createFromBuffer('wrapped-table-test', 'wrapped-table-test.hwpx', buffer);
    const tablePos = doc.getElementIndexForTable(0);
    expect(tablePos).not.toBeNull();

    const comment = '주석: 표 아래에 들어갈 파란색 문단';
    const insertedIndex = doc.insertParagraph(0, tablePos!.element_index, comment);
    doc.applyCharacterStyle(0, insertedIndex, 0, { fontColor: '#0000FF' });

    const saved = await doc.save();
    const reloaded = await HwpxDocument.createFromBuffer('wrapped-table-test-reload', 'wrapped-table-test.hwpx', saved);
    const context = reloaded.getInsertContext(0, tablePos!.element_index, 2);
    const searchResult = reloaded.searchText(comment, { includeTables: true });

    expect(searchResult).toHaveLength(1);
    expect(searchResult[0].element).toBe(tablePos!.element_index + 1);
    expect(context?.elements_after[0]).toMatchObject({
      type: 'paragraph',
      text: comment,
      element_index: tablePos!.element_index + 1,
    });

    const zip = await JSZip.loadAsync(saved);
    const headerXml = await zip.file('Contents/header.xml')?.async('string');
    expect(headerXml).toContain('textColor="#0000FF"');
  });

  it('keeps visual objects inside table cells out of section-level structure', async () => {
    const buffer = await createTableWithCellVisualObjectDocument();
    const doc = await HwpxDocument.createFromBuffer('cell-visual-test', 'cell-visual-test.hwpx', buffer);

    const table = doc.getTable(0, 0);
    const context = doc.getInsertContext(0, 1, 3);

    expect(table?.data[0][1].text).toBe('');
    expect(table?.data[0][1].content_tree[0]).toMatchObject({
      type: 'container',
      container_kind: 'grouped_visual',
      texts: ['잠복기'],
      image_refs: ['image2'],
      image_count: 1,
      shape_count: 1,
      requires_visual_read: true,
    });
    expect(context?.elements_after[0]).toMatchObject({
      type: 'paragraph',
      text: 'After table paragraph',
      element_index: 2,
    });
    expect(context?.elements_after.some(element => element.type === 'container' || element.type === 'rect')).toBe(false);
  });

  it('reads a heading range with table cell visual affordances and image payload lookup', async () => {
    const buffer = await createTableWithCellVisualObjectDocument();
    const doc = await HwpxDocument.createFromBuffer('range-visual-test', 'range-visual-test.hwpx', buffer);

    const range = doc.findContentRangeAfterHeading('PPT 3 page', {
      untilNextHeading: true,
      headingPattern: 'PPT \\d+ page',
    });
    expect(range).toMatchObject({
      section_index: 0,
      start_element_index: 0,
      end_element_index: 2,
      end_reason: 'section_end',
    });

    const content = doc.getContentRange(0, range!.start_element_index, range!.end_element_index);
    expect(content?.items[1]).toMatchObject({
      type: 'table',
      table_index: 0,
      rows: 1,
      cols: 2,
    });
    expect(content?.items[1].cells[0][1].content_tree[0]).toMatchObject({
      type: 'container',
      texts: ['잠복기'],
      image_refs: ['image2'],
      requires_visual_read: true,
    });
    expect(content?.visuals[0]).toMatchObject({
      type: 'container',
      binary_id: 'image2',
      scope: { section_index: 0, element_index: 1, table_index: 0, row: 0, col: 1 },
    });

    const asset = await doc.getVisualAsset('image2');
    expect(asset).toMatchObject({
      binary_id: 'image2',
      mime_type: 'image/png',
      filename: 'BinData/image2.png',
    });
    expect(asset?.base64.length).toBeGreaterThan(20);
  });
});
