# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Frontend (This Project)               │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   Tasks Page   │  │ User Mgmt Page │  │  Dashboard     │   │
│  │                │  │                │  │                │   │
│  │ • TaskList     │  │ • User List    │  │ • Stats        │   │
│  │ • TaskForm     │  │ • Create Form  │  │ • Charts Data  │   │
│  │ • TaskDetails  │  │                │  │ • User Tasks   │   │
│  │ • Comments     │  │                │  │                │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                 │
│  Navigation Bar (React Router)                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ▼
                    ┌──────────────────┐
                    │  Axios Instance  │
                    │  (API Client)    │
                    └──────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              HTTP Requests to Backend                            │
│              http://localhost:5000                          │
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │   /tasks   │  │   /users   │  │ /comments  │  │/reports│ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Express Backend (Task_Management_App)               │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐   ┌────────────────┐   │
│  │  Controllers   │  │  Services      │   │  Repositories  │   │
│  │                │  │                │   │                │   │
│  │ • Task         │  │ • Task Service │   │ • Task Repo    │   │
│  │ • User         │  │ • User Service │   │ • User Repo    │   │
│  │ • Comment      │  │                │   │ • Comment Repo │   │
│  │ • Report       │  │                │   │                │   │
│  └────────────────┘  └────────────────┘   └────────────────┘   │
│                                                                 │
│           ┌─────────────────────────────────────┐              │
│           │     MongoDB Database                │              │
│           │                                     │              │
│           │ • Tasks Collection                  │              │
│           │ • Users Collection                  │              │
│           │ • Comments Collection               │              │
│           │ • Activity Logs Collection          │              │
│           └─────────────────────────────────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.tsx                                │
│                    (Main App + Routing)                         │
└────────────────┬────────────────────────────────┬───────────────┘
                 │                                │
        ┌────────▼──────────┐            ┌────────▼──────────┐
        │   Navigation Bar   │            │   Main Content    │
        │                   │            │   (Router)        │
        │ • Home Link       │            │                   │
        │ • Users Link     │            │ • TasksPage       │
        │ • Dashboard Link │            │ • UserManagement  │
        └───────────────────┘            │ • Dashboard       │
                                         └──────┬────────────┘
                         ┌───────────────────────┼─────────────┐
                         │                       │             │
                  ┌──────▼──────────┐   ┌────────▼─────┐ ┌─────▼──────┐
                  │   TasksPage     │   │ UserMgmt     │ │ Dashboard  │
                  │ (Container)     │   │              │ │            │
                  │                 │   │ • UserList   │ │ • Stats    │
                  ├─────────────────┤   │ • UserForm   │ │ • Charts   │
                  │ • TaskList      │   └──────────────┘ │ • Table    │
                  │ • TaskForm      │                    └────────────┘
                  │ • TaskDetails   │
                  └─────────────────┘
```

## Data Flow

```
User Action (Click, Submit)
        ▼
Component State Update (useState)
        ▼
Service Call (taskService, userService, etc.)
        ▼
Axios API Request
        ▼
Backend Processing
        ▼
Database Query/Update
        ▼
Response Data
        ▼
Component State Update
        ▼
UI Re-render
```

## File Organization

```
src/
├── api/                          # API Integration Layer
│   ├── axiosInstance.ts          # HTTP client config
│   ├── taskService.ts            # Task CRUD operations
│   ├── userService.ts            # User CRUD operations
│   ├── commentService.ts         # Comment CRUD operations
│   └── reportService.ts          # Report fetching
│
├── components/                   # React Components
│   ├── TaskList.tsx              # Task list display
│   ├── TaskForm.tsx              # Create/edit tasks
│   ├── TaskDetails.tsx           # Task details + comments
│   ├── TasksPage.tsx             # Tasks container
│   ├── UserManagement.tsx        # User management page
│   ├── Dashboard.tsx             # Reports/dashboard page
│   └── index.ts                  # Component exports
│
├── styles/                       # Component Styles
│   ├── TaskList.css
│   ├── TaskForm.css
│   ├── TaskDetails.css
│   ├── UserManagement.css
│   ├── Dashboard.css
│   └── TasksPage.css
│
├── types.ts                      # TypeScript interfaces
├── App.tsx                       # Main app component
├── App.css                       # Global styles
├── main.tsx                      # Entry point
└── index.css                     # Base styles
```

## Component Interaction

```
                            App.tsx
                      (Routing & Nav)
                              │
                ______________|_____________
                │              │            │
            TasksPage      UserMgmt      Dashboard
         (View Handler)      (Page)       (Page)
              │
        ______|_______
        │            │
    TaskList      TaskForm
       │              │
       └──────┬───────┘
            │
    ┌───────┴─────────┐
    │                 │
TaskDetails      CommentSection
    │
   Comments


API Services (Singleton Pattern)
├── taskService
├── userService
├── commentService
└── reportService

Each service handles:
- API endpoint Management
- Request/Response formatting
- Error handling
```

## State Management Flow

```
Component State (useState)
    ▼
Local Component State
    ▼
Props Passed Down
    ▼
Child Components Update
    ▼
Events Bubble Up
    ▼
Parent State Updated
    ▼
Re-render Cascades Down

(Future: Can be upgraded to Redux/Context API for global state)
```

## API Service Pattern

```typescript
// Pattern used for all services
export const serviceX = {
  getAll: async () => {
    /* API call */
  },
  getById: async (id) => {
    /* API call */
  },
  create: async (data) => {
    /* API call */
  },
  update: async (id, data) => {
    /* API call */
  },
  delete: async (id) => {
    /* API call */
  },
};

// Usage in components
const data = await taskService.getTasks();
```

## Error Handling Flow

```
Try-Catch Block
    ▼
Error Caught
    ▼
Error State Set
    ▼
Error Message Displayed
    ▼
User Sees Feedback
    ▼
User Can Retry

Axios Interceptors
    ▼
Response Error Logging
    ▼
Error Details in Console
```

## Page Flow Diagram

```
Home/Dashboard Page
        │
        ├─ Click "Tasks" ──► Task Management Page
        │                           │
        │                           ├─ Create Task ──► Task Form
        │                           │
        │                           ├─ Edit Task ──► Task Form
        │                           │
        │                           └─ View Task ──► Task Details
        │                                              │
        │                                              ├─ Add Comment
        │                                              └─ Delete Task
        │
        ├─ Click "Users" ──► User Management Page
        │                           │
        │                           ├─ View Users List
        │                           └─ Create New User
        │
        └─ Click "Dashboard" ──► Dashboard Report Page
                                    │
                                    ├─ View Statistics
                                    ├─ View Breakdowns
                                    └─ Refresh Data
```

## Technology Dependencies

```
React (UI Framework)
├── react-router-dom (Routing)
│   └── useNavigate, useParams, etc.
│
├── react-dom (DOM Rendering)
│
└── Built-in Hooks
    ├── useState (State management)
    ├── useEffect (Side effects)
    └── Other hooks as needed

HTTP Layer
├── Axios (HTTP Client)
└── Request/Response Interceptors

Styling
├── CSS3 (Native CSS)
└── Component-scoped stylesheets
```

## Build & Deployment Pipeline

```
Development
    ▼
npm run dev (Vite Dev Server)
    ▼
Hot Module Replacement
    ▼
Testing & Debugging
    ▼
npm run build (Production Build)
    ▼
Optimized dist/ folder
    ▼
Deploy to Hosting
    ▼
Production Live
```

## Security Considerations

```
Frontend:
✓ Client-side validation
✓ Error handling prevents info leakage
✓ No sensitive data in localStorage (for now)
✓ HTTPS ready

Backend Integration:
✓ API calls through Axios
✓ CORS configuration
✓ Backend handles authentication (ready to add)

Future:
- Add token-based authentication
- Implement authorization checks
- Add input sanitization
- Add rate limiting on frontend
```

## Performance Optimizations

Current:

- Lazy loading of components ready (React.lazy)
- Event delegation in lists
- Efficient state updates with React hooks
- CSS optimization with minification

Future:

- Implement code splitting
- Add React.memo for components
- Implement caching strategy
- Add pagination for large lists
- Implement virtual scrolling
