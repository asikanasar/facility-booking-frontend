import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://facility-booking-backend.onrender.com/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...booking,
        userRole: "STUDENT"
      })
    })
      .then((res) => res.json())
      .then(() => {
        alert("Booking created successfully!");
        navigate("/student/bookings");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Booking Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="facilityName"
          placeholder="Facility Name"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="facilityType"
          placeholder="Facility Type"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          name="userName"
          placeholder="Your Name"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="time"
          name="startTime"
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="time"
          name="endTime"
          onChange={handleChange}
          required
        /><br /><br />

        <button type="submit">Book Facility</button>
      </form>
    </div>
  );
}

export default StudentBooking;
