import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/landingpage/home';
import Dashboard from './app/dashboard/dashboard';
import DashboardLayout from './app/dashboard/dashboardLayout';
import AllTrainees from './app/dashboard/trainees/allTrainee';
import Login from './app/auth/login/login';
import Register from './app/auth/register/register';
import { ThemeProvider } from "@/components/theme-provider"
import Evaluation from './app/dashboard/evaluation/evaluationForm';

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        {/* Dashboard Pages */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/trainees" element={<AllTrainees/>} />
                <Route path="/docs" element={<h1>Documentation</h1>} />
                <Route path="/settings" element={<h1>Settings</h1>} />
                <Route path="*" element={<h1>Not Found</h1>} />
                {/* Evaluating Trainee */}
                <Route path='/evaluate/:trainee_id' element={<Evaluation/>} />
              </Routes>
            </DashboardLayout>
          }
        />
        {/* Authentication */}
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        {/* Error 404 */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
          
    </ThemeProvider>
  );
}

export default App;