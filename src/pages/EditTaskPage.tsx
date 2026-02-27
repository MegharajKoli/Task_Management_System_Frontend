import { useParams, useNavigate } from 'react-router-dom';
import  TaskForm  from '../components/templates/TaskForm';
import { fetchTaskById, updateTask } from '../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import type { UpdateTaskDTO } from '../types';

const EditTaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { loading, error,currentTask,submitting } = useAppSelector(state => state.tasks);

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(id));
    }
  }, [id, dispatch]);

  const handleUpdate = async (updateData: UpdateTaskDTO) => {
    if (id) {
      await dispatch(updateTask({ id, updateData })).unwrap();
      navigate(`/tasks/${id}`); 
    }
  };
if (loading) {
  return <div className="loading">Loading task...</div>;
}
if (error) {
  return <div className="error-message">{error}</div>;
}
if (!currentTask) {
  return <div className="error-message">Task not found</div>;
}

  return (
    <TaskForm 
      task={currentTask} 
      onSubmit={handleUpdate} 
      onCancel={() => navigate(-1)} 
      submitting={submitting} 
      loading={loading}
    />
  );
};
export default EditTaskPage;