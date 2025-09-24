
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserProtectedRoute from './components/UserProtectedRoute'
import AuthProtectedRoute from './components/AuthProtectedRoute'
import AdminAuthProtectedRoute from "./components/AdminAuthProtectedRoute";
import OnboardingProtectedRoute from './components/OnboardingProtectedRoute'
import Home from './screens/Home';
import Auth from "./screens/Auth";
import AdminAuth from "./screens/AdminAuth";
import LandingPage from './screens/LandingPage';
import Onboarding from "./screens/onboarding";
import Dashboard from "./screens/Dashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <AdminProtectedRoute>
              <Home />
            </AdminProtectedRoute>
          }
        />
        <Route 
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <Dashboard />
            </UserProtectedRoute>
          }
        />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route 
          path="/auth" 
          element={
            <AuthProtectedRoute>
              <Auth />
            </AuthProtectedRoute>
          } 
        />
        <Route 
          path="/adminauth" 
          element={
            <AdminAuthProtectedRoute>
              <AdminAuth />
            </AdminAuthProtectedRoute>
          } 
        />
        <Route
          path="/onboarding"
          element={
            <OnboardingProtectedRoute>
              <Onboarding />
            </OnboardingProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
