# Tasks: VS Code 확장 분리

## 1. 점검

- [x] 1.1 VS Code 확장 패키징에만 필요한 루트 파일을 식별합니다.
- [x] 1.2 확장 전용 소스와 MCP 서버 전용 소스를 구분합니다.
- [x] 1.3 MCP 서버와 확장이 공유할 수 있는 HWPX/HWP 파싱/문서 처리 코드를 식별합니다.
- [x] 1.4 별도 확장 프로젝트로 옮길 파일 목록과, 이 레포에 남길 파일 목록을 정리합니다.

## 2. 구현

- [x] 2.1 루트 패키징에서 VS Code 확장 contribution, 명령, 커스텀 에디터 엔트리포인트를 분리합니다.
- [x] 2.2 확장 전용 소스 파일과 에셋을 별도 프로젝트로 옮길 수 있는 형태로 정리합니다.
- [x] 2.3 `mcp-server`가 의존하지 않는 확장 전용 빌드/패키징 설정을 이 레포의 기본 경로에서 제거합니다.
- [x] 2.4 README와 설정 안내를 MCP 서버 프로젝트 중심으로 수정하고, VS Code 확장은 별도 프로젝트로 분리되었음을 설명합니다.
- [x] 2.5 빌드/테스트 명령이 standalone MCP 서버를 대상으로 하도록 정리합니다.

## 3. 검증

- [x] 3.1 MCP 서버 빌드를 실행합니다.
- [x] 3.2 MCP 서버 테스트 스위트를 실행하거나, 로컬에서 실행할 수 없는 테스트가 있으면 그 이유를 기록합니다.
- [x] 3.3 이 레포의 기본 패키징 경로에 VS Code 확장 activation/contribution 참조가 남아 있지 않은지 확인합니다.
- [x] 3.4 분리 대상 파일 목록이 문서화되어 별도 확장 프로젝트에서 이어받을 수 있는지 확인합니다.

## Verification Notes

- `npm run build` in `mcp-server` passed.
- `npm test` in `mcp-server` ran 392 tests: 389 passed, 3 failed.
- Two failures require a local HWPX fixture supplied through `HWPX_E2E_SOURCE_FILE`.
- One failure is an existing nested-table deletion expectation mismatch in `src/ComplexWorkflow.e2e.test.ts`.
- A reference search found no remaining root/default VS Code extension packaging references such as `customEditors`, `hwpx.editor`, `extensionDevelopmentPath`, `@vscode/vsce`, or `compile:extension`.
