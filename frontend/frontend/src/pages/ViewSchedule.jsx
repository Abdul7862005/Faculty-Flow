import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/schedule/all", {
        headers: { Authorization: token }
      });
      setSchedules(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert("Failed to load schedules.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access Denied! Please login first. 🔒");
      navigate("/");
      return;
    }
    fetchSchedules();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule slot?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5001/api/schedule/delete/${id}`, {
          headers: { Authorization: token }
        });
        alert("Schedule deleted successfully! 🗑️");
        fetchSchedules(); 
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Failed to delete the schedule.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{ marginBottom: "20px", padding: "10px 18px", cursor: "pointer", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", fontWeight: "600", color: "#475569", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "8px" }}
        >
          ← Back to Dashboard
        </button>

        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: "0 0 6px 0", color: "#0f172a", fontSize: "32px", fontWeight: "700" }}>Faculty Schedules 📅</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: "16px" }}>Review and manage active academic timetable allocations live from MongoDB.</p>
        </div>

        {loading ? (
          <h3 style={{ color: "#64748b", textAlign: "center", marginTop: "50px" }}>Loading schedules from database...</h3>
        ) : schedules.length === 0 ? (
          <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", textAlign: "center", border: "1px solid #e2e8f0", color: "#64748b" }}>
            <p style={{ fontSize: "18px", margin: "0 0 15px 0" }}>No schedules found in the ledger.</p>
            <button onClick={() => navigate("/create-schedule")} style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>Create One Now</button>
          </div>
        ) : (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "15px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Faculty Name</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Subject</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Department</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Day</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Time Slot</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600" }}>Room / Lab</th>
                  <th style={{ padding: "16px", color: "#334155", fontWeight: "600", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item, index) => (
                  <tr key={item._id} style={{ borderBottom: "1px solid #f1f5f9", backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                    <td style={{ padding: "16px", color: "#0f172a", fontWeight: "600" }}>{item.facultyName}</td>
                    <td style={{ padding: "16px", color: "#334155" }}>{item.subject}</td>
                    <td style={{ padding: "16px", color: "#475569" }}><span style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "4px", fontSize: "13px", fontWeight: "600" }}>{item.department}</span></td>
                    <td style={{ padding: "16px", color: "#334155" }}>{item.day}</td>
                    <td style={{ padding: "16px", color: "#334155" }}>{item.time}</td>
                    <td style={{ padding: "16px", color: "#334155" }}>{item.room}</td>
                    <td style={{ padding: "16px", textAlign: "center" }}>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "13px", transition: "0.2s", boxShadow: "0 2px 4px rgba(239, 68, 68, 0.15)" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSchedule;