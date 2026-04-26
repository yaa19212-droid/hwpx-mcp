# Content Range and Visual Reading Plan

## 배경

현재 MCP 도구는 문단, 표, 표 셀 텍스트, 중첩 표를 읽는 데는 어느 정도 대응한다. 그러나 사용자가 "PPT 4 page를 읽고 주석을 추가하라" 또는 "4쪽의 도표와 설명을 읽어라"처럼 특정 범위의 콘텐츠 전체를 요구하는 경우에는 부족하다.

특히 HWPX 문서에서는 표 셀, 일반 문단, 도형, 이미지, 묶음 객체(container)가 섞여 있을 수 있다. `PPT 3 page` 사례처럼 톱 레벨 표의 오른쪽 셀에 시각 자료가 container로 들어 있고, 그 안에 이미지와 텍스트 라벨이 함께 포함될 수 있다. 기본 읽기 도구가 이를 단순히 `container`라고만 표시하면, 에이전트가 추가 시각 읽기가 필요한지 판단하기 어렵다.

## 목표

- 특정 헤더 또는 요소 범위 안의 콘텐츠를 순서대로 읽을 수 있게 한다.
- 범위 안의 문단, 표, 표 셀, 이미지, 도형, container를 빠짐없이 가볍게 노출한다.
- 기본 읽기 도구는 이미지 payload를 직접 반환하지 않고, visual affordance만 제공한다.
- 에이전트가 맥락상 필요하다고 판단할 때만 별도 도구로 이미지 payload를 요청하게 한다.
- 표 내부 시각 자료와 표 바깥 시각 자료를 동일한 원칙으로 다룬다.

## 비목표

- MCP 서버가 OCR이나 이미지 해석을 직접 수행하지 않는다.
- HWPX XML만으로 물리 페이지를 완벽히 복원한다고 가정하지 않는다.
- 모든 도형의 시각적 렌더링을 서버에서 재구성하지 않는다.

## 현재 도구의 한계

- `get_insert_context`는 주변 element 요약만 반환하고, 범위 안의 전체 계층 구조를 읽기에는 부족하다.
- `get_table` / `get_table_cell`은 표와 중첩 표에는 강하지만, container 내부 시각 자료 요약이 아직 약하다.
- `get_images`는 문서 전체 이미지 id와 크기만 반환하며, 이미지 위치와 소속 맥락을 충분히 알려주지 않는다.
- `build_position_index`는 `heading`, `paragraph`, `table` 중심이며 image/container/shape를 포함하지 않는다.
- 물리적 "4쪽"을 직접 읽는 도구는 없다. 현재는 `PPT 4 page` 같은 마커 기반 범위가 더 현실적이다.

## 제안 도구

### 1. `find_content_range_after_heading`

헤더 텍스트를 기준으로 읽을 범위를 찾는다.

입력 예:

```json
{
  "doc_id": "doc",
  "heading_text": "PPT 4 page",
  "until_next_heading": true,
  "heading_pattern": "PPT \\d+ page"
}
```

출력 예:

```json
{
  "section_index": 0,
  "start_element_index": 29,
  "end_element_index": 32,
  "start_heading": "PPT 4 page",
  "end_reason": "next_heading",
  "end_heading": "PPT 5 page"
}
```

### 2. `get_content_range`

요소 범위 안의 모든 콘텐츠를 순서대로 반환한다.

입력 예:

```json
{
  "doc_id": "doc",
  "section_index": 0,
  "start_element_index": 29,
  "end_element_index": 32,
  "include_visual_summary": true
}
```

출력 개념:

```json
{
  "items": [
    {
      "type": "paragraph",
      "element_index": 29,
      "text": "PPT 4 page",
      "style_id": 4
    },
    {
      "type": "table",
      "element_index": 31,
      "table_index": 4,
      "rows": 1,
      "cols": 1,
      "cells": [
        [
          {
            "text": "...",
            "content_tree": [
              { "type": "paragraph", "text": "..." },
              {
                "type": "container",
                "container_kind": "grouped_visual",
                "texts": ["..."],
                "image_refs": ["image3"],
                "shape_count": 4,
                "requires_visual_read": true
              }
            ]
          }
        ]
      ]
    }
  ],
  "visuals": [
    {
      "visual_id": "section0_element31_cell0_0_container0_image0",
      "scope": {
        "section_index": 0,
        "element_index": 31,
        "table_index": 4,
        "row": 0,
        "col": 0
      },
      "binary_id": "image3",
      "mime_type": "image/png",
      "requires_visual_read": true
    }
  ]
}
```

### 3. `get_visual_asset`

이미지 payload를 실제로 반환한다. 기본 범위 읽기에서는 호출하지 않는다.

입력 예:

```json
{
  "doc_id": "doc",
  "binary_id": "image3"
}
```

출력:

- MCP image content 또는 base64
- `mime_type`
- `binary_id`
- 가능하면 원본 파일명/확장자

### 4. `get_table_cell_visuals`

표 셀 하나의 시각 객체만 자세히 조회하는 중간 도구다. 이미지 payload는 반환하지 않는다.

입력 예:

```json
{
  "doc_id": "doc",
  "section_index": 0,
  "table_index": 3,
  "row": 0,
  "col": 1
}
```

출력:

```json
{
  "containers": [
    {
      "container_index": 0,
      "texts": ["잠복기", "전구기", "황달기", "회복기"],
      "image_refs": ["image2"],
      "shape_count": 4,
      "requires_visual_read": true
    }
  ]
}
```

## 데이터 모델 보강

`content_tree`의 visual node를 확장한다.

현재:

```json
{ "type": "container" }
```

개선:

```json
{
  "type": "container",
  "container_kind": "grouped_visual",
  "texts": ["잠복기", "전구기", "황달기", "회복기"],
  "image_refs": ["image2"],
  "shape_count": 4,
  "requires_visual_read": true
}
```

이미지 node:

```json
{
  "type": "image",
  "binary_id": "image2",
  "mime_type": "image/png",
  "requires_visual_read": true
}
```

도형 node:

```json
{
  "type": "shape",
  "kind": "rect",
  "text": "잠복기"
}
```

## 워크플로우

### "PPT 4 page 읽고 주석 추가"

1. `find_content_range_after_heading("PPT 4 page", until_next_heading=true)`
2. `get_content_range(...)`
3. 에이전트가 반환된 `items`를 읽는다.
4. `requires_visual_read=true`인 visual이 중요해 보이면 `get_visual_asset` 호출
5. 멀티모달 모델이 이미지를 해석한다.
6. 문단/표/이미지 내용을 종합해 주석 작성
7. `insert_paragraph(..., ctrl_slot: 9)` 등으로 주석 삽입

### "수정 결과 확인"

1. `get_insert_context` 또는 `get_content_range`
2. 주석 텍스트, 위치, 스타일만 확인
3. visual payload는 다시 읽지 않는다.

## 구현 단계

### Phase 1: Visual summary

- `TableCell.content_tree`의 `container`, `image`, `shape` 요약 확장
- container 내부 텍스트 추출
- container 내부 image binary id 추출
- 실제 `PPT 3 page` fixture로 회귀 테스트 추가

### Phase 2: Content range reader

- `find_content_range_after_heading` 추가
- `get_content_range` 추가
- 문단/표/셀/container/image/shape를 순서대로 반환
- position index 또는 별도 range item 생성 로직에 visual 항목 포함

### Phase 3: Visual asset extraction

- `get_visual_asset` 추가
- `BinData` / `Contents/content.hpf`에서 binary id를 실제 파일과 MIME으로 매핑
- MCP image content 반환 검토
- fallback으로 base64 반환 옵션 제공

### Phase 4: Page-like range support

- `PPT n page` 마커 기반 range helper 강화
- 물리 페이지 지원 가능성 조사
- HWPX lineseg/layout 정보만으로 부족하면 "estimated page"로 명시

## 리스크와 주의점

- HWPX에서 물리 페이지는 렌더링 결과에 가깝기 때문에 XML만으로 정확히 나누기 어렵다.
- container 안의 이미지가 실제 의미의 핵심일 수 있으므로, visual affordance를 누락하면 에이전트 판단이 틀어진다.
- 기본 읽기에서 이미지 payload를 항상 반환하면 비용과 컨텍스트가 급증한다.
- 이미지 binary id와 파일 경로/MIME 매핑은 `content.hpf` manifest와 실제 `BinData` 파일을 함께 확인해야 한다.

## 성공 기준

- `PPT 3 page` 범위를 읽을 때 왼쪽 nested table과 오른쪽 container 요약이 모두 나온다.
- 오른쪽 container에서 `잠복기/전구기/황달기/회복기` 텍스트와 `image2` 참조가 나온다.
- 에이전트가 필요할 때만 `get_visual_asset(image2)`를 호출할 수 있다.
- 결과 확인 시에는 이미지 재해석 없이 삽입된 주석 위치와 스타일만 확인할 수 있다.
