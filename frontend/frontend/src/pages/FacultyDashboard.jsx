import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function FacultyDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Schedule");
  const [scheduleSubTab, setScheduleSubTab] = useState("weekly");

  // ================= MARKS ENTRY MODULE WITH ENFORCED CONDITIONS =================
  const [marksSubView, setMarksSubView] = useState(null); // 'weekly' or 'mid'
  
  // Input tracking states
  const [weeklyRoll, setWeeklyRoll] = useState("");
  const [weeklyScore, setWeeklyScore] = useState("");
  const [midRoll, setMidRoll] = useState("");
  const [midScore, setMidScore] = useState("");
  

// --- ADD THESE NEW STATES HERE ---
const [skills, setSkills] = useState([
  "Specialist in AI",
  "High Experience",
  "Completed PG in VIIT",
  "Solved real-world problems using AI"
]);
const [newSkill, setNewSkill] = useState("");
const [showAddBox, setShowAddBox] = useState(false);
// ---------------------------------
useEffect(() => {
    if (activeTab === "My Profile") {
      fetch("http://https://faculty-flow-backend.onrender.com/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSkills(data.data.skills);
          }
        })
        .catch((err) => console.error("Error loading profile:", err));
    }
  }, [activeTab]);

  // 2. Save data to the backend
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    
    const updatedSkills = [...skills, newSkill];
    
    try {
      const response = await fetch("http://https://faculty-flow-backend.onrender.com/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: updatedSkills }),
      });
      
      const result = await response.json();
      if (result.success) {
        setSkills(result.data.skills);
        setNewSkill("");
        setShowAddBox(false);
      }
    } catch (err) {
      console.error("Error saving skill:", err);
    }
  };

  // Segment local locks
  const [savedWeeklyRecord, setSavedWeeklyRecord] = useState(null);
  const [savedMidRecord, setSavedMidRecord] = useState(null);

  // Separate Display Table Storage State (Synchronized via MongoDB Backend APIs)
  const [finalizedRecords, setFinalizedRecords] = useState([]);

  // Base configuration API endpoint - UPDATED TO 5001
 const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001/api' 
  : 'https://faculty-flow-backend.onrender.com/api';

  // Dynamic MongoDB Reader Fetch Routine
  const fetchMongoRecords = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/marks/all`);
      const json = await response.json();
      if (json.success) {
        setFinalizedRecords(json.data);
      } else {
        console.error("Backend error response status:", json.error);
      }
    } catch (err) {
      console.error("Failed to query MongoDB collection ledger details:", err);
    }
  };

  // Auto-trigger synchronizations when accessing the Marks Entry tab layout view
  useEffect(() => {
    if (activeTab === "Marks Entry") {
      fetchMongoRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Condition 1: Format Validator Rule (e.g., 23L31A05L8)
  const validateRollNumber = (roll) => {
    const pattern = /^[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]$/;
    return pattern.test(roll.toUpperCase());
  };

  const handleSaveWeekly = () => {
    if (!weeklyRoll || weeklyScore === "") {
      alert("Please enter both Student Roll Number and Weekly Marks.");
      return;
    }

    // Condition 1 Check
    if (!validateRollNumber(weeklyRoll)) {
      alert("Invalid Roll Number Format! It must strictly follow the format: 23L31A05L8");
      return;
    }

    // Condition 2 Check: Min 0 and Max 10 marks
    const marksNum = parseFloat(weeklyScore);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 10) {
      alert("Validation Error: Weekly Marks must be between 0 and 10 marks!");
      return;
    }

    // Automatically reduce to half right here on entry configuration
    const reducedHalfValue = marksNum / 2;

    setSavedWeeklyRecord({ 
      roll: weeklyRoll.toUpperCase(), 
      originalMarks: marksNum,
      reducedMarks: reducedHalfValue 
    });
    alert(`Weekly marks captured! Entered: ${marksNum} Marks -> Automatically reduced to half: ${reducedHalfValue} Marks.`);
  };

  const handleSaveMid = () => {
    if (!midRoll || midScore === "") {
      alert("Please enter both Student Roll Number and Mid Marks.");
      return;
    }

    // Condition 1 Check
    if (!validateRollNumber(midRoll)) {
      alert("Invalid Roll Number Format! It must strictly follow the format: 23L31A05L8");
      return;
    }

    // Condition 3 Check: Min 0 and Max 25 marks
    const midNum = parseFloat(midScore);
    if (isNaN(midNum) || midNum < 0 || midNum > 25) {
      alert("Validation Error: Mid Marks must be between 0 and 25 marks!");
      return;
    }

    setSavedMidRecord({ roll: midRoll.toUpperCase(), marks: midNum });
    alert(`Mid marks captured: ${midNum} Marks locked locally!`);
  };

  const handleMasterRecordSave = async () => {
    if (savedWeeklyRecord.roll !== savedMidRecord.roll) {
      alert(`Roll number mismatch! Weekly Roll (${savedWeeklyRecord.roll}) and Mid Roll (${savedMidRecord.roll}) must match to create a unified profile.`);
      return;
    }

    // Condition 4 Math: Calculate Total combined marks (Weekly Half + Mid Marks)
    const combinedTotal = savedWeeklyRecord.reducedMarks + savedMidRecord.marks;

    const payload = {
      roll: savedWeeklyRecord.roll,
      weekly: savedWeeklyRecord.reducedMarks, // 2) weekly marks after reducing half
      mid: savedMidRecord.marks,             // 3) mid marks
      total: combinedTotal                    // 4) total marks after combining both
    };

    try {
      const response = await fetch(`${API_BASE_URL}/marks/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert("🚀 Record written and securely processed inside MongoDB database cluster successfully!");
        
        // Re-query database to keep dashboard tables completely accurate
        fetchMongoRecords();

        // Reset loop states for next entry loop
        setWeeklyRoll("");
        setWeeklyScore("");
        setMidRoll("");
        setMidScore("");
        setSavedWeeklyRecord(null);
        setSavedMidRecord(null);
        setMarksSubView(null);
      } else {
        alert("Database transaction error payload returned: " + result.error);
      }
    } catch (err) {
      alert("Network Error: Make sure your Node.js/Express server is active on port 5001!");
      console.error(err);
    }
  };

  // ================= MAXIMUM DEPTH TIMETABLE STRUCTURAL CONFIGS =================
  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weeksList = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"];
  const operationalDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [selectedMonth, setSelectedMonth] = useState(null);

  const timeSlotsConfig = [
    { label: "Period 1 (8:45-9:35)", type: "period" },
    { label: "Period 2 (9:35-10:25)", type: "period" },
    { label: "Short Break (9:40-10:00)", type: "break" },
    { label: "Period 3 (10:50-11:40)", type: "period" },
    { label: "Period 4 (11:40-12:30)", type: "period" },
    { label: "Period 5 (12:30-1:30)", type: "period" },
    { label: "Lunch Break (1:20-2:20)", type: "break" },
    { label: "Period 6 (2:20-3:10)", type: "period" },
    { label: "Period 7 (3:10-4:00)", type: "period" }
  ];

  const getWeeklyAllocation = (day, slotLabel) => {
    if (slotLabel.startsWith("Short Break") || slotLabel.startsWith("Lunch Break")) {
      return { text: "BREAK", isBreak: true, bg: "#cbd5e1" }; 
    }
    if (day === "MON") {
      if (slotLabel.startsWith("Period 1") || slotLabel.startsWith("Period 2")) return { text: "CSE 1", bg: "#e0f2fe" };
      if (slotLabel.startsWith("Period 5") || slotLabel.startsWith("Period 6")) return { text: "CSE 4", bg: "#f3e8ff" };
    }
    if (day === "TUE") {
      if (slotLabel.startsWith("Period 3") || slotLabel.startsWith("Period 4")) return { text: "CSE 4", bg: "#f3e8ff" };
      if (slotLabel.startsWith("Period 6") || slotLabel.startsWith("Period 7")) return { text: "CSE 1", bg: "#e0f2fe" };
    }
    if (day === "WED") {
      if (slotLabel.startsWith("Period 5") || slotLabel.startsWith("Period 6")) return { text: "CSE 1", bg: "#e0f2fe" };
    }
    if (day === "THU") {
      if (slotLabel.startsWith("Period 5") || slotLabel.startsWith("Period 6")) return { text: "CSE 4", bg: "#f3e8ff" };
    }
    if (day === "FRI") {
      if (slotLabel.startsWith("Period 2") || slotLabel.startsWith("Period 3")) return { text: "CSE 4", bg: "#f3e8ff" };
      if (slotLabel.startsWith("Period 5") || slotLabel.startsWith("Period 6")) return { text: "CSE 1", bg: "#e0f2fe" };
    }
    if (day === "SAT") {
      if (slotLabel.startsWith("Period 1") || slotLabel.startsWith("Period 2")) return { text: "CSE 1", bg: "#e0f2fe" };
      if (slotLabel.startsWith("Period 6") || slotLabel.startsWith("Period 7")) return { text: "CSE 4", bg: "#f3e8ff" };
    }
    return { text: "", isBreak: false, bg: "transparent" };
  };

  const tabButtons = ["Schedule", "Marks Entry", "My Attendance Tracker", "My Profile"];

  // ================= MAXIMUM MONTHLY ROADMAP GENERATOR =================
  const mockMonthlyGrids = {};
  monthsList.forEach((m) => {
    mockMonthlyGrids[m] = {};
    weeksList.forEach((w) => {
      mockMonthlyGrids[m][w] = {};
      operationalDays.forEach((d) => {
        let targetsInfo = { subject: "", room: "ROOM A201 / LAB-2", status: "" };
        if (m === "January") { targetsInfo.subject = "INTRODUCTION TO AI"; targetsInfo.status = `Subject: Introduction to AI | Target: 25% Completed`; }
        else if (m === "February") { targetsInfo.subject = "INTRODUCTION TO AI"; targetsInfo.status = `Subject: Introduction to AI | Mid-1 Assessments`; }
        else if (m === "March") { targetsInfo.subject = "INTRODUCTION TO AI"; targetsInfo.status = `Subject: Introduction to AI | 75% Milestone Met`; }
        else if (m === "April") { targetsInfo.subject = "INTRODUCTION TO AI"; targetsInfo.status = `Subject: Introduction to AI | Final Examinations`; }
        else if (m === "May") { targetsInfo = { subject: "", room: "", status: "🌴 Institutional Summer Break Vacation Leave Scheduled (No Classes)" }; }
        else if (m === "June") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = `Subject: ML | Module 1 Target`; }
        else if (m === "July") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = `Subject: ML | Mid-Term Prep Tracking`; }
        else if (m === "August") {
          targetsInfo.subject = "MACHINE LEARNING (ML)";
          if (w === "WEEK 1" || w === "WEEK 2") targetsInfo.status = "📝 Revision Period";
          else if (w === "WEEK 3") targetsInfo.status = "⚡ Mid-1 Exams Active";
          else targetsInfo.status = "🔬 Internal Lab Exams";
        }
        else if (m === "September") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = `Subject: ML | Target 75% Completion`; }
        else if (m === "October") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = `Subject: ML | Final Wraps`; }
        else if (m === "November") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = "🏛️ University Valuation Practical Control Block"; }
        else if (m === "December") { targetsInfo.subject = "MACHINE LEARNING (ML)"; targetsInfo.status = "🏁 Semester Main Finals Active"; }

        if (m === "May") { mockMonthlyGrids[m][w][d] = targetsInfo; } 
        else if (d === "MON" || d === "WED" || d === "FRI") { mockMonthlyGrids[m][w][d] = targetsInfo; } 
        else { mockMonthlyGrids[m][w][d] = { subject: "", room: "", status: "" }; }
      });
    });
  });

  // ================= ATTENDANCE METRIC STATE ARCHITECTURE =================
  const [facultyAttendanceMetrics] = useState({
    totalClassesAllocated: 120, classesConducted: 112, classesSkipped: 8,
    allowedSkipsPerSemester: 12, attendancePercentage: "93.3%"
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Segoe UI', 'system-ui', sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "25px 0", justifyContent: "space-between" }}>
        <div>
          <div style={{ textAlign: "center", padding: "10px 20px 25px 20px", borderBottom: "2px solid #f1f5f9" }}>
            <div style={{ fontSize: "55px", marginBottom: "10px" }}>🎓 </div>
            <h4 style={{ margin: "0 0 5px 0", color: "#1e293b", fontWeight: "700", fontSize: "16px" }}>Shaik Abdul Khasim</h4>
            <span style={{ fontSize: "11px", color: "#2563eb", backgroundColor: "#eff6ff", padding: "4px 12px", borderRadius: "12px", fontWeight: "700" }}>FACULTY PORTAL</span>
          </div>

          <div style={{ marginTop: "25px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {["Schedule", "Marks Entry", "My Attendance Tracker", "My Profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); if (tab !== "Schedule") setSelectedMonth(null); }}
                style={{
                  textAlign: "left", padding: "14px 24px",
                  backgroundColor: activeTab === tab ? "#eff6ff" : "transparent",
                  color: activeTab === tab ? "#2563eb" : "#64748b",
                  border: "none", fontWeight: activeTab === tab ? "700" : "500", fontSize: "14px", cursor: "pointer",
                  borderLeft: activeTab === tab ? "5px solid #2563eb" : "5px solid transparent"
                }}
              >
                {tab === "Schedule" && "📅 "}
                {tab === "Marks Entry" && "📝 "}
                {tab === "My Attendance Tracker" && "📊 "}
                {tab === "My Profile" && "👤 "}
                {tab}
                
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px" }}>
          <button onClick={() => window.confirm("Logout?") && navigate("/")} style={{ width: "100%", padding: "12px 20px", backgroundColor: "#fff5f5", color: "#e11d48", border: "1px solid #fecdd3", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>Secure Logout</button>
        </div>
      </div>

      {/* MAIN MODULE CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "20px 40px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>
            {activeTab.toUpperCase()} {selectedMonth ? `(${selectedMonth.toUpperCase()})` : ""}
          </h2>
        </div>

        <div style={{ padding: "40px", overflowY: "auto", maxHeight: "calc(100vh - 85px)" }}>
          
          {/* VIEW 1: MASTER TIME TABLES & TARGETS */}
          {activeTab === "Schedule" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {!selectedMonth && (
                <div style={{ display: "flex", gap: "12px", backgroundColor: "#ffffff", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <button onClick={() => setScheduleSubTab("weekly")} style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: scheduleSubTab === "weekly" ? "#2563eb" : "#ffffff", color: scheduleSubTab === "weekly" ? "#ffffff" : "#475569", fontWeight: "700", cursor: "pointer" }}>Weekly Timetable View</button>
                  <button onClick={() => setScheduleSubTab("monthly")} style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: scheduleSubTab === "monthly" ? "#2563eb" : "#ffffff", color: scheduleSubTab === "monthly" ? "#ffffff" : "#475569", fontWeight: "700", cursor: "pointer" }}>Monthly Matrix Planner</button>
                </div>
              )}

              {scheduleSubTab === "weekly" && !selectedMonth && (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #e2e8f0" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "13px" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                        <th style={{ padding: "14px", border: "1px solid #cbd5e1", color: "#1e293b", fontWeight: "800", width: "14%" }}>Day</th>
                        {timeSlotsConfig.map((slot, idx) => (
                          <th key={idx} style={{ padding: "14px", border: "1px solid #cbd5e1", color: slot.type === "break" ? "#dc2626" : "#475569", fontWeight: "700" }}>
                            {slot.label.split(" (")[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {operationalDays.map((day) => (
                        <tr key={day} style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "16px", border: "1px solid #cbd5e1", fontWeight: "800", backgroundColor: "#f8fafc" }}>{day}</td>
                          {timeSlotsConfig.map((slot, sIdx) => {
                            const alloc = getWeeklyAllocation(day, slot.label);
                            if (alloc.isBreak) {
                              return <td key={sIdx} style={{ border: "1px solid #cbd5e1", backgroundColor: "#94a3b8", color: "#ffffff", fontWeight: "800", fontSize: "11px" }}>BRK</td>;
                            }
                            return <td key={sIdx} style={{ padding: "16px", border: "1px solid #cbd5e1", backgroundColor: alloc.bg, fontWeight: "800", color: "#1e3a8a" }}>{alloc.text}</td>;
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {scheduleSubTab === "monthly" && !selectedMonth && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                  {monthsList.map((month) => (
                    <div key={month} onClick={() => setSelectedMonth(month)} style={{ backgroundColor: "#ffffff", padding: "25px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", cursor: "pointer", textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }}>
                      <div style={{ fontSize: "32px", marginBottom: "8px" }}></div>
                      <h4 style={{ margin: 0, color: "#1e293b", fontWeight: "700" }}>{month.toUpperCase()}</h4>
                      <span style={{ fontSize: "11px", color: "#2563eb", fontWeight: "600" }}>Click to view syllabus roadmap</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedMonth && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <button onClick={() => setSelectedMonth(null)} style={{ alignSelf: "flex-start", padding: "10px 18px", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", fontWeight: "700", color: "#475569", cursor: "pointer" }}>Back to Matrix</button>
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #e2e8f0" }}>
                    {weeksList.map((week) => (
                      <div key={week} style={{ marginBottom: "30px" }}>
                        <h4 style={{ color: "#2563eb", margin: "0 0 12px 0", borderBottom: "2px solid #eff6ff", paddingBottom: "6px" }}>{week}</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                          {operationalDays.map((day) => {
                            const info = mockMonthlyGrids[selectedMonth][week][day];
                            if (!info || (!info.subject && !info.status)) return null;
                            return (
                              <div key={day} style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                  <span style={{ fontWeight: "800", fontSize: "12px", color: "#1e293b" }}>{day}</span>
                                  <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>{info.room}</span>
                                </div>
                                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{info.subject || "HOLIDAY/VACATION"}</div>
                                <div style={{ fontSize: "12px", color: "#2563eb", marginTop: "4px", fontWeight: "600" }}>{info.status}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: VALIDATED MARKS SYSTEM WITH DYNAMIC OUTPUTS */}
          {activeTab === "Marks Entry" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              
              {/* Main Selection Toggle Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
                
                {/* BOX 1: WEEKLY ENTRY SUBVIEW BOX */}
                <div 
                  onClick={() => setMarksSubView("weekly")}
                  style={{ 
                    backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: marksSubView === "weekly" ? "2px solid #2563eb" : "1px solid #e2e8f0", 
                    cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0, color: "#0f172a" }}>Weekly Marks Entry</h3>
                    {savedWeeklyRecord && <span style={{ color: "#16a34a", fontSize: "12px", fontWeight: "700" }}>Saved ({savedWeeklyRecord.roll})</span>}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>Min 0 to Max 10 marks setup cells. Scale-down to half happens automatically inside temporary session state.</p>
                </div>

                {/* BOX 2: MID-TERM ENTRY SUBVIEW BOX */}
                <div 
                  onClick={() => setMarksSubView("mid")}
                  style={{ 
                    backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: marksSubView === "mid" ? "2px solid #2563eb" : "1px solid #e2e8f0", 
                    cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0, color: "#0f172a" }}>Mid Marks Entry</h3>
                    {savedMidRecord && <span style={{ color: "#16a34a", fontSize: "12px", fontWeight: "700" }}>Saved ({savedMidRecord.roll})</span>}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "13px", marginTop: "6px" }}>Min 0 to Max 25 marks validation cells. Stores pure mid evaluation marks.</p>
                </div>

              </div>

              {/* Weekly Input Segment subform */}
              {marksSubView === "weekly" && (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #cbd5e1" }}>
                  <h4 style={{ margin: "0 0 20px 0", color: "#1e293b", borderLeft: "4px solid #2563eb", paddingLeft: "10px" }}>WEEKLY EVALUATION DATA INPUTS</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>STUDENT ROLL NUMBER (Format: 23L31A05L8)</label>
                      <input type="text" value={weeklyRoll} onChange={(e) => setWeeklyRoll(e.target.value)} placeholder="e.g., 23L31A05L8" style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>WEEKLY MARKS (0 - 10)</label>
                      <input type="number" min="0" max="10" step="any" value={weeklyScore} onChange={(e) => setWeeklyScore(e.target.value)} placeholder="Enter marks out of 10..." style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
                    </div>
                  </div>
                  <button onClick={handleSaveWeekly} style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Save Weekly Segment</button>
                </div>
              )}

              {/* Mid-term Input Segment subform */}
              {marksSubView === "mid" && (
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #cbd5e1" }}>
                  <h4 style={{ margin: "0 0 20px 0", color: "#1e293b", borderLeft: "4px solid #2563eb", paddingLeft: "10px" }}>MID-TERM EVALUATION MARKS INPUTS</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>STUDENT ROLL NUMBER (Format: 23L31A05L8)</label>
                      <input type="text" value={midRoll} onChange={(e) => setMidRoll(e.target.value)} placeholder="e.g., 23L31A05L8" style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>MID MARKS (0 - 25)</label>
                      <input type="number" min="0" max="25" step="any" value={midScore} onChange={(e) => setMidScore(e.target.value)} placeholder="Enter marks out of 25..." style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: "none" }} />
                    </div>
                  </div>
                  <button onClick={handleSaveMid} style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Save Mid Segment</button>
                </div>
              )}

              {/* Master Trigger Record Save Dashboard Block */}
              {savedWeeklyRecord && savedMidRecord && (
                <div style={{ backgroundColor: "#eff6ff", border: "2px dashed #2563eb", padding: "20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: 0, color: "#1e3a8a" }}>Ready to compile metrics portfolio?</h4>
                    <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
                      Weekly Original: {savedWeeklyRecord.originalMarks} Marks → Reduced: **{savedWeeklyRecord.reducedMarks} Marks**. Mid Score: **{savedMidRecord.marks} Marks**.
                    </p>
                  </div>
                  <button onClick={handleMasterRecordSave} style={{ backgroundColor: "#16a34a", color: "white", padding: "14px 28px", border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "14px", cursor: "pointer" }}>
                    RECORD SAVE
                  </button>
                </div>
              )}

              {/* Consolidated Output Separate Matrix Table Grid Display (Populated from MongoDB) */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#0f172a", fontWeight: "700" }}>Separated Finalized Performance Records</h3>
                
                {finalizedRecords.length === 0 ? (
                  <div style={{ color: "#94a3b8", textAlign: "center", padding: "20px", fontStyle: "italic", fontSize: "13px" }}>No committed records compiled in this session ledger yet.</div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                        <th style={{ padding: "12px 16px", color: "#475569", fontWeight: "700" }}>1) Roll Number</th>
                        <th style={{ padding: "12px 16px", color: "#475569", fontWeight: "700" }}>2) Weekly Marks (Reduced Half)</th>
                        <th style={{ padding: "12px 16px", color: "#475569", fontWeight: "700" }}>3) Mid Marks</th>
                        <th style={{ padding: "12px 16px", color: "#475569", fontWeight: "700" }}>4) Total Marks Combined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalizedRecords.map((rec, i) => (
                        <tr key={rec._id || i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                          <td style={{ padding: "12px 16px", fontWeight: "700", color: "#2563eb" }}>{rec.roll}</td>
                          <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "600" }}>{rec.weekly} Marks</td>
                          <td style={{ padding: "12px 16px", color: "#0f172a", fontWeight: "600" }}>{rec.mid} Marks</td>
                          <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: "800", backgroundColor: "#f0fdf4" }}>{rec.total} Marks</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "My Profile" && (
            <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>My Professional Profile</h2>
    
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
      {skills.map((skill, index) => (
        <li key={index} style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>
          {skill}
              </li>
      ))}
              </ul>

              <button 
      onClick={() => setShowAddBox(!showAddBox)}
      style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
    >
              {showAddBox ? "Cancel" : "+ Add New Skill"}
              </button>

              {showAddBox && (
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input 
          type="text" 
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill..."
          style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #cbd5e1" }}
        />
              <button 
          onClick={handleAddSkill} 
          style={{ padding: "10px 20px", backgroundColor: "#16a34a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Save
              </button>
              </div>
    )}
              </div>
)}
          {/* VIEW 3: UPDATED ATTENDANCE INDICATORS */}
          {activeTab === "My Attendance Tracker" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Header Card */}
              <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" }}>Faculty Attendance & Duty Ledger</h3>
                  <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#64748b" }}>Semester-wide performance monitoring system.</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700" }}>CURRENT RATIO</div>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: "#2563eb" }}>{facultyAttendanceMetrics.attendancePercentage}</div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {[
                  { label: "Allocated Classes", value: facultyAttendanceMetrics.totalClassesAllocated, color: "#64748b" },
                  { label: "Classes Conducted", value: facultyAttendanceMetrics.classesConducted, color: "#16a34a" },
                  { label: "Classes Skipped", value: facultyAttendanceMetrics.classesSkipped, color: "#e11d48" },
                  { label: "Limit Remaining", value: facultyAttendanceMetrics.allowedSkipsPerSemester - facultyAttendanceMetrics.classesSkipped, color: "#f59e0b" }
                ].map((item, index) => (
                  <div key={index} style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "800", marginBottom: "8px" }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Progress Bar Container */}
              <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h4 style={{ margin: "0 0 15px 0" }}>Duty Execution Progress</h4>
                <div style={{ width: "100%", backgroundColor: "#f1f5f9", height: "20px", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ 
                    width: facultyAttendanceMetrics.attendancePercentage, 
                    backgroundColor: "#2563eb", 
                    height: "100%", 
                    transition: "width 0.5s ease-in-out" 
                  }}></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "12px", color: "#64748b" }}>
                  <span>0%</span>
                  <span>Target: 90%+</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
