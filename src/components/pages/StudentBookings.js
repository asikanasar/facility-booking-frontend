import { useState } from "react";

function StudentBookings() {
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    if (!userName.trim()) {
      alert("Please enter your name first");
      return;
    }
    fetch(`https://facility-booking-backend.onrender.com/api/bookings/user/${userName}`, {
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
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      <input
        className="name-input"
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {bookings.map((b) => (
    <tr key={b.id}>
      <td>{b.facilityName}</td>
      <td>{b.bookingDate}</td>
      <td>{b.startTime} - {b.endTime}</td>
      <td className={`status-${b.status}`}>{b.status}</td>
      <td>
        <button
          onClick={() => {
            fetch(`https://facility-booking-backend.onrender.com/api/bookings/${b.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(async (res) => {
                if (!res.ok) {
                  const text = await res.text().catch(() => null);
                  throw new Error(`HTTP Error: ${res.status} - ${text || res.statusText}`);
                }

                // Some backends return plain text (e.g. "Booking deleted") instead of JSON.
                // Safely handle both JSON and text responses to avoid "Unexpected token" errors.
                const contentType = res.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                  await res.json();
                } else {
                  await res.text();
                }

                setBookings(bookings.filter(x => x.id !== b.id));
              })
              .catch((error) => {
                console.error("Error deleting booking:", error);
                alert(`Error: ${error.message}`);
              });
          }}
        >
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
