# API Integration Documentation

This document describes how the frontend integrates with the Task Management System backend API.

## Base URL

```
http://localhost:5000/api
http://localhost:5000/users
http://localhost:5000/tasks
http://localhost:5000/comments
http://localhost:5000/reports
```

## API Endpoints

### Tasks

#### Get All Tasks

```
GET /tasks

Response:
{
  "data": [
    {
      "_id": "task_id_1",
      "title": "Task Title",
      "description": "Task Description",
      "assigned_to": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "contact": "1234567890"
      },
      "priority": "High|Medium|Low",
      "status": "Open|In Progress|Done",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Create Task

```
POST /tasks

Request Body:
{
  "title": "Task Title",
  "description": "Task Description",
  "assigned_to": "user_id",
  "priority": "High|Medium|Low"
}

Response:
{
  "data": {
    "_id": "new_task_id",
    "title": "Task Title",
    "description": "Task Description",
    "assigned_to": "user_id",
    "priority": "High",
    "status": "Open",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Single Task

```
GET /tasks/:id

Response:
{
  "data": {
    "_id": "task_id",
    "title": "Task Title",
    ...
  }
}
```

#### Update Task

```
PUT /tasks/:id

Request Body:
{
  "title": "Updated Title",
  "description": "Updated Description",
  "assigned_to": "user_id",
  "priority": "High|Medium|Low",
  "status": "Open|In Progress|Done"
}

Response:
{
  "data": {
    "_id": "task_id",
    "title": "Updated Title",
    ...
  }
}
```

#### Delete Task

```
DELETE /tasks/:id

Response:
{
  "message": "Task deleted successfully"
}
```

---

### Users

#### Get All Users

```
GET /users

Response:
{
  "data": [
    {
      "_id": "user_id_1",
      "name": "John Doe",
      "email": "john@example.com",
      "contact": "1234567890"
    }
  ]
}
```

#### Create User

```
POST /users

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "password": "securepassword"
}

Response:
{
  "data": {
    "_id": "new_user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "1234567890"
  }
}
```

#### Get Single User

```
GET /users/:id

Response:
{
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    ...
  }
}
```

---

### Comments

#### Get Task Comments

```
GET /comments/:taskId

Response:
{
  "data": [
    {
      "_id": "comment_id_1",
      "text": "This is a comment",
      "taskId": "task_id",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Add Comment to Task

```
POST /comments/:taskId

Request Body:
{
  "text": "This is a comment"
}

Response:
{
  "data": {
    "_id": "new_comment_id",
    "text": "This is a comment",
    "taskId": "task_id",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Delete Comment

```
DELETE /comments/:commentId

Response:
{
  "message": "Comment deleted successfully"
}
```

---

### Reports

#### Get Task Report

```
GET /reports/tasks

Response:
{
  "data": {
    "totalTasks": 15,
    "tasksByStatus": {
      "Open": 5,
      "In Progress": 7,
      "Done": 3
    },
    "tasksByPriority": {
      "Low": 3,
      "Medium": 8,
      "High": 4
    },
    "tasksByUser": [
      {
        "userId": "user_id_1",
        "userName": "John Doe",
        "taskCount": 5
      },
      {
        "userId": "user_id_2",
        "userName": "Jane Smith",
        "taskCount": 10
      }
    ]
  }
}
```

## Error Responses

All errors follow this format:

```
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

### Common Error Codes

| Status | Meaning                        |
| ------ | ------------------------------ |
| 200    | OK - Request successful        |
| 201    | Created - Resource created     |
| 400    | Bad Request - Invalid input    |
| 404    | Not Found - Resource not found |
| 500    | Server Error - Internal error  |

## Frontend API Services

The frontend uses service files in `src/api/` to communicate with the backend:

### taskService.ts

```typescript
taskService.getTasks(); // Get all tasks
taskService.getTaskById(id); // Get single task
taskService.createTask(data); // Create task
taskService.updateTask(id, data); // Update task
taskService.deleteTask(id); // Delete task
```

### userService.ts

```typescript
userService.getUsers(); // Get all users
userService.getUserById(id); // Get single user
userService.createUser(data); // Create user
```

### commentService.ts

```typescript
commentService.getCommentsByTask(taskId); // Get task comments
commentService.addComment(taskId, data); // Add comment
commentService.deleteComment(commentId); // Delete comment
```

### reportService.ts

```typescript
reportService.getTaskReport(); // Get task report/dashboard
```

## Data Types

### Priority

```
typedef "Low" | "Medium" | "High"
```

### Status

```
typedef "Open" | "In Progress" | "Done"
```

### Task

```typescript
interface ITask {
  _id: string;
  title: string;
  description: string;
  assigned_to: IUser | string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
  createdAt: string;
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

## Request/Response Headers

### Request Headers

```
Content-Type: application/json
```

### Response Headers

```
Content-Type: application/json
```

## CORS Configuration

The frontend makes cross-origin requests to the backend. Ensure your backend has CORS enabled for the frontend URL (typically `http://localhost:5173` for development).

## Error Handling

All API calls in the frontend include error handling:

```typescript
try {
  const data = await taskService.getTasks();
  // Handle success
} catch (error) {
  console.error("API Error:", error.response?.data || error.message);
  // Handle error
}
```

## Rate Limiting

The backend may implement rate limiting. If you receive a 429 (Too Many Requests) error:

- Wait a few seconds before retrying
- Implement exponential backoff in production

## Caching Strategy

The frontend does not implement caching by default. To avoid redundant requests:

- Consider implementing caching in the service layer
- Use state management to store fetched data
- Refresh only when necessary

## Testing API Endpoints

### Using cURL

```bash
# Get all tasks
curl http://localhost:5000/tasks

# Create a task
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Test description",
    "assigned_to": "user_id",
    "priority": "High"
  }'

# Update a task
curl -X PUT http://localhost:5000/tasks/task_id \
  -H "Content-Type: application/json" \
  -d '{"status": "Done"}'

# Delete a task
curl -X DELETE http://localhost:5000/tasks/task_id
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for the base URL
3. Create requests for each endpoint
4. Test with sample data

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch blocks
2. **Loading States**: Show loading indicators during API calls
3. **User Feedback**: Display success/error messages to users
4. **Validation**: Validate data before sending to backend
5. **Timeouts**: Implement request timeouts to handle hung requests

## Troubleshooting

### CORS Error

- Ensure backend has CORS enabled
- Check if backend is running
- Verify API_BASE_URL is correct

### 404 Not Found

- Verify the resource ID is correct
- Check if the resource exists in the database

### 400 Bad Request

- Validate all required fields are provided
- Check data types match API expectations
- Review error message for specific validation errors

### 500 Server Error

- Check backend logs for errors
- Restart the backend server
- Verify database connection

## Future Enhancements

- [ ] Implement request caching
- [ ] Add request throttling
- [ ] Implement WebSocket for real-time updates
- [ ] Add global error boundary for API errors
- [ ] Implement retry logic for failed requests
- [ ] Add request logging for debugging
