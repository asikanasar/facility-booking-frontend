import { useEffect, useState } from "react";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    fetch("https://facility-booking-backend.onrender.com/api/bookings", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBookings(data))
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        alert(`Error fetching bookings: ${error.message}`);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const approveBooking = (id) => {
    fetch(`https://facility-booking-backend.onrender.com/api/bookings/${id}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => null);
          throw new Error(`HTTP Error: ${res.status} - ${text || res.statusText}`);
        }

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          await res.json();
        } else {
          await res.text();
        }
      })
      .then(() => fetchBookings())
      .catch((error) => {
        console.error("Error approving booking:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const cancelBooking = (id) => {
    fetch(`https://facility-booking-backend.onrender.com/api/bookings/${id}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => null);
          throw new Error(`HTTP Error: ${res.status} - ${text || res.statusText}`);
        }

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          await res.json();
        } else {
          await res.text();
        }
      })
      .then(() => fetchBookings())
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        alert(`Error: ${error.message}`);
      });
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then(() => fetchBookings())
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        alert(`Error: ${error.message}`);
      });
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
                <td>{b.startTime} - {b.endTime}</td>
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
