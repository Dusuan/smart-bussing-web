# Project Instructions (CLAUDE.md)

This document contains the general rules, conventions, and guidelines for the AI assistant
when working on SmartBussing Web.

## Custom Commands

- `/load-project`: Read `CLAUDE.md`, `SPEC.md`, and `WORKLOG.md` in that order. Respond with
a summary of the current state, what was in progress, and the next step. Do NOT write code
until explicitly approved.

- `/review-code`: Review recently written code with a strict senior developer mindset. Evaluate:
1) Bugs / Edge cases, 2) Compliance with `CLAUDE.md`, 3) Simplification (over-engineering),
4) Error handling, 5) Production risks. Be direct and concise.

- `/new-feature [description]`: Start implementing a new feature. First generate a plan.
Upon approval, implement in order: Backend (model → repo → service → controller → route),
then Frontend (types → hook → component → integration). Write TS types first and follow
patterns from `REFERENCES.md`.

- `/fix-bug [description]`: Diagnose and fix a bug. Respond with: 1) Probable cause,
2) Files involved, 3) Minimum fix needed. Strictly promise NOT to touch anything beyond the
reported bug. Show the exact diff of changes to be made.

- `/update-worklog`: Update `WORKLOG.md` at the end of the session. Include: Date, What we
implemented (list), What is still in progress, Blockers, Next steps by priority.

- `/add-reference [topic]`: Add a snippet to `REFERENCES.md` for a new pattern or library.
Include: When to use the pattern, a minimal working snippet, and gotchas / important details,
maintaining the existing style.

- `/update-spec [change]`: Update `SPEC.md` for design or scope changes. Ensure:
1) Mark [x] implemented features, 2) Add new ones with [ ], 3) Update data models,
4) Update endpoints.

- `/agent [role]`: Invoke a sub-agent expert to review code under a specific lens:
- `security`: Look for injection vulnerabilities, bad auth, exposed secrets, unsanitised
inputs and misconfigured JWT. Report with severity (CRITICAL / HIGH / MEDIUM / LOW).
- `dba`: Expert in PostgreSQL. Review query efficiency / indexes, normalisation, N+1
queries, foreign keys and constraints.
- `qa`: QA Engineer. Generate necessary test cases, probable edge cases and one integration
test (happy path) in the project's test stack.
- `frontend`: React/UX Expert. Evaluate state management, unnecessary re-renders, full UX
coverage (loading / error / empty states) and component cohesion.

## Tech Stack (SmartBussing Web)
- **Frontend**: React + Vite, TailwindCSS, TypeScript.
- **Backend**: Node.js, Express, Prisma, TypeScript.
- **Database**: PostgreSQL.
- **Key Libraries**: TailwindCSS, MUI, TanStack Query.

## General Conventions
- Keep code modular, clean, and well-structured.
- Use TypeScript — always define types and interfaces explicitly.
- Comments explain the **why** behind complex decisions, never the obvious **what**.
- Follow existing linting/formatting configuration in the project.
- Max file size: 200 lines. Extract sub-components or helpers if exceeded.

## Working Process
1. Analyse requirements and the current codebase before proposing solutions.
2. Make iterative, small, and testable changes.
3. Always update `WORKLOG.md` after completing important tasks or ending a work session.
4. Never modify files outside the scope of the current task.
5. Confirm with the user before making database schema changes.

# Behavioral Guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan.
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
