# VS Code 확장 분리 기록

## 배경

이 레포의 주 목적은 HWPX/HWP 문서를 AI 도구가 MCP로 읽고 편집할 수 있게 하는 standalone MCP 서버입니다. 기존 루트 패키지는 VS Code 커스텀 에디터 확장과 MCP 서버 번들을 함께 담고 있었지만, 두 기능은 사용자 경험과 배포 단위가 다릅니다.

따라서 VS Code 확장 기능은 이 레포의 기본 산출물에서 분리하고, 이 레포는 `mcp-server` 중심으로 유지합니다.

## 이 레포에 남는 것

- `mcp-server/`: MCP 서버 구현, 빌드 설정, 테스트
- `docs/`: MCP 서버 설계/운영 문서
- `openspec/`: 변경 제안과 스펙 기록
- `.vscode/`: MCP 서버 개발과 디버깅을 위한 로컬 워크스페이스 설정

## 별도 확장 프로젝트로 옮길 수 있는 대상

아래 파일들은 기존 VS Code 확장 패키징 또는 커스텀 에디터 구현에 속했던 항목입니다.

- 루트 `package.json`, `package-lock.json`, `tsconfig.json`, `.vscodeignore`
- `src/extension.ts`
- `src/editor/HwpxEditorProvider.ts`
- `src/editor/webview.ts`
- `src/hwpx/*`
- `src/hwp/*`
- `src/mcp/*`
- `scripts/create-sample-hwpx.js`
- `icon.png`

## 사용자 영향

MCP 서버 사용자는 기존처럼 `mcp-server`를 빌드하고 MCP 클라이언트가 `mcp-server/dist/index.js`를 실행하도록 설정하면 됩니다.

VS Code에서 `*.hwpx` 파일을 커스텀 에디터로 여는 기능이 필요하다면, 별도 VS Code 확장 프로젝트에서 관리하고 배포해야 합니다.
