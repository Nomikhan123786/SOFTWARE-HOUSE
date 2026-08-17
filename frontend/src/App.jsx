import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import UserDashBoard from "./pages/UserDashBoard";
import StaffDashboard from "./pages/StaffDashboard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<UserDashBoard />} />
        <Route path="/staffdashboard" element={<StaffDashboard />} />
      </Routes>
    </>
  );
};

export default App;
