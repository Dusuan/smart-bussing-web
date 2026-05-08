# References and Architecture Patterns (REFERENCES.md)

This document centralises design patterns, naming conventions, and reference implementations
for the AI assistant to use when generating new code (especially with `/new-feature`).

## Backend (Node.js + Express)

### Architecture Pattern
We follow an N-layer architecture:
1. **Model** (Prisma Schema): Single source of truth for the database.
2. **Repository** (Optional): Abstraction over Prisma for reusable complex queries.
3. **Service**: Contains business logic. Must NOT know about HTTP (req/res).
4. **Controller**: Handles HTTP I/O, extracts params, delegates to Service.
5. **Route**: Defines endpoints and connects controllers with middlewares.

### Error Handling
- Use custom error classes (e.g. `AppError`, `NotFoundError`).
- Controllers must wrap async calls in `try/catch` or use a `catchAsync` wrapper.

## Frontend (React + Vite)

### Types (TypeScript)
- Define shared types or exact API interfaces before building components.
- Never use `any`. Prefer `unknown` or generics when necessary.

### Hooks
- Complex logic or API consumption must be encapsulated in Custom Hooks.
- Keep UI components as "dumb" as possible.

### API Requests
- ALL network requests must use TanStack Query via centralised Custom Hooks.
- It is strictly forbidden to call fetch/axios directly inside visual components.

**Required Structure:**
1. Define HTTP logic and Query Keys in `src/api/` (e.g. `userApi.ts`).
2. Encapsulate the query/mutation in `src/hooks/` (e.g. `useUsers.ts`).
3. Consume only the Custom Hook inside the visual component.

**Reference Snippet:**
```typescript
// 1. API definition (src/api/userApi.ts)
export const userKeys = {
all: ['users'] as const,
byId: (id: string) => ['users', id] as const,
};

export const userApi = {
getById: (id: string) => api.get(`/api/users/${id}`).then(r => r.data),
};

// 2. Custom Hook (src/hooks/useUser.ts)
export const useUser = (id: string) =>
useQuery({ queryKey: userKeys.byId(id), queryFn: () => userApi.getById(id), enabled: !!id });

// 3. Component consumption
const { data: user, isLoading, isError } = useUser(userId);
```

**Important details:**
- Use Skeleton components (not spinners) for loading states by default.
- Always handle `isError` with friendly fallback UI.
- Use `enabled` param when the query depends on prior data.

---
*Add new reference snippets as the architecture evolves.*
