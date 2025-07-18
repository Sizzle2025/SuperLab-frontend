import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TaskDetail from "./pages/staff/TaskDetail"; // adjust path as per your structure
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/staff/dashboard/*" element={<StaffDashboard />} />
        <Route path="/staff/task/:taskId" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
