import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/landingpage/home';
import Dashboard from './app/dashboard/dashboard';
import DashboardLayout from './app/dashboard/dashboardLayout';
import AllTrainees from './app/dashboard/trainees/allTrainee';
import Login from './app/auth/login/login';
import Register from './app/auth/register/register';
import { ThemeProvider } from "@/components/theme-provider";
import Evaluation from './app/dashboard/evaluation/evaluationForm';
import Documentation from './app/dashboard/documentation/documentation';
import TraineeUploadDocs from './app/traineeDashboard/traineeUploadDocs/traineeUploadDocs';
import PrivateRoute from '@/components/auth_component/ProtectedRoute';
import PublicLayout from '@/layout/publicRoute';
import { Toaster } from "@/components/ui/toaster";
import TraineeDashboard from './app/traineeDashboard/traineeDashboard';
import SupervisorEvaluateTrainee from '@/app/agencyDashboard/evaluateTrainee/evaluateTrainee';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><h1>About</h1></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          {/* End of Public Routes */}


          {/* Dashboard Pages */}
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  {/* Coordinator Pages */}
                  <Route path="/coordinator" element={<PrivateRoute requiredRole="coordinator" component={Dashboard} />} />
                  <Route path="/coordinator/all-trainees" element={<PrivateRoute requiredRole="coordinator" component={AllTrainees} />} />
                  <Route path="/docs" element={<PrivateRoute requiredRole="coordinator" component={Documentation} />} />
                  <Route path="/settings" element={<PrivateRoute requiredRole="coordinator" component={() => <h1>Settings</h1>} />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                  {/* Evaluating Trainee */}
                  <Route path="/evaluate/:trainee_id" element={<PrivateRoute requiredRole="coordinator" component={Evaluation} />} />
                  {/* Trainee Pages */}
                  <Route path="/trainee" element={<PrivateRoute requiredRole="trainee" component={TraineeDashboard} />} />
                  <Route path="/trainee/documents" element={<PrivateRoute requiredRole="trainee" component={TraineeUploadDocs} />} />
                  <Route path="/trainee/evaluation" element={<PrivateRoute requiredRole="trainee" component={() => <h1>Evaluate</h1>} />} />
                  {/* Supervisor */}
                  <Route path="/supervisor" element={<PrivateRoute requiredRole="supervisor" component={Dashboard} />} />
                  <Route path="/supervisor/trainees" element={<PrivateRoute requiredRole="supervisor" component={AllTrainees} />} />
                  <Route path="/supervisor/evaluate" element={<PrivateRoute requiredRole="supervisor" component={() => <h1>Evaluate</h1>} />} />
                  <Route path="/supervisor/evaluate/:trainee_id" element={<PrivateRoute requiredRole="supervisor" component={SupervisorEvaluateTrainee} />} />
                </Routes>
              </DashboardLayout>
            }
          />
          {/* Error 404 */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;