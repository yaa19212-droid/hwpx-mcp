## MODIFIED Requirements

### Requirement: VS Code HWPX 커스텀 에디터
이 레포는 `*.hwpx` 파일용 커스텀 에디터를 등록하는 VS Code 확장을 같은 패키징 단위로 제공하지 않아야 한다.

**Reason**: 이 레포의 범위를 HWPX/HWP MCP 서버로 명확히 합니다. VS Code 에디터 화면은 별도의 제품 경계와 배포 주기를 가진 독립 프로젝트로 분리합니다.

**Migration**: MCP 서버 사용자는 MCP 클라이언트가 `mcp-server/dist/index.js`에 있는 standalone 서버를 실행하도록 설정합니다. VS Code 확장이 필요한 사용자는 분리된 확장 프로젝트를 별도로 설치합니다.

#### Scenario: VS Code에서 HWPX 파일 열기
- **WHEN** 사용자가 이 변경 이후 VS Code에서 `*.hwpx` 파일을 연다
- **THEN** 이 레포의 MCP 서버 패키지는 해당 파일을 위한 VS Code 커스텀 에디터를 제공하지 않는다
- **AND** VS Code 커스텀 에디터 기능은 별도 확장 프로젝트의 책임이다

## ADDED Requirements

### Requirement: MCP 서버 중심 레포
이 레포는 standalone MCP 서버를 주 지원 산출물로 제시해야 한다.

#### Scenario: 프로젝트 설치
- **WHEN** 사용자가 레포의 설치 안내를 따른다
- **THEN** 문서화된 설정 절차는 `mcp-server` 아래의 서버를 빌드하고 설정한다

### Requirement: 확장 분리 경로 문서화
이 레포는 VS Code 확장 기능이 삭제된 것이 아니라 별도 프로젝트로 분리되었음을 문서화해야 한다.

#### Scenario: VS Code 확장이 필요한 사용자
- **WHEN** 사용자가 VS Code 확장 기능을 찾는다
- **THEN** 문서는 해당 기능이 MCP 서버 레포의 기본 산출물이 아니며 별도 확장 프로젝트에서 관리된다고 안내한다
