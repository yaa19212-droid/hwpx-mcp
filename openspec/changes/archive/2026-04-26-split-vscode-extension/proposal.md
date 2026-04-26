# Change: VS Code 확장 분리

## Why

이 레포의 핵심 목적은 HWPX/HWP 문서를 읽고 편집할 수 있는 MCP 서버를 제공하는 것입니다. VS Code 커스텀 에디터 확장은 별도의 사용자 경험과 배포 단위를 가진 기능이므로, 같은 레포 안에 함께 두면 제품 경계와 유지보수 책임이 흐려집니다.

확장 기능 자체를 폐기하기보다는, MCP 서버 레포와 VS Code 확장 레포를 분리해 각각의 목적에 맞게 관리할 수 있도록 합니다.

## What Changes

- **BREAKING**: 이 레포의 루트 패키징에서 VS Code 확장 엔트리포인트와 커스텀 에디터 contribution을 분리합니다.
- standalone MCP 서버를 이 레포의 주 지원 산출물로 유지합니다.
- VS Code 확장에만 필요한 소스, 에셋, 빌드/패키지 메타데이터는 별도 확장 프로젝트로 옮길 수 있게 분리 범위를 명확히 합니다.
- MCP 서버와 공유해야 하는 HWPX/HWP 파싱 로직이 있는 경우, 중복 삭제하지 않고 공유 방식 또는 이관 방식을 결정합니다.
- 설치 및 설정 문서가 이 레포에서는 `mcp-server`를 제품 엔트리포인트로 가리키도록 수정합니다.

## Impact

- 영향받는 스펙: `repository-packaging`
- 영향받는 코드: 루트 `package.json`, `src/extension.ts`, `src/editor/*`, 루트의 확장 전용 에셋/설정, README 설치 안내
- 마이그레이션: MCP 서버 사용자는 MCP 클라이언트에서 `mcp-server/dist/index.js`를 직접 실행하도록 설정합니다. VS Code 확장이 계속 필요하다면 분리된 확장 프로젝트에서 별도로 설치/배포합니다.
