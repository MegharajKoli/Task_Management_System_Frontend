# Quick Reference Guide

## ⚡ Quick Start (2 minutes)

```bash
# 1. Navigate to client
cd client

# 2. Install dependencies (first time only)
npm install

# 3. Start the app
npm run dev

# 4. Open in browser
# http://localhost:5173
```

## 🗂️ File Structure

```
client/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts      # HTTP Config
│   │   ├── taskService.ts        # Task API
│   │   ├── userService.ts        # User API
│   │   ├── commentService.ts     # Comments API
│   │   └── reportService.ts      # Reports API
│   ├── components/
│   │   ├── TaskList.tsx          # Task List View
│   │   ├── TaskForm.tsx          # Create/Edit Form
│   │   ├── TaskDetails.tsx       # Details + Comments
│   │   ├── TasksPage.tsx         # Main Container
│   │   ├── UserManagement.tsx    # User Page
│   │   ├── Dashboard.tsx         # Reports Page
│   │   └── index.ts              # Exports
│   ├── styles/                   # Component Styles
│   ├── types.ts                  # Data Types
│   ├── App.tsx                   # Main App + Routes
│   ├── main.tsx                  # Entry Point
│   └── ...
```

## 📍 Routes

| Route        | Component      | Purpose               |
| ------------ | -------------- | --------------------- |
| `/`          | TasksPage      | View and manage tasks |
| `/users`     | UserManagement | Manage users          |
| `/dashboard` | Dashboard      | View reports          |

## 🎯 Main Features

### Tasks

- **Create**: Fill form and submit
- **Read**: View in list or details
- **Update**: Edit from details view
- **Delete**: Remove task from details
- **Filter**: By status/priority

### Comments

- **Add**: From task details
- **View**: All comments listed
- **Delete**: Remove individual comments

### Users

- **List**: All users displayed
- **Create**: Add new user with form

### Dashboard

- **Stats**: Total tasks, by status, by priority
- **Data**: Tasks per user table

## 💻 Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## 🔧 Configuration

### Change Backend URL

File: `src/api/axiosInstance.ts`

```typescript
const API_BASE_URL = "http://localhost:5000/";
```

### Change Colors

File: `src/App.css`

```css
:root {
  --primary-color: #2196f3;
  --danger-color: #d32f2f;
  --success-color: #4caf50;
  --warning-color: #ff9800;
}
```

## 📊 Data Models

### Task

```typescript
{
  _id: string;
  title: string;
  description: string;
  assigned_to: User | string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
  createdAt: string;
}
```

### User

```typescript
{
  _id: string;
  name: string;
  email: string;
  contact: string;
}
```

### Comment

```typescript
{
  _id: string;
  text: string;
  taskId: string;
  createdAt: string;
}
```

## 🌐 API Endpoints

### Tasks

```
GET    /tasks           # All tasks
POST   /tasks           # Create task
GET    /tasks/:id       # Single task
PUT    /tasks/:id       # Update task
DELETE /tasks/:id       # Delete task
```

### Users

```
GET    /users           # All users
POST   /users           # Create user
GET    /users/:id       # Single user
```

### Comments

```
GET    /comments/:taskId      # Task comments
POST   /comments/:taskId      # Add comment
DELETE /comments/:commentId   # Delete comment
```

### Reports

```
GET    /reports/tasks   # Dashboard data
```

## 🎨 Colors & Styling

| Color      | Value   | Usage               |
| ---------- | ------- | ------------------- |
| Primary    | #2196f3 | Main buttons, links |
| Secondary  | #f57c00 | Secondary actions   |
| Danger     | #d32f2f | Delete, errors      |
| Success    | #4caf50 | Success messages    |
| Warning    | #ff9800 | Warnings            |
| Background | #f5f5f5 | Page background     |

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "axios": "^1.13.5",
  "typescript": "~5.9.3",
  "vite": "^7.3.1"
}
```

## 🐛 Troubleshooting

| Issue             | Solution                          |
| ----------------- | --------------------------------- |
| Connection Error  | Check backend on `localhost:5000` |
| Nothing Loads     | Hard refresh (Ctrl+F5)            |
| Tasks Not Showing | Create users first                |
| 404 on Components | Check routes in App.tsx           |
| Styles Broken     | Clear cache, restart server       |

## 📝 Adding New Feature

1. **Create Component**: `src/components/MyComponent.tsx`
2. **Add API Service**: Update or create in `src/api/`
3. **Add Types**: Define in `src/types.ts`
4. **Create Styles**: Add CSS in `src/styles/MyComponent.css`
5. **Add Route**: Update `App.tsx` (if page)
6. **Export**: Add to `src/components/index.ts`

## 🚀 Deployment

### Build

```bash
npm run build
```

### Deploy

Upload `dist/` folder to:

- Netlify
- Vercel
- AWS S3
- Your server

### Remember

- Update API URL in `src/api/axiosInstance.ts` before build
- Run `npm run build` after changes
- Test in production with `npm run preview`

## 🔑 Key Files to Know

| File                       | Purpose          |
| -------------------------- | ---------------- |
| `src/App.tsx`              | Main app, routes |
| `src/types.ts`             | All data types   |
| `src/api/axiosInstance.ts` | Backend config   |
| `src/App.css`              | Global styles    |
| `package.json`             | Dependencies     |

## 💡 Tips

- Use browser DevTools (F12) to debug
- Check console for errors
- Use Network tab for API calls
- Create multiple users for testing
- Test with different task statuses
- Try all filters and features

## 📚 Documentation Files

- **FRONTEND_README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup
- **API_INTEGRATION.md** - API reference
- **PROJECT_SUMMARY.md** - What was built

## 🎓 Component Usage Example

### Using TaskList

```tsx
<TaskList
  onTaskSelect={handleSelect}
  onCreateNew={handleCreate}
  refreshTrigger={refreshCount}
/>
```

### Using TaskForm

```tsx
<TaskForm task={selectedTask} onSave={handleSave} onCancel={handleCancel} />
```

### Using API Services

```tsx
const tasks = await taskService.getTasks();
const newTask = await taskService.createTask(data);
await taskService.deleteTask(id);
```

## ✅ Checklist Before Deploy

- [ ] Backend is running on correct port
- [ ] API URL is updated
- [ ] All tests pass
- [ ] No console errors
- [ ] Responsive design tested
- [ ] All features work
- [ ] Error handling works
- [ ] Production build passes

## 🆘 Need Help?

1. Check browser console (F12)
2. Review documentation files
3. Check API responses in Network tab
4. Verify backend is running
5. Re-read SETUP_GUIDE.md

---

**Happy Coding! 🎉**
