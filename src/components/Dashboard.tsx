import React, { useEffect } from 'react';
import { Status, Priority } from '../types';
import type { StatusType, PriorityType } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchReport } from '../store/dashboardSlice';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { report, loading, error } = useAppSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchReport());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchReport());
  };

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case Status.Open:
        return '#2196f3';
      case Status.InProgress:
        return '#ff9800';
      case Status.Done:
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const getPriorityColor = (priority: PriorityType): string => {
    switch (priority) {
      case Priority.High:
        return '#d32f2f';
      case Priority.Medium:
        return '#f57c00';
      case Priority.Low:
        return '#388e3c';
      default:
        return '#666';
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!report) {
    return <div className="no-data">No report data available</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Task Dashboard</h1>

      <div className="dashboard-grid">
        {/* Total Tasks Card */}
        <div className="dashboard-card total-card">
          <h3>Total Tasks</h3>
          <p className="large-number">{report.totalTasks}</p>
        </div>

        {/* Tasks by Status */}
        <div className="dashboard-card">
          <h3>Tasks by Status</h3>
          <div className="status-breakdown">
            {Object.values(Status).map((status) => (
              <div key={status} className="breakdown-item">
                <div className="breakdown-header">
                  <span
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(status) }}
                  ></span>
                  <span>{status}</span>
                </div>
                <p className="breakdown-count">{report.tasksByStatus[status] || 0}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="dashboard-card">
          <h3>Tasks by Priority</h3>
          <div className="priority-breakdown">
            {Object.values(Priority).map((priority) => (
              <div key={priority} className="breakdown-item">
                <div className="breakdown-header">
                  <span
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(priority) }}
                  ></span>
                  <span>{priority}</span>
                </div>
                <p className="breakdown-count">{report.tasksByPriority[priority] || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks by User */}
      <div className="dashboard-card task-by-user-card">
        <h3>Tasks by User</h3>
        {report.tasksByUser.length === 0 ? (
          <p className="no-data">No user assignments</p>
        ) : (
          <table className="user-tasks-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Task Count</th>
              </tr>
            </thead>
            <tbody>
              {report.tasksByUser.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userName}</td>
                  <td className="task-count">{item.taskCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn-refresh" onClick={handleRefresh}>
        Refresh Report
      </button>
    </div>
  );
};

export default Dashboard;