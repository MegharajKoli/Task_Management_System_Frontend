# Task Management System - React Frontend

A comprehensive React-based frontend for the Task Management System backend. This application provides a user-friendly interface for managing tasks, users, comments, and viewing task reports/dashboards.

## Features

✅ **Task Management**

- Create new tasks with title, description, priority, and assignee
- View all tasks with filtering by status and priority
- Edit existing tasks
- Delete tasks
- Real-time task list updates

✅ **Task Details & Comments**

- View detailed task information
- Add, view, and delete comments on tasks
- Track task changes with activity logs

✅ **User Management**

- View all users in the system
- Create new users with name, email, contact, and password
- User list display in grid layout

✅ **Dashboard & Reports**

- View total task count
- Tasks breakdown by status (Open, In Progress, Done)
- Tasks breakdown by priority (Low, Medium, High)
- Tasks assigned per user
- Real-time report refresh

## Project Structure

```
client/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts       # Axios configuration and interceptor
│   │   ├── taskService.ts         # Task API endpoints
│   │   ├── userService.ts         # User API endpoints
│   │   ├── commentService.ts      # Comment API endpoints
│   │   └── reportService.ts       # Report API endpoints
│   ├── components/
│   │   ├── TaskList.tsx           # Task list view with filters
│   │   ├── TaskForm.tsx           # Create/Edit task form
│   │   ├── TaskDetails.tsx        # Task detail view with comments
│   │   ├── TasksPage.tsx          # Main tasks page container
│   │   ├── UserManagement.tsx     # User management page
│   │   ├── Dashboard.tsx          # Report dashboard
│   │   └── index.ts               # Component exports
│   ├── styles/
│   │   ├── TaskList.css
│   │   ├── TaskForm.css
│   │   ├── TaskDetails.css
│   │   ├── UserManagement.css
│   │   ├── Dashboard.css
│   │   └── TasksPage.css
│   ├── types.ts                   # TypeScript interfaces and enums
│   ├── App.tsx                    # Main app with routing
│   ├── App.css                    # Global and navigation styles
│   ├── index.css                  # Base styles
│   └── main.tsx                   # Entry point
├── package.json
└── vite.config.ts
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd client
npm install
```

This will install:

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls

### 2. Configure Backend URL

Update the `API_BASE_URL` in [src/api/axiosInstance.ts](src/api/axiosInstance.ts) if your backend is running on a different URL:

```typescript
const API_BASE_URL = "http://localhost:5000/";
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the backend through REST API endpoints:

### Task Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### User Endpoints

- `GET /users` - Get all users
- `POST /users` - Create a new user

### Comment Endpoints

- `GET /comments/:taskId` - Get comments for a task
- `POST /comments/:taskId` - Add comment to a task
- `DELETE /comments/:commentId` - Delete a comment

### Report Endpoints

- `GET /reports/tasks` - Get task report/dashboard data

## Usage Guide

### Creating a Task

1. Navigate to the **Tasks** page
2. Click the **+ New Task** button
3. Fill in the required fields:
   - Title
   - Description
   - Assigned To (select from users list)
   - Priority (Low, Medium, High)
4. Click **Create Task**

### Viewing Task Details

1. On the Tasks page, click on any task card
2. View complete task information
3. Add or view comments
4. Edit or delete the task from the detail view

### Managing Users

1. Navigate to the **Users** page
2. View all existing users in the grid
3. Click **+ New User** to create a new user
4. Fill in the user details and click **Create User**

### Viewing Dashboard

1. Navigate to the **Dashboard** page
2. View:
   - Total number of tasks
   - Task breakdown by status
   - Task breakdown by priority
   - Number of tasks per user
3. Click **Refresh Report** to update the data

### Filtering Tasks

1. On the Tasks page, use the filter dropdowns
2. Filter by **Status**: Open, In Progress, Done, or All
3. Filter by **Priority**: Low, Medium, High, or All
4. Click **Refresh** to apply filters

## Data Models

### Task

```typescript
interface ITask {
  _id: string;
  title: string;
  description: string;
  assigned_to: IUser | string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

enum Status {
  Open = "Open",
  InProgress = "In Progress",
  Done = "Done",
}
```

### User

```typescript
interface IUser {
  _id: string;
  name: string;
  email: string;
  contact: string;
}
```

### Comment

```typescript
interface IComment {
  _id: string;
  text: string;
  taskId: string;
  createdAt: string;
}
```

## Styling

The application uses a consistent design system with:

- **Primary Color**: Blue (#2196f3)
- **Secondary Color**: Orange (#f57c00)
- **Danger Color**: Red (#d32f2f)
- **Success Color**: Green (#4caf50)
- **Responsive Design**: Mobile-friendly interface

CSS is organized into:

- `App.css` - Global styles and navigation
- Component-specific CSS files in `styles/` folder

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS3
- **Code Quality**: ESLint

## Error Handling

The application includes error handling for:

- Failed API calls
- Network errors
- Validation errors
- Form submission failures

Error messages are displayed in a red banner at the top of components.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] User authentication/login
- [ ] Task search functionality
- [ ] Advanced filtering options
- [ ] Task export (CSV/PDF)
- [ ] Real-time notifications
- [ ] Activity history page
- [ ] Task templates
- [ ] Drag-and-drop task management
- [ ] Dark mode
- [ ] Internationalization (i18n)

## Troubleshooting

### Backend Connection Error

- Ensure the backend server is running on `http://localhost:5000`
- Check the `API_BASE_URL` configuration in `src/api/axiosInstance.ts`
- Verify CORS is properly configured on the backend

### Tasks Not Loading

- Check browser console for error messages
- Verify backend API is responding to requests
- Check network tab in browser DevTools

### Form Submission Issues

- Ensure all required fields are filled
- Check that valid data is being submitted
- Review backend validation schemas

## Contributing

When adding new features:

1. Create new components in `src/components/`
2. Create corresponding API services in `src/api/`
3. Add TypeScript types in `src/types.ts`
4. Create component-specific CSS in `src/styles/`
5. Update routing in `App.tsx` if needed

## License

This project is part of the Task Management System training project.

## Support

For issues or questions, refer to the backend system documentation or contact the development team.
