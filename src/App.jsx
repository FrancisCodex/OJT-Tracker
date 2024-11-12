import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/landingpage/home';
import Dashboard from './app/dashboard/dashboard';
import DashboardLayout from './app/dashboard/dashboardLayout';
import AllTrainees from './app/dashboard/trainees/allTrainee';

function App() {
  return (
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
                {/* Add more dashboard routes here */}
              </Routes>
            </DashboardLayout>
          }
        />
        {/* Error 404 */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;