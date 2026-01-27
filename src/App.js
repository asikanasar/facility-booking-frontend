import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import StudentBooking from "./components/pages/StudentBooking";
import StudentBookings from "./components/pages/StudentBookings";
import AdminBookings from "./components/pages/AdminBookings";
import StudentHome from "./components/pages/StudentHome";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/book" element={<StudentBooking />} />
        <Route path="/student/bookings" element={<StudentBookings />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
