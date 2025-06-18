import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CaretakerDashboard from "./pages/CaretakerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/caretaker" element={<CaretakerDashboard />} />
    </Routes>
  );
}

export default App;
