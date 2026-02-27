
import { useEffect , lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Navbar  from './components/modules/Navbar';
import Footer from './components/modules/Footer';
import { useAppDispatch, useAppSelector } from './store';
import { toggleTheme } from './store/themeSlices';
import './App.css';
const Home = lazy(() => import('./pages/Home'));
const TaskList = lazy(() => import('./pages/TaskList'));
const TaskDetails = lazy(() => import('./components/modules/TaskDetails'));
const CreateTaskPage = lazy(() => import('./pages/CreateTaskpage'));
const EditTaskPage = lazy(() => import('./pages/EditTaskPage'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  // Update DOM when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar theme={theme} onThemeToggle={handleThemeToggle} />

        <main className="main-content">
          <Suspense fallback={<div className="loading-card"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="tasks">
              <Route index element={<TaskList />} />        
              <Route path="new" element={<CreateTaskPage />} /> 
              <Route path=":id" element={<TaskDetails />} />  
              <Route path=":id/edit" element={<EditTaskPage />} /> 
            </Route>
            <Route path="/users/" element={<UserManagement />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

