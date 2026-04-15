import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SSOCallback from './pages/SSOCallback';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeUpload from './pages/ResumeUpload';
import Templates from './pages/Templates';
import Contact from './pages/Contact';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import JobPostForm from './components/JobPostForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sso-callback" element={<SSOCallback />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/contact" element={<Contact />} />
            {/* Protected route - requires authentication */}
            <Route
              path="/builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-resume"
              element={
                <ProtectedRoute>
                  <ResumeUpload />
                </ProtectedRoute>
              }
            />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route 
              path="/post-job" 
              element={
                <ProtectedRoute>
                  <JobPostForm />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

