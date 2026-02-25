import React, { useEffect, useState } from 'react';
import type { ITask } from '../types';
import { deleteTask } from '../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchCommentsByTaskId, createComment, deleteComment } from '../store/commentSlice';
import '../styles/TaskDetails.css';

interface TaskDetailsProps {
  task: ITask;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onEdit, onDelete, onBack }) => {
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState('');
  const { comments, loading, error, submitting } = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchCommentsByTaskId(task._id));
  }, [task._id, dispatch]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    dispatch(createComment({ id: task._id, commentData: { content: newComment } }))
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
        dispatch(deleteTask(task._id));
        onDelete();
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <h2>{task.title}</h2>
        <div className="task-actions">
          <button className="btn-primary" onClick={onEdit}>
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
                <p>{task.title}</p>
              </div>
              <div className="info-item">
                <label>Description:</label>
                <p>{task.description}</p>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <p className="status-badge">{task.status}</p>
              </div>
              <div className="info-item">
                <label>Priority:</label>
                <p className="priority-badge">{task.priority}</p>
              </div>
              <div className="info-item">
                <label>Assigned To:</label>
                <p>{typeof task.assigned_to === 'string' ? task.assigned_to : task.assigned_to?.name}</p>
              </div>
              <div className="info-item">
                <label>Created At:</label>
                <p>{new Date(task.createdAt).toLocaleDateString()}</p>
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
