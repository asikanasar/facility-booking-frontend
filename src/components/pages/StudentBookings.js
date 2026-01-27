import { useState } from "react";

function StudentBookings() {
  const [userName, setUserName] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    fetch(`http://localhost:8080/api/bookings/user/${userName}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
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
            fetch(`http://localhost:8080/api/bookings/${b.id}`, {
              method: "DELETE"
            }).then(() => {
              setBookings(bookings.filter(x => x.id !== b.id));
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
