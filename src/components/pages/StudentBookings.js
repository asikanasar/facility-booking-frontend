import { useState } from "react";
import api, { getApiErrorMessage } from "../../api";

function StudentBookings() {
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }
    try {
      const response = await api.get(
        `/bookings/user/${encodeURIComponent(userName)}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Fetch bookings failed:", error);
      alert(getApiErrorMessage(error));
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      console.error("Delete booking failed:", error);
      alert(getApiErrorMessage(error));
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
