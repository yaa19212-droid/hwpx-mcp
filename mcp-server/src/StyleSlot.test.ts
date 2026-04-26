import { describe, expect, it } from 'vitest';
import JSZip from 'jszip';
import { HwpxDocument } from './HwpxDocument';

async function createStyleSlotDocument(): Promise<Buffer> {
  const zip = new JSZip();

  zip.file('mimetype', 'application/hwp+zip');
  zip.file('version.xml', '<?xml version="1.0"?><hwpml version="1.0"/>');
  zip.file('Contents/content.hpf', '<?xml version="1.0"?><pkg:package xmlns:pkg="http://www.hancom.co.kr/hwpml/2011/package"><pkg:manifest><pkg:item id="section0" href="section0.xml"/></pkg:manifest></pkg:package>');
  zip.file('Contents/header.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
  <hh:fontfaces><hh:fontface lang="HANGUL"><hh:font id="0" face="함초롬바탕"/></hh:fontface></hh:fontfaces>
  <hh:borderFills itemCnt="1"><hh:borderFill id="1"/></hh:borderFills>
  <hh:charProperties itemCnt="3">
    <hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1"><hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/></hh:charPr>
    <hh:charPr id="1" height="1000" textColor="#0000FF" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1"><hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/></hh:charPr>
    <hh:charPr id="2" height="1000" textColor="#FF0000" shadeColor="#FFFF00" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1"><hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/></hh:charPr>
  </hh:charProperties>
  <hh:paraProperties itemCnt="2">
    <hh:paraPr id="0" tabPrIDRef="0"><hh:align horizontal="JUSTIFY" vertical="BASELINE"/><hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/></hh:paraPr>
    <hh:paraPr id="1" tabPrIDRef="0"><hh:align horizontal="CENTER" vertical="BASELINE"/><hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/></hh:paraPr>
  </hh:paraProperties>
  <hh:styles itemCnt="3">
    <hh:style id="0" type="PARA" name="바탕글" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0" langID="1042" lockForm="0"/>
    <hh:style id="1" type="PARA" name="부연설명" paraPrIDRef="0" charPrIDRef="1" nextStyleIDRef="1" langID="1042" lockForm="0"/>
    <hh:style id="2" type="PARA" name="시험" paraPrIDRef="1" charPrIDRef="2" nextStyleIDRef="2" langID="1042" lockForm="0"/>
  </hh:styles>
</hh:head>`);
  zip.file('Contents/section0.xml', `<?xml version="1.0" encoding="UTF-8"?>
<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
  <hp:p id="p0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>기존 텍스트</hp:t></hp:run></hp:p>
</hs:sec>`);

  return zip.generateAsync({ type: 'nodebuffer' });
}

describe('style slot tools', () => {
  it('maps style IDs to Ctrl slots without confusing langID for id', async () => {
    const buffer = await createStyleSlotDocument();
    const doc = await HwpxDocument.createFromBuffer('style-slots', 'style-slots.hwpx', buffer);

    expect(doc.getStyleSlots().map(slot => ({
      ctrlSlot: slot.ctrlSlot,
      styleId: slot.styleId,
      name: slot.name,
      charPrIDRef: slot.charPrIDRef,
      fontColor: slot.character?.fontColor,
    }))).toEqual([
      { ctrlSlot: 1, styleId: 0, name: '바탕글', charPrIDRef: 0, fontColor: '#000000' },
      { ctrlSlot: 2, styleId: 1, name: '부연설명', charPrIDRef: 1, fontColor: '#0000FF' },
      { ctrlSlot: 3, styleId: 2, name: '시험', charPrIDRef: 2, fontColor: '#FF0000' },
    ]);
  });

  it('persists inserted paragraphs and existing text styling by style slot', async () => {
    const buffer = await createStyleSlotDocument();
    const doc = await HwpxDocument.createFromBuffer('style-apply', 'style-apply.hwpx', buffer);

    doc.insertParagraph(0, 0, '새 부연설명', { ctrlSlot: 2 });
    const styledCount = doc.applyTextStyle(0, '기존 텍스트', { ctrlSlot: 3, replaceAll: false, includeTables: false });
    expect(styledCount).toBe(1);

    const saved = await doc.save();
    const zip = await JSZip.loadAsync(saved);
    const sectionXml = await zip.file('Contents/section0.xml')?.async('string');

    expect(sectionXml).toContain('<hp:p id="p0" paraPrIDRef="0" styleIDRef="0"');
    expect(sectionXml).toContain('<hp:run charPrIDRef="2"><hp:t>기존 텍스트</hp:t></hp:run>');
    expect(sectionXml).toContain('paraPrIDRef="0" styleIDRef="1"');
    expect(sectionXml).toContain('<hp:run charPrIDRef="1"><hp:t>새 부연설명</hp:t></hp:run>');
  });
});
