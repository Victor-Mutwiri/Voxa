
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProtectedRoute from './components/AuthProtectedRoute'
import OnboardingProtectedRoute from './components/OnboardingProtectedRoute'
import Home from './screens/Home';
import Auth from "./screens/Auth";
import LandingPage from './screens/LandingPage';
import Onboarding from "./screens/onboarding";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route 
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/home" element={<Home />} />
        <Route 
          path="/auth" 
          element={
            <AuthProtectedRoute>
              <Auth />
            </AuthProtectedRoute>
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
