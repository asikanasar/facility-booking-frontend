import { useState } from "react";
import { apiCall } from "../../utils/api";

function StudentBookings() {
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }
    try {
      const data = await apiCall(`/bookings/user/${userName}`);
      setBookings(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await apiCall(`/bookings/${id}`, { method: "DELETE" });
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      <input
        placeholder="Enter your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={fetchBookings} style={{ marginLeft: "10px" }}>
        View
      </button>

      <br /><br />

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.facilityName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.startTime} - {b.endTime}</td>
                <td>{b.status}</td>
                <td>
                  <button onClick={() => deleteBooking(b.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentBookings;
