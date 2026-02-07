import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    setLoading(true);
    setError(""); // reset error

    try {
      const data = await apiCall("/bookings");
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "Unknown error while fetching bookings");
      setBookings([]); // ensure array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Approve booking
  const approveBooking = async (id) => {
    try {
      await apiCall(`/bookings/${id}/approve`, { method: "PUT" });
      fetchBookings();
    } catch (err) {
      console.error("Error approving booking:", err);
      setError(err.message || "Unknown error while approving booking");
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await apiCall(`/bookings/${id}/cancel`, { method: "PUT" });
      fetchBookings();
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError(err.message || "Unknown error while cancelling booking");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Booking Dashboard</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : bookings.length === 0 ? (
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
