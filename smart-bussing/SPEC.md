# Project Specifications (SPEC.md)

This document is the single source of truth for requirements, architecture, and system
design decisions for SmartBussing Web.

## Overview
**SmartBussing Web** — Web dashboard and management portal for the SmartBussing urban mobility application.

## System Architecture
- **Structure**: SEPARATE REPOS with `smart-bussing` and `backend`.
- **Frontend**: React + Vite.
- **Backend**: Node.js / Express.
- **Database**: PostgreSQL via Prisma.

## Solution Layers
1. **Auth Layer**: User authentication, roles, and session management.
2. **Dashboard Layer**: Supervisor real-time map, bus tracking, and route assignments.
3. **Analytics Layer**: Metrics, reports, and system health.

## Requirements and Implementation Status (Milestones)

### Phase 1: Planning and Design
- [x] Scope definition.
- [x] Technical architecture.
- [x] Data model design.

### Phase 2: Base Development
- [ ] Authentication system and roles (Supervisor, Admin).
- [ ] Dashboard Base Interface.
- [ ] Mapbox Map Integration.
- [ ] Frontend-backend integration.

### Phase 3: Route & Supervisor Logic
- [ ] Dynamic Routes Sync.
- [ ] Supervisor Profile Components.

### Phase 4: Polish and Launch
- [ ] UX/UI refinement.
- [ ] Performance optimisation.
- [ ] Functional demo preparation.

## User Roles and Flows
- **Supervisor**: Manage routes, view live tracking, and overview drivers.
- **Admin**: System-wide configuration, user management, and advanced reporting.

## Main Data Models
- `User`: Handles authentication and roles.
- `Route`: Geographic line data for bus paths.
- `Stop`: Points of interest and bus stops along routes.

## API Endpoints (summary)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/routes | List all routes |
| POST | /api/routes | Create new route |

## Current Sprint Tasks

### Task: Auth & Routing Setup
**Description:** Implement React Router, protect dashboard route, and set up Supabase Google OAuth.
**Acceptance Criteria:**
- [x] React Router implemented separating `/` and `/dashboard`.
- [x] Login page with Google OAuth functional.
- [x] Dashboard page protected and displays Add Route card.
**Subtasks:**
- [x] Frontend: Install and configure `react-router-dom` and `supabase-js`.
- [x] Frontend: Implement `AuthContext` and `ProtectedRoute`.
- [x] Frontend: Build `LoginPage.jsx` and `DashboardPage.jsx`.

## Future Improvements (Backlog)
- Real-time WebSockets integration for bus location.
- Advanced analytics reporting dashboard.
