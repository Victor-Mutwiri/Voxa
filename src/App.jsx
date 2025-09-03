
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './App.css'
import LandingPage from './screens/LandingPage';
import Home from './screens/Home';
import Auth from "./screens/Auth";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
