# MCP 도구 한국어 요약

`mcp-server/src/index.ts` 기준 MCP 도구 134개의 간단 요약입니다. HWPX 편집 도구가 주 대상이며, HWP 파일은 편집/저장을 지원하지 않습니다.

## 사용 가이드

| 도구 | 요약 |
|---|---|
| `get_tool_guide` | 작업 유형별 추천 도구와 워크플로우를 안내합니다. |

## 문서 관리

| 도구 | 요약 |
|---|---|
| `open_document` | HWPX/HWP 문서를 엽니다. HWPX는 편집 가능, HWP는 제한적 읽기 대상입니다. |
| `close_document` | 열린 문서를 닫습니다. |
| `save_document` | HWPX 문서를 저장하며 백업과 무결성 검증 옵션을 지원합니다. |
| `list_open_documents` | 현재 열린 문서 목록을 조회합니다. |
| `create_document` | 새 빈 HWPX 문서를 생성합니다. |

## 문서 조회와 메타데이터

| 도구 | 요약 |
|---|---|
| `get_document_text` | 문서 전체 텍스트를 가져옵니다. |
| `get_document_structure` | 섹션, 문단, 표, 이미지 수 등 문서 구조를 조회합니다. |
| `get_document_metadata` | 제목, 작성자, 날짜 등 문서 메타데이터를 조회합니다. |
| `set_document_metadata` | HWPX 문서 메타데이터를 수정합니다. |
| `get_document_outline` | 섹션, 제목, 표 위치를 포함한 문서 개요를 만듭니다. |
| `get_word_count` | 단어 수와 글자 수 통계를 계산합니다. |

## 문단 편집

| 도구 | 요약 |
|---|---|
| `get_paragraphs` | 문단 목록과 텍스트/스타일 정보를 조회합니다. |
| `get_paragraph` | 특정 문단의 상세 정보를 조회합니다. |
| `insert_paragraph` | 새 문단을 삽입하고 필요 시 자동 내어쓰기를 적용합니다. |
| `delete_paragraph` | 특정 문단을 삭제합니다. |
| `update_paragraph_text` | 기존 문단 스타일을 보존하며 텍스트를 교체합니다. |
| `update_paragraph_text_preserve_styles` | 여러 run의 스타일 구조를 유지하며 문단 텍스트를 교체합니다. |
| `append_text_to_paragraph` | 기존 문단 끝에 텍스트를 추가합니다. |
| `copy_paragraph` | 문단을 다른 위치로 복사합니다. |
| `move_paragraph` | 문단을 다른 위치로 이동합니다. |
| `find_paragraph_by_text` | 특정 텍스트를 포함한 문단과 주변 맥락을 찾습니다. |

## 텍스트 검색과 치환

| 도구 | 요약 |
|---|---|
| `search_text` | 문서 텍스트를 검색합니다. 기본적으로 표 셀도 포함합니다. |
| `replace_text` | 문서 전체에서 텍스트를 일괄 치환합니다. |
| `replace_text_with_style` | 텍스트를 치환한 뒤 새 텍스트에 문서 스타일 슬롯/ID를 적용합니다. |
| `batch_replace` | 여러 치환 규칙을 한 번에 적용합니다. |
| `replace_text_in_cell` | 특정 표 셀 안의 텍스트만 치환합니다. |

## 스타일과 서식

| 도구 | 요약 |
|---|---|
| `set_text_style` | 문단 run의 글자 서식을 설정합니다. |
| `get_text_style` | 문단 run의 글자 서식을 조회합니다. |
| `set_paragraph_style` | 문단 정렬, 줄간격, 여백 등 문단 서식을 설정합니다. |
| `get_paragraph_style` | 문단 서식을 조회합니다. |
| `get_styles` | 문서에 정의된 스타일 목록을 조회합니다. |
| `get_style_slots` | 문서 스타일을 Ctrl+숫자 슬롯 형태로 조회하고 색상/굵기 등 요약을 반환합니다. |
| `get_char_shapes` | 글자 모양 정의 목록을 조회합니다. |
| `get_para_shapes` | 문단 모양 정의 목록을 조회합니다. |
| `apply_style` | 문단에 지정된 스타일을 적용합니다. |
| `apply_style_by_slot` | Ctrl+숫자 슬롯으로 문단 전체에 문서 스타일을 적용합니다. |
| `apply_text_style` | 기존 텍스트 내용은 유지하고 일치하는 텍스트 범위에 문서 스타일을 적용합니다. |
| `get_column_def` | 섹션의 단 설정을 조회합니다. |
| `set_column_def` | 섹션의 단 설정을 수정합니다. |

## 내어쓰기

| 도구 | 요약 |
|---|---|
| `set_hanging_indent` | 문단 내어쓰기 값을 수동으로 설정합니다. |
| `get_hanging_indent` | 문단 내어쓰기 값을 조회합니다. |
| `remove_hanging_indent` | 문단 내어쓰기를 제거합니다. |
| `set_auto_hanging_indent` | 번호/기호 마커를 감지해 문단 내어쓰기를 자동 설정합니다. |
| `set_table_cell_hanging_indent` | 표 셀 안 문단의 내어쓰기를 수동 설정합니다. |
| `get_table_cell_hanging_indent` | 표 셀 안 문단의 내어쓰기 값을 조회합니다. |
| `remove_table_cell_hanging_indent` | 표 셀 안 문단의 내어쓰기를 제거합니다. |
| `set_table_cell_auto_hanging_indent` | 표 셀 안 문단의 번호/기호 마커를 감지해 내어쓰기를 자동 설정합니다. |

## 표 조회와 탐색

| 도구 | 요약 |
|---|---|
| `get_tables` | 문서의 모든 표를 조회합니다. |
| `get_table_map` | 표 제목, 크기, 빈 표 여부 등 표 탐색용 요약 지도를 반환합니다. |
| `find_empty_tables` | 비어 있거나 placeholder만 있는 표를 찾습니다. |
| `get_tables_by_section` | 특정 섹션의 표 목록을 조회합니다. |
| `find_table_by_header` | 표 앞 제목 텍스트로 표를 찾습니다. |
| `get_tables_summary` | 여러 표의 헤더, 크기, 미리보기를 압축 조회합니다. |
| `get_element_index_for_table` | 전역 표 인덱스를 섹션 내 요소 인덱스로 변환합니다. |
| `get_table` | 특정 표의 전체 데이터를 조회하며, 각 셀의 `content_tree`로 중첩 표/문단 구조도 확인할 수 있습니다. |
| `get_table_cell` | 특정 표 셀 내용을 조회하며, `content_tree`, `has_nested_tables`, `nested_table_count`를 함께 반환합니다. |
| `get_table_cell_visuals` | 특정 표 셀 안의 이미지, 도형, 묶음 객체 요약과 이미지 참조를 조회합니다. |
| `get_table_as_csv` | 표 내용을 CSV 문자열로 내보냅니다. |
| `find_cell_by_label` | 라벨 텍스트를 가진 셀과 인접 입력 셀 위치를 찾습니다. |
| `get_cell_context` | 특정 셀 주변의 위/아래/좌/우 셀 내용을 조회합니다. |

## 표 편집

| 도구 | 요약 |
|---|---|
| `update_table_cell` | 기존 셀 스타일을 보존하며 표 셀 내용을 수정합니다. |
| `fill_by_path` | `라벨 > 방향` 경로 표현으로 여러 셀을 채웁니다. |
| `batch_fill_table` | 2차원 배열 데이터로 여러 표 셀을 일괄 입력합니다. |
| `set_cell_properties` | 셀 크기, 배경색, 정렬 등 셀 속성을 설정합니다. |
| `merge_cells` | 여러 표 셀을 하나로 병합합니다. |
| `split_cell` | 병합된 셀을 다시 개별 셀로 분할합니다. |
| `insert_table_row` | 표에 새 행을 삽입합니다. |
| `delete_table_row` | 표 행을 삭제하며, 마지막 행이면 표 전체를 삭제할 수 있습니다. |
| `insert_table_column` | 표에 새 열을 삽입합니다. |
| `delete_table_column` | 표 열을 삭제합니다. |
| `insert_table` | 새 표를 삽입합니다. |
| `insert_nested_table` | 표 셀 안에 중첩 표를 삽입합니다. |
| `insert_paragraph_in_table_cell` | 표 셀 안의 특정 문단 뒤에 새 문단을 삽입합니다. |
| `delete_table` | 문서에서 표 전체를 삭제합니다. |
| `move_table` | 표 XML 구조를 보존하며 표를 다른 위치로 이동합니다. |
| `copy_table` | 표를 복사하고 새 ID를 생성해 다른 위치에 삽입합니다. |

## 삽입 위치 찾기

| 도구 | 요약 |
|---|---|
| `get_insert_context` | 특정 요소 인덱스 앞뒤 내용을 보여줘 삽입 위치를 검증합니다. |
| `find_content_range_after_heading` | 특정 헤더부터 다음 헤더 전까지의 읽기 범위를 찾습니다. |
| `get_content_range` | 지정한 요소 범위의 문단, 표, 셀, 시각 자료 요약을 순서대로 읽습니다. |
| `find_insert_position_after_header` | 특정 텍스트 뒤의 삽입 위치를 찾고, 표 셀 내부인지도 알려줍니다. |
| `find_insert_position_after_table` | 특정 표 뒤, 표 바깥에 삽입할 위치를 찾습니다. |

## 페이지와 섹션

| 도구 | 요약 |
|---|---|
| `get_page_settings` | 용지 크기와 여백 등 페이지 설정을 조회합니다. |
| `set_page_settings` | 페이지 설정을 수정합니다. |
| `get_sections` | 문서의 섹션 목록을 조회합니다. |
| `insert_section` | 새 섹션을 삽입합니다. |
| `delete_section` | 섹션을 삭제합니다. |

## 머리글, 꼬리글, 각주, 미주

| 도구 | 요약 |
|---|---|
| `get_header` | 섹션 머리글 내용을 조회합니다. |
| `set_header` | 섹션 머리글 내용을 설정합니다. |
| `get_footer` | 섹션 꼬리글 내용을 조회합니다. |
| `set_footer` | 섹션 꼬리글 내용을 설정합니다. |
| `get_footnotes` | 문서의 각주 목록을 조회합니다. |
| `insert_footnote` | 특정 위치에 각주를 삽입합니다. |
| `get_endnotes` | 문서의 미주 목록을 조회합니다. |
| `insert_endnote` | 특정 위치에 미주를 삽입합니다. |

## 북마크와 하이퍼링크

| 도구 | 요약 |
|---|---|
| `get_bookmarks` | 문서의 북마크 목록을 조회합니다. |
| `insert_bookmark` | 특정 위치에 북마크를 삽입합니다. |
| `get_hyperlinks` | 문서의 하이퍼링크 목록을 조회합니다. |
| `insert_hyperlink` | 문단에 하이퍼링크를 삽입합니다. |

## 이미지와 Mermaid

| 도구 | 요약 |
|---|---|
| `get_images` | 문서의 이미지 목록을 조회합니다. |
| `get_visual_asset` | 이미지 binary id로 실제 이미지 payload와 메타데이터를 반환합니다. |
| `insert_image` | 이미지를 표 바깥의 독립 요소로 삽입합니다. |
| `update_image_size` | 기존 이미지 크기를 변경합니다. |
| `delete_image` | 문서에서 이미지를 삭제합니다. |
| `render_mermaid` | Mermaid 다이어그램을 이미지로 렌더링해 표 바깥에 삽입합니다. |
| `insert_image_in_cell` | 이미지를 특정 표 셀 안에 삽입합니다. |
| `render_mermaid_in_cell` | Mermaid 다이어그램을 이미지로 렌더링해 특정 표 셀 안에 삽입합니다. |

## 도형, 수식, 메모

| 도구 | 요약 |
|---|---|
| `insert_line` | 선 도형을 삽입합니다. |
| `insert_rect` | 사각형 도형을 삽입합니다. |
| `insert_ellipse` | 타원 도형을 삽입합니다. |
| `get_equations` | 문서의 수식 목록을 조회합니다. |
| `insert_equation` | 수식을 삽입합니다. |
| `get_memos` | 문서의 메모/주석 목록을 조회합니다. |
| `insert_memo` | 메모/주석을 삽입합니다. |
| `delete_memo` | 메모/주석을 삭제합니다. |

## 내보내기와 실행 취소

| 도구 | 요약 |
|---|---|
| `export_to_text` | 문서를 일반 텍스트 파일로 내보냅니다. |
| `export_to_html` | 문서를 HTML 파일로 내보냅니다. |
| `undo` | 마지막 변경을 되돌립니다. 여러 단계 되돌리기도 지원합니다. |
| `redo` | 되돌린 변경을 다시 적용합니다. 여러 단계 다시 적용도 지원합니다. |

## XML 진단과 직접 편집

| 도구 | 요약 |
|---|---|
| `get_section_xml` | 특정 섹션의 원본 XML을 조회합니다. |
| `set_section_xml` | 특정 섹션 XML을 직접 교체합니다. 유효한 HWPML이어야 합니다. |
| `analyze_xml` | XML 태그 불균형, 잘못된 구조 등 문제를 분석합니다. |
| `repair_xml` | 섹션 XML의 일부 구조 문제를 자동 복구합니다. |
| `get_raw_section_xml` | `get_section_xml`로 대체된 하위 호환용 원본 XML 조회 도구입니다. |
| `set_raw_section_xml` | `set_section_xml`로 대체된 하위 호환용 원본 XML 교체 도구입니다. |

## 대용량 문서 읽기와 인덱싱

| 도구 | 요약 |
|---|---|
| `chunk_document` | 문서를 겹침이 있는 청크로 나눠 대용량 분석을 돕습니다. |
| `search_chunks` | BM25 기반 점수로 문서 청크를 검색합니다. |
| `get_chunk_context` | 특정 청크 주변의 앞뒤 청크를 함께 가져옵니다. |
| `extract_toc` | 한국어 문서 관례를 바탕으로 목차 후보를 추출합니다. |
| `build_position_index` | 제목, 문단, 표, 이미지의 위치 인덱스를 생성합니다. |
| `get_position_index` | 캐시된 위치 인덱스를 가져오거나 없으면 생성합니다. |
| `search_position_index` | 위치 인덱스에서 텍스트나 요소 유형으로 검색합니다. |
| `get_chunk_at_offset` | 특정 문자 offset을 포함하는 청크를 찾습니다. |
| `invalidate_reading_cache` | 청크와 위치 인덱스 캐시를 비웁니다. |
