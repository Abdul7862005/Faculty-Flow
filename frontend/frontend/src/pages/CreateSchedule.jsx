import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateSchedule() {
  // 1. Matching your controller variables exactly
  const [facultyName, setFacultyName] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field verification
    if (!facultyName || !subject || !department || !day || !time || !room) {
      alert("Please fill out all fields before saving.");
      return;
    }

    // Payload structures exactly to req.body destructured in scheduleController.js
    const scheduleData = { 
      facultyName, 
      subject, 
      department, 
      day, 
      time, 
      room 
    };

    try {
      // Grab the raw token string
      const token = localStorage.getItem("token");
      
      // Hit the singular path prefix /api/schedule/create matching server.js
      const response = await axios.post(
        "http://localhost:5001/api/schedule/create", 
        scheduleData,
        {
          headers: { 
            // Matching your authMiddleware.js which expects the raw token value directly
            "Authorization": token 
          }
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Schedule Created and Saved to MongoDB! 🎉");
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      // Grabs the error message directly from your controller catch block response
      alert(error.response?.data?.message || error.response?.data?.error || "Check backend terminal logs!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "15px", padding: "5px 10px", cursor: "pointer" }}>
        ← Back to Dashboard
      </button>

      <h1>Create Schedule 📅</h1>
      <hr />
      <br />

      <form onSubmit={handleSubmit}>
        <label><b>Faculty Name:</b></label><br />
        <input
          type="text"
          placeholder="e.g. Dr. Abdul"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
          required
        />

        <label><b>Subject:</b></label><br />
        <input
          type="text"
          placeholder="e.g. Cryptography and Network Security"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
          required
        />

        <label><b>Department:</b></label><br />
        <input
          type="text"
          placeholder="e.g. Computer Science & Engineering"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
          required
        />

        <label><b>Day:</b></label><br />
        <select 
          value={day} 
          onChange={(e) => setDay(e.target.value)} 
          style={{ width: "105%", padding: "8px", margin: "5px 0 15px 0" }}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <br />

        <label><b>Time Slot:</b></label><br />
        <input
          type="text"
          placeholder="e.g. 10:00 AM - 11:00 AM"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 15px 0" }}
          required
        />

        <label><b>Room / Lab:</b></label><br />
        <input
          type="text"
          placeholder="e.g. Room 402 or CSE Lab 1"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "5px 0 20px 0" }}
          required
        />

        <button type="submit" style={{ width: "105%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", borderRadius: "4px" }}>
          Save Schedule 🚀
        </button>
      </form>
    </div>
  );
}

export default CreateSchedule;