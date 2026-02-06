import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const data = await apiCall("/bookings");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert(`Error fetching bookings: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Approve booking
  const approveBooking = async (id) => {
    try {
      await apiCall(`/bookings/${id}/approve`, {
        method: "PUT",
      });
      fetchBookings();
    } catch (error) {
      console.error("Error approving booking:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await apiCall(`/bookings/${id}/cancel`, {
        method: "PUT",
      });
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Booking Dashboard</h2>

      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Facility</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.facilityName}</td>
                <td>{b.userName}</td>
                <td>{b.bookingDate}</td>
                <td>
                  {b.startTime} - {b.endTime}
                </td>
                <td className={`status-${b.status}`}>{b.status}</td>
                <td>
                  <button
                    onClick={() => approveBooking(b.id)}
                    disabled={b.status === "APPROVED"}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => cancelBooking(b.id)}
                    style={{ marginLeft: "8px" }}
                    disabled={b.status === "CANCELLED"}
                  >
                    Cancel
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

export default AdminBookings;
