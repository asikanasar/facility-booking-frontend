import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
  <h2>Who is using the system?</h2>

  <div className="dashboard-buttons">
    <button onClick={() => navigate("/student")}>Student</button>
    <button onClick={() => navigate("/admin/bookings")}>Admin</button>
  </div>
</div>

  );
}

export default Home;
