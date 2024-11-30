import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/app/landingpage/home';
import Dashboard from '@/app/dashboard/dashboard';
import DashboardLayout from '@/app/dashboard/dashboardLayout';
import AllTrainees from '@/app/dashboard/trainees/allTrainee';
import Login from '@/app/auth/login/login';
import Register from '@/app/auth/register/register';
import { ThemeProvider } from "@/components/theme-provider";
import Evaluation from '@/app/dashboard/evaluation/evaluationForm';
import Documentation from '@/app/dashboard/documentation/documentation';
import TraineeUploadDocs from '@/app/traineeDashboard/traineeUploadDocs/traineeUploadDocs';
import PrivateRoute from '@/components/auth_component/ProtectedRoute';
import PublicLayout from '@/layout/publicRoute';
import { Toaster } from "@/components/ui/toaster";
import TraineeDashboard from '@/app/traineeDashboard/traineeDashboard';
import SupervisorEvaluateTrainee from '@/app/agencyDashboard/evaluateTrainee/evaluateTrainee';
import TraineeProfile from '@/app/dashboard/traineeProfile/traineeProfile';
import AgencyProfile from '@/app/dashboard/agencyProfile/agencyProfile';
import AgencyDashboard from '@/app/agencyDashboard/hteDashboard';
import TraineeEvaluate from '@/app/traineeDashboard/traineeEvaluation/traineeEvaluation';
import EvaluationList from '@/app/dashboard/evaluation/evaluationLIst';
import AgencyEvaluationList from '@/app/agencyDashboard/evaluateTrainee/agencyEvaluationList';
import CompanyTrainee from '@/app/agencyDashboard/companyTrainee/companyTrainee';
import EvaluationCoordinator from '@/app/dashboard/evaluation/evaluationCoor';
import DashboardRedirect from '@/app/redirects/dashboard_redirect';
import Docs from '@/app/documentation/docs';
// import About from '@/app/about/about';
import ContactUs from './app/contact/contactus';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          {/* <Route path="/about" element={<PublicLayout><About/></PublicLayout>} /> */}
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/Settings" element={<PublicLayout><h1>⚒️ Work in Progress ⚒️</h1></PublicLayout>} />
          <Route path="/docs" element={<PublicLayout><Docs/></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactUs/></PublicLayout>} />
          {/* End of Public Routes */}


          {/* Dashboard Pages */}
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<DashboardRedirect/>} />
                  {/* Coordinator Pages */}
                  <Route path="/coordinator" element={<PrivateRoute requiredRole="coordinator" component={Dashboard} />} />
                  <Route path="/coordinator/all-trainees" element={<PrivateRoute requiredRole="coordinator" component={AllTrainees} />} />
                  <Route path="/docs" element={<PrivateRoute requiredRole="coordinator" component={Documentation} />} />
                  <Route path="/settings" element={<PrivateRoute requiredRole="coordinator" component={() => <h1 className='text-center'>Work in Progress ⚒️</h1>} />} />
                  <Route path="/coordinator/view-trainee/:trainee_id" element={<PrivateRoute requiredRole="coordinator" component={TraineeProfile}/>}/>
                  <Route path="/coordinator/view-company/:company_id" element={<PrivateRoute requiredRole="coordinator" component={AgencyProfile} />} />
                  <Route path="/coordinator/evaluations" element={<PrivateRoute requiredRole="coordinator" component={EvaluationList} />} />
                  <Route path="/coordinator/evaluate/:trainee_id" element={<PrivateRoute requiredRole="coordinator" component={EvaluationCoordinator} />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
                 
                  {/* Trainee Pages */}
                  <Route path="/trainee" element={<PrivateRoute requiredRole="trainee" component={TraineeDashboard} />} />
                  <Route path="/trainee/documents" element={<PrivateRoute requiredRole="trainee" component={TraineeUploadDocs} />} />
                  <Route path="/trainee/feedback" element={<PrivateRoute requiredRole="trainee" component={TraineeEvaluate} />} />
                  {/* Supervisor */}
                  <Route path="/supervisor" element={<PrivateRoute requiredRole="supervisor" component={AgencyDashboard} />} />
                  <Route path="/supervisor/all-trainees" element={<PrivateRoute requiredRole="supervisor" component={CompanyTrainee} />} />
                  <Route path="/supervisor/evaluate" element={<PrivateRoute requiredRole="supervisor" component={AgencyEvaluationList} /> } />
                  <Route path="/supervisor/evaluate/:trainee_id" element={<PrivateRoute requiredRole="supervisor" component={SupervisorEvaluateTrainee} />} />
                  <Route path="/supervisor/view-trainee/:trainee_id" element={<PrivateRoute requiredRole="supervisor" component={TraineeProfile} />} />
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