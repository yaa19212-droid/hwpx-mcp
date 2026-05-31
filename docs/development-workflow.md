# Development Workflow

This fork does not require an external spec/proposal CLI for normal
development. Legacy upstream workflow files are kept only as local archived
reference material and are not part of the tracked workflow.

## Default Flow

For small bug fixes, make the focused code change and add or update tests when
the behavior is covered by the existing test structure.

For risky HWPX/HWPML changes, write a short Markdown note before or alongside
the implementation. Use:

- `docs/bug-notes/` for bug analysis, reproduction notes, XML comparisons, and
  verification records.
- `docs/design-notes/` for planned behavior, architecture decisions, and tool
  workflow design.

## Suggested Note Shape

```md
# Short Title

## Problem

What fails, where it fails, and who sees the problem.

## Scope

Files, tools, or XML paths expected to change.

## Analysis

Reference behavior, generated XML differences, and assumptions.

## Plan

Small implementation steps.

## Verification

Automated tests, XML checks, and native Hancom Office checks when relevant.
```

## Compatibility Priorities

- Preserve original HWPML XML structure and style data where possible.
- Validate save/reload behavior for persistence bugs.
- Compare generated XML against native Hancom Office output for image, table,
  and layout-sensitive changes.
- Treat LibreOffice HWPX rendering as secondary to native Hancom Office
  compatibility.
