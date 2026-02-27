import { useNavigate } from 'react-router-dom';
import  TaskForm  from '../components/templates/TaskForm';
import { createTask } from '../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../store';
import type { CreateTaskDTO } from '../types';

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { submitting } = useAppSelector(state => state.tasks);

  const handleCreate = async (data: CreateTaskDTO) => {
    try {
      await dispatch(createTask(data)).unwrap();
      navigate('/tasks'); 
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <TaskForm 
      onSubmit={handleCreate} 
      onCancel={() => navigate('/tasks')} 
      submitting={submitting} 
    />
  );
};
export default CreateTaskPage;