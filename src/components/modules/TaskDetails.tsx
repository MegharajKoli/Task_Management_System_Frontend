import React, { useEffect, useState } from 'react';
import { deleteTask, fetchTaskById } from '../../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCommentsByTaskId, createComment, deleteComment } from '../../store/commentSlice';
import '../../styles/TaskDetails.css';
import { useNavigate , useParams } from 'react-router-dom';


const TaskDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState('');
  const { comments, loading, error, submitting } = useAppSelector(state => state.comments);
  const {currentTask,loading: taskLoading, error: taskError} = useAppSelector(state => state.tasks);
  const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchTaskById(id));
    dispatch(fetchCommentsByTaskId(id));
  }, [id, dispatch]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!id) return;
    dispatch(createComment({ id: id, commentData: { content: newComment } }))
      .unwrap()
      .then(() => setNewComment(''));
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(commentId));
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
        if (!id) return;
         try {
      await dispatch(deleteTask(id)).unwrap();
      navigate('/tasks');
    } catch (err) {
      console.error("Delete failed:", err);
    }
    }
  };
 
  if (taskLoading) {
  return <div className="loading">Loading task...</div>;
}
if (taskError) {
  return <div className="error-message">{taskError}</div>;
}
if (!currentTask) {
  return <div className="error-message">Task not found</div>;
}
  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <button className="btn-back" onClick={() => navigate('/tasks')}>
          ← Back
        </button>
        <h2>{currentTask.title}</h2>
        <div className="task-actions">
          <button className="btn-primary" onClick={() => navigate(`/tasks/${id}/edit`)}>
            Edit
          </button>
          <button className="btn-danger" onClick={handleDeleteTask}>
            Delete
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-details-content">
        <div className="task-info">
          <div className="info-section">
            <h3>Task Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Title:</label>
                <p>{currentTask.title}</p>
              </div>
              <div className="info-item">
                <label>Description:</label>
                <p>{currentTask.description}</p>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <p className="status-badge">{currentTask.status}</p>
              </div>
              <div className="info-item">
                <label>Priority:</label>
                <p className="priority-badge">{currentTask.priority}</p>
              </div>
              <div className="info-item">
                <label>Assigned To:</label>
                <p>{typeof currentTask.assigned_to === 'string' ? currentTask.assigned_to : currentTask.assigned_to?.name}</p>
              </div>
              <div className="info-item">
                <label>Created At:</label>
                <p>{new Date(currentTask.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="comments-section">
            <h3>Comments ({comments.length})</h3>

            {loading ? (
              <div className="loading">Loading comments...</div>
            ) : (
              <>
                <div className="comments-list">
                  {comments.length === 0 ? (
                    <p className="no-comments">No comments yet</p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment._id} className="comment-item">
                        <p className="comment-text">{comment.content}</p>
                        <div className="comment-footer">
                          <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
                          <button
                            className="btn-delete-comment"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddComment} className="add-comment-form">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <button type="submit" className="btn-primary" disabled={submitting || !newComment.trim()}>
                    {submitting ? 'Adding...' : 'Add Comment'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
