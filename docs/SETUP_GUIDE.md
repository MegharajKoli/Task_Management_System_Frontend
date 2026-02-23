# Frontend Setup Guide

Follow these steps to set up and run the React frontend for the Task Management System.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Backend Server** running on `http://localhost:5000`

## Step 1: Navigate to Client Directory

```bash
cd client
```

## Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This installs:

- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.13.0
- Axios 1.13.5
- TypeScript
- Vite build tool
- ESLint and other dev tools

## Step 3: Verify Backend Configuration

Open [src/api/axiosInstance.ts](src/api/axiosInstance.ts) and ensure the backend URL is correct:

```typescript
const API_BASE_URL = "http://localhost:5000/api";
```

If your backend runs on a different port, update this URL accordingly.

## Step 4: Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:

```
  VITE v7.3.1  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Step 5: Open in Browser

Navigate to [http://localhost:5173](http://localhost:5173) in your web browser.

The application should load with the Task Management System interface.

## Step 6: Create Initial Users (Optional)

If you don't have any users in the system:

1. Go to the **Users** page
2. Click **+ New User**
3. Fill in the form with sample user data:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Contact**: 1234567890
   - **Password**: password123
4. Click **Create User**
5. Repeat to add more users

## Step 7: Create Tasks

Now you can create tasks:

1. Navigate to the **Tasks** page
2. Click **+ New Task**
3. Fill in:
   - **Title**: My First Task
   - **Description**: Task description here
   - **Assigned To**: Select a user
   - **Priority**: Medium
4. Click **Create Task**

## Step 8: Explore Features

### Tasks Page

- View all tasks in a list
- Filter by status and priority
- Click on any task to view details
- Add comments to tasks
- Edit or delete tasks

### Users Page

- View all users
- Create new users
- See user details

### Dashboard Page

- View total task count
- See task breakdown by status
- See task breakdown by priority
- View tasks per user

## Troubleshooting

### Issue: "Cannot GET /"

**Solution**: Make sure you're accessing `http://localhost:5173`, not `http://localhost:5000`

### Issue: "Network Error" or "Failed to connect to backend"

**Solution**:

- Check if the backend server is running on port 5000
- Verify the API_BASE_URL in `src/api/axiosInstance.ts` is correct
- Check browser console (F12) for detailed errors

### Issue: Tasks not loading

**Solution**:

1. Open browser DevTools (F12)
2. Check the Network tab for failed requests
3. Check the Console tab for error messages
4. Verify backend is running and has tasks in the database

### Issue: Cannot create tasks (error about users)

**Solution**:

- You need to create at least one user before creating tasks
- Go to Users page and create a user first

### Issue: Styling looks broken

**Solution**:

- Clear browser cache (Ctrl+Shift+Delete on Windows/Linux, Cmd+Shift+Delete on Mac)
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint -- --fix
```

## Project Files Overview

| File/Folder       | Purpose                          |
| ----------------- | -------------------------------- |
| `src/api/`        | API integration files (services) |
| `src/components/` | React components                 |
| `src/styles/`     | CSS files for components         |
| `src/types.ts`    | TypeScript interfaces and types  |
| `src/App.tsx`     | Main App component with routing  |
| `src/main.tsx`    | Application entry point          |
| `package.json`    | Project dependencies             |
| `vite.config.ts`  | Vite configuration               |
| `tsconfig.json`   | TypeScript configuration         |

## Making Changes

### To Create a New Component

1. Create a new file in `src/components/`
2. Write your React component in TypeScript
3. Create corresponding CSS in `src/styles/`
4. Export it from `src/components/index.ts`
5. Use it in your application

### To Add a New API Service

1. Create a new service file in `src/api/`
2. Define your API endpoints using axios
3. Export the service functions
4. Use them in your components

### To Modify Styles

- Edit CSS files in `src/styles/` for component-specific styles
- Edit `src/App.css` for global styles

## Going to Production

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy the Build

You can deploy the contents of the `dist/` folder to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service
- Your own web server with nginx/Apache

### Important: Set Backend URL for Production

Before building for production, update the backend URL in `src/api/axiosInstance.ts`:

```typescript
const API_BASE_URL = "https://your-production-backend-url/api";
```

Then rebuild:

```bash
npm run build
```

## Getting Help

If you encounter issues:

1. Check the browser console (F12 → Console tab)
2. Check the Network tab to see failed API requests
3. Review the [FRONTEND_README.md](FRONTEND_README.md) for detailed documentation
4. Review backend logs to ensure the API is working correctly

## Next Steps

- Explore the code structure
- Understand how services communicate with the backend
- Customize styling to match your brand
- Add additional features as needed
- Deploy to your hosting platform

Enjoy using the Task Management System!
