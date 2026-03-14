import { useNavigate } from "react-router-dom";

function StudentHome() {
  const navigate = useNavigate();

  return (
    <div className="page">
  <h2>Student Dashboard</h2>

  <div className="dashboard-buttons">
    <button onClick={() => navigate("/student/book")}>
      Book Facility
    </button>

    <button onClick={() => navigate("/student/bookings")}>
      My Bookings
    </button>
  </div>
</div>

  );
}

export default StudentHome;
