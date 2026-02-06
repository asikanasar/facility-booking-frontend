import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../utils/api";

function StudentBooking() {
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    facilityName: "",
    facilityType: "",
    userName: "",
    bookingDate: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiCall("/bookings", {
        method: "POST",
        body: JSON.stringify({
          ...booking,
          userRole: "STUDENT"
        })
      });
      alert("Booking created successfully!");
      navigate("/student/bookings");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="facilityName" placeholder="Facility Name" onChange={handleChange} required /><br /><br />
        <input name="facilityType" placeholder="Facility Type" onChange={handleChange} required /><br /><br />
        <input name="userName" placeholder="Your Name" onChange={handleChange} required /><br /><br />
        <input type="date" name="bookingDate" onChange={handleChange} required /><br /><br />
        <input type="time" name="startTime" onChange={handleChange} required /><br /><br />
        <input type="time" name="endTime" onChange={handleChange} required /><br /><br />
        <button type="submit">Book Facility</button>
      </form>
    </div>
  );
}

export default StudentBooking;
