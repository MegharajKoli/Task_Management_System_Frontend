import React, { useEffect, useState } from 'react';
import type { ITask, IComment } from '../types';
import { taskService } from '../api/taskService';
import { commentService } from '../api/commentService';
import '../styles/TaskDetails.css';

interface TaskDetailsProps {
  task: ITask;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onEdit, onDelete, onBack }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [task._id]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await commentService.getCommentsByTask(task._id);
      setComments(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load comments:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentService.addComment(task._id, { content: newComment });
      setNewComment('');
      await fetchComments();
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.deleteComment(commentId);
        await fetchComments();
      } catch (err) {
        console.error('Failed to delete comment:', err);
        setError('Failed to delete comment');
      }
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task._id);
        onDelete();
      } catch (err) {
        console.error('Failed to delete task:', err);
        setError('Failed to delete task');
      }
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
