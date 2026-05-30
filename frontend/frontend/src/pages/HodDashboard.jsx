import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HodDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Syllabus Allocator");
  
  // State for Schedule/Milestone tracking
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // ================= STATE FOR FACULTY SYLLABUS TRACKER =================
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // ================= STATE FOR FEATURE 3: LEAVE APPROVAL =================
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 101, 
      faculty: "Dr. Eliza Bethan", 
      reason: "Severe Migraine & Medical Consultation", 
      duration: "2 Days",
      status: "Pending",
      sickCheck: "Sick Leave (Medical Certificate Attached)",
      emergencyStatus: "Routine Impact (Classes can be managed)",
      performanceGrade: "Good",
      syllabusSpeed: "Fast",
      attendanceHistory: "94% Standard Presence"
    },
    { 
      id: 102, 
      faculty: "Prof. Rajesh Kumar", 
      reason: "Family Function / Personal Work", 
      duration: "1 Day",
      status: "Pending",
      sickCheck: "Casual Leave (Non-Medical)",
      emergencyStatus: "High-Priority (Midterm Lab Exam Day)",
      performanceGrade: "Normal",
      syllabusSpeed: "Slow",
      attendanceHistory: "72% Low Presence Warning"
    }
  ]);

  // ================= STATE FOR FEATURE 4: STUDENT COUNSELING (READ-ONLY AUDIT) =================
  const [rollNumberInput, setRollNumberInput] = useState("");
  const [searchedStudent, setSearchedStudent] = useState(null);

  // Expanded Student Database containing exactly 10 sequential roll numbers (L1 to M1)
  const studentDatabase = {
    "23L31A05L1": {
      name: "Amit Verma",
      rollNo: "23L31A05L1",
      section: "CSE 1",
      attendance: 64, // Triggers Alert
      behaviorHistory: "Complained Before (2 Flags Logged for Mobile Usage)",
      academicStanding: "Low",
      parentBackground: "Farmer"
    },
    "23L31A05L2": {
      name: "Divya Teja",
      rollNo: "23L31A05L2",
      section: "CSE 1",
      attendance: 82, 
      behaviorHistory: "First Time Offense (Classroom Disturbance)",
      academicStanding: "Normal",
      parentBackground: "Businessman"
    },
    "23L31A05L3": {
      name: "Harish Kumar",
      rollNo: "23L31A05L3",
      section: "CSE 2",
      attendance: 71, // Triggers Alert
      behaviorHistory: "Complained Before (Frequent proxy attempts)",
      academicStanding: "Normal",
      parentBackground: "Govt Employee"
    },
    "23L31A05L4": {
      name: "Kavitha Rao",
      rollNo: "23L31A05L4",
      section: "CSE 2",
      attendance: 89, 
      behaviorHistory: "No Behavioral Issues Logged",
      academicStanding: "High",
      parentBackground: "Software Engineer"
    },
    "23L31A05L5": {
      name: "Manoj Swamy",
      rollNo: "23L31A05L5",
      section: "CSE 3",
      attendance: 55, // Triggers Alert
      behaviorHistory: "Complained Before (4 Flags for Mass Bunking Leadership)",
      academicStanding: "Low",
      parentBackground: "Daily Wage Worker"
    },
    "23L31A05L6": {
      name: "Nisha Patel",
      rollNo: "23L31A05L6",
      section: "CSE 3",
      attendance: 78, 
      behaviorHistory: "First Time Offense (Late entry to Lab sessions)",
      academicStanding: "High",
      parentBackground: "School Teacher"
    },
    "23L31A05L7": {
      name: "Pavan Kalyan",
      rollNo: "23L31A05L7",
      section: "CSE 4",
      attendance: 92, 
      behaviorHistory: "No Behavioral Issues Logged",
      academicStanding: "High",
      parentBackground: "Businessman"
    },
    "23L31A05L8": {
      name: "Rahul Sharma",
      rollNo: "23L31A05L8",
      section: "CSE 1",
      attendance: 68, // Triggers Alert
      behaviorHistory: "Complained Before (3 Faculty Flags Logged)",
      academicStanding: "Low",
      parentBackground: "Farmer"
    },
    "23L31A05L9": {
      name: "Sai Kiran",
      rollNo: "23L31A05L9",
      section: "CSE 4",
      attendance: 76, 
      behaviorHistory: "First Time Offense (Arguing with Lab Assistant)",
      academicStanding: "Normal",
      parentBackground: "Private Employee"
    },
    "23L31A05M1": {
      name: "Tejaswini N.",
      rollNo: "23L31A05M1",
      section: "CSE 2",
      attendance: 61, // Triggers Alert
      behaviorHistory: "Complained Before (Sleeping during morning sessions)",
      academicStanding: "Low",
      parentBackground: "Tailor"
    }
  };

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weeksList = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4"];
  const sectionsList = ["CSE 1", "CSE 2", "CSE 3", "CSE 4"];

  const [syllabusData, setSyllabusData] = useState({
    "CSE 1": {
      "Cloud Computing": { progress: 45, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks": { progress: 60, faculty: "Prof. Rajesh Kumar", type: "Core Subject" },
      "Cryptography": { progress: 30, faculty: "Prof. Alan Turing", type: "Core Subject" },
      "MFAR (Aptitude & Reasoning)": { progress: 75, faculty: "Dr. Sarah Jenkins", type: "Core Subject" },
      "Introduction to AI": { progress: 25, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks Lab": { progress: 50, faculty: "Prof. Rajesh Kumar", type: "Practical Lab" },
      "AI Lab": { progress: 20, faculty: "Dr. Eliza Bethan", type: "Practical Lab" }
    },
    "CSE 2": {
      "Cloud Computing": { progress: 40, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks": { progress: 55, faculty: "Prof. Rajesh Kumar", type: "Core Subject" },
      "Cryptography": { progress: 35, faculty: "Prof. Alan Turing", type: "Core Subject" },
      "MFAR (Aptitude & Reasoning)": { progress: 70, faculty: "Dr. Sarah Jenkins", type: "Core Subject" },
      "Introduction to AI": { progress: 30, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks Lab": { progress: 45, faculty: "Prof. Rajesh Kumar", type: "Practical Lab" },
      "AI Lab": { progress: 25, faculty: "Dr. Eliza Bethan", type: "Practical Lab" }
    },
    "CSE 3": {
      "Cloud Computing": { progress: 42, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks": { progress: 58, faculty: "Prof. Rajesh Kumar", type: "Core Subject" },
      "Cryptography": { progress: 28, faculty: "Prof. Alan Turing", type: "Core Subject" },
      "MFAR (Aptitude & Reasoning)": { progress: 72, faculty: "Dr. Sarah Jenkins", type: "Core Subject" },
      "Introduction to AI": { progress: 22, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks Lab": { progress: 48, faculty: "Prof. Rajesh Kumar", type: "Practical Lab" },
      "AI Lab": { progress: 18, faculty: "Dr. Eliza Bethan", type: "Practical Lab" }
    },
    "CSE 4": {
      "Cloud Computing": { progress: 50, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks": { progress: 65, faculty: "Prof. Rajesh Kumar", type: "Core Subject" },
      "Cryptography": { progress: 40, faculty: "Prof. Alan Turing", type: "Core Subject" },
      "MFAR (Aptitude & Reasoning)": { progress: 80, faculty: "Dr. Sarah Jenkins", type: "Core Subject" },
      "Introduction to AI": { progress: 35, faculty: "Dr. Eliza Bethan", type: "Core Subject" },
      "Computer Networks Lab": { progress: 60, faculty: "Prof. Rajesh Kumar", type: "Practical Lab" },
      "AI Lab": { progress: 30, faculty: "Dr. Eliza Bethan", type: "Practical Lab" }
    }
  });

  const [weeklyMilestones, setWeeklyMilestones] = useState({
    January: {
      "WEEK 1": "Subject: Introduction to AI | Target: Complete 5% to 7% weekly | Overall Month Progress: 25% Completed",
      "WEEK 2": "Subject: Introduction to AI | Target: Complete 5% to 7% weekly | Overall Month Progress: 25% Completed",
      "WEEK 3": "Subject: Introduction to AI | Target: Complete 5% to 7% weekly | Overall Month Progress: 25% Completed",
      "WEEK 4": "Subject: Introduction to AI | Target: Complete 5% to 7% weekly | Overall Month Progress: 25% Completed",
    }
  });

  const [targetWorkInput, setTargetWorkInput] = useState("");

  const handleSelectWeek = (week) => {
    setSelectedWeek(week);
    setTargetWorkInput(weeklyMilestones[selectedMonth]?.[week] || "");
  };

  const handleCommitMilestone = () => {
    setWeeklyMilestones((prev) => ({
      ...prev,
      [selectedMonth]: { ...(prev[selectedMonth] || {}), [selectedWeek]: targetWorkInput }
    }));
    alert(`Saved milestone goals for ${selectedMonth} -> ${selectedWeek}!`);
    setSelectedWeek(null);
  };

  const handleSliderChange = (newVal) => {
    setSyllabusData((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        [selectedSubject]: {
          ...prev[selectedSection][selectedSubject],
          progress: parseInt(newVal)
        }
      }
    }));
  };

  const handleProcessLeave = (id, targetStatus) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: targetStatus } : req))
    );
    alert(`Leave Application Request successfully set to: ${targetStatus}`);
    setSelectedLeaveId(null);
  };

  const handleStudentAuditLookup = () => {
    const cleanRollNum = rollNumberInput.trim().toUpperCase();
    if (studentDatabase[cleanRollNum]) {
      setSearchedStudent(studentDatabase[cleanRollNum]);
    } else {
      alert("Student profile record not found! Try typing any roll number from 23L31A05L1 to 23L31A05M1");
      setSearchedStudent(null);
    }
  };

  const activeLeaveObject = leaveRequests.find((r) => r.id === selectedLeaveId);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: "260px", backgroundColor: "#0f172a", display: "flex", flexDirection: "column", padding: "25px 0", justifyContent: "space-between" }}>
        <div>
          <div style={{ textAlign: "center", padding: "10px 20px 25px 20px", borderBottom: "1px solid #334155" }}>
            <div style={{ fontSize: "55px", marginBottom: "10px" }}>⚡</div>
            <h4 style={{ margin: "0 0 5px 0", color: "#ffffff", fontWeight: "700", fontSize: "16px", letterSpacing: "0.5px" }}>HOD PANEL</h4>
            <span style={{ fontSize: "11px", color: "#38bdf8", backgroundColor: "#0c4a6e", padding: "4px 12px", borderRadius: "12px", fontWeight: "700" }}>DEPT COMMAND</span>
          </div>

          <div style={{ marginTop: "25px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { id: "Syllabus Allocator", icon: "📅 ", label: "Syllabus Allocator" },
              { id: "Syllabus Progress", icon: "📊 ", label: "Faculty Syllabus Progress" },
              { id: "Leave Verification", icon: "📝 ", label: "Leave Requests Ledger" },
              { id: "Student Counseling", icon: "⚖️ ", label: "Student Counseling Audit" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { 
                  setActiveTab(tab.id); 
                  setSelectedMonth(null); setSelectedWeek(null); 
                  setSelectedSection(null); setSelectedSubject(null);
                  setSelectedLeaveId(null); setRollNumberInput(""); setSearchedStudent(null);
                }}
                style={{
                  textAlign: "left", padding: "14px 24px",
                  backgroundColor: activeTab === tab.id ? "#1e293b" : "transparent",
                  color: activeTab === tab.id ? "#38bdf8" : "#94a3b8",
                  border: "none", fontWeight: activeTab === tab.id ? "700" : "500", fontSize: "14px", cursor: "pointer",
                  borderLeft: activeTab === tab.id ? "5px solid #38bdf8" : "5px solid transparent"
                }}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px" }}>
          <button onClick={() => window.confirm("Logout?") && navigate("/")} style={{ width: "100%", padding: "12px 20px", backgroundColor: "#7f1d1d", color: "#fca5a5", border: "1px solid #991b1b", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>🛑 Secure Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "20px 40px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>
            {activeTab.toUpperCase()} 
            {selectedSection ? ` ➡️ ${selectedSection}` : ""}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#0284c7", backgroundColor: "#e0f2fe", padding: "6px 14px", borderRadius: "6px" }}>Department: CSE</span>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#0f172a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>HOD</div>
          </div>
        </div>

        <div style={{ padding: "40px", overflowY: "auto", maxHeight: "calc(100vh - 85px)" }}>
          
          {/* ================= FEATURE 1: SYLLABUS ALLOCATOR ================= */}
          {activeTab === "Syllabus Allocator" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {!selectedMonth && (
                <>
                  <div style={{ backgroundColor: "#ffffff", padding: "24px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Monthly Academic Milestones Setup</h3>
                    <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Select a month to establish macro tracking logs.</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                    {monthsList.map((month) => (
                      <div key={month} onClick={() => setSelectedMonth(month)} style={{ backgroundColor: "#ffffff", padding: "25px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", cursor: "pointer", textAlign: "center" }}>
                        <div style={{ fontSize: "28px", marginBottom: "8px" }}>📅</div>
                        <h4 style={{ margin: "0", color: "#0f172a", fontWeight: "700" }}>{month}</h4>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedMonth && !selectedWeek && (
                <>
                  <div style={{ color: "#0284c7", fontWeight: "700", fontSize: "12px", cursor: "pointer" }} onClick={() => setSelectedMonth(null)}>⬅️ BACK TO OVERVIEW</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                    {weeksList.map((week) => (
                      <div key={week} onClick={() => handleSelectWeek(week)} style={{ backgroundColor: "#ffffff", padding: "30px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", cursor: "pointer", textAlign: "center" }}>
                        <div style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a" }}>🛠️ {week}</div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "10px" }}>{weeklyMilestones[selectedMonth]?.[week] || "🔴 No Work Targets"}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedMonth && selectedWeek && (
                <div style={{ maxWidth: "700px", margin: "0 auto", width: "100%", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "35px", borderRadius: "16px" }}>
                  <div style={{ color: "#64748b", fontWeight: "700", fontSize: "12px", cursor: "pointer", marginBottom: "8px" }} onClick={() => setSelectedWeek(null)}>⬅️ BACK</div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", fontWeight: "700" }}>🎯 WORK TO COMPLETE IN THESE WEEK:</label>
                  <textarea rows="4" value={targetWorkInput} onChange={(e) => setTargetWorkInput(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #cbd5e1", marginBottom: "20px" }} />
                  <button onClick={handleCommitMilestone} style={{ backgroundColor: "#0284c7", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", fontWeight: "700", cursor: "pointer" }}>Commit Target</button>
                </div>
              )}
            </div>
          )}

          {/* ================= FEATURE 2: SYLLABUS PROGRESS ================= */}
          {activeTab === "Syllabus Progress" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {!selectedSection && (
                <>
                  <div style={{ backgroundColor: "#ffffff", padding: "24px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Department Section Controls</h3>
                    <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Select a specific class section below to audit core subject courses and practical evaluation labs.</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                    {sectionsList.map((sec) => (
                      <div 
                        key={sec} onClick={() => setSelectedSection(sec)}
                        style={{ backgroundColor: "#ffffff", padding: "35px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", cursor: "pointer", textAlign: "center", transition: "transform 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                      >
                        <div style={{ fontSize: "36px", marginBottom: "10px" }}>🏫</div>
                        <h3 style={{ margin: 0, color: "#0f172a", fontWeight: "800" }}>{sec}</h3>
                        <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "700", backgroundColor: "#0f172a", padding: "4px 10px", borderRadius: "8px", display: "inline-block", marginTop: "12px" }}>Audit Track</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedSection && !selectedSubject && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0284c7", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setSelectedSection(null)}>
                    ⬅️ BACK TO SECTIONS OVERVIEW
                  </div>

                  <div style={{ backgroundColor: "#ffffff", padding: "25px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h4 style={{ margin: "0 0 20px 0", color: "#0f172a", fontSize: "16px", fontWeight: "800" }}>Academic Curriculum Matrix for {selectedSection}</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {Object.keys(syllabusData[selectedSection]).map((subjName) => {
                        const subjInfo = syllabusData[selectedSection][subjName];
                        return (
                          <div 
                            key={subjName} onClick={() => setSelectedSubject(subjName)}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", backgroundColor: "#f8fafc", transition: "background-color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f5f9"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                          >
                            <div>
                              <span style={{ fontSize: "11px", fontWeight: "700", color: subjInfo.type === "Core Subject" ? "#0284c7" : "#ec4899", backgroundColor: subjInfo.type === "Core Subject" ? "#e0f2fe" : "#fce7f3", padding: "3px 8px", borderRadius: "4px", marginRight: "10px" }}>
                                {subjInfo.type.toUpperCase()}
                              </span>
                              <strong style={{ fontSize: "15px", color: "#1e293b" }}>{subjName}</strong>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                              <div style={{ fontSize: "13px", color: "#64748b" }}>Faculty: <span style={{ fontWeight: "700", color: "#334155" }}>{subjInfo.faculty}</span></div>
                              <div style={{ width: "120px", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                                <div style={{ width: `${subjInfo.progress}%`, height: "100%", backgroundColor: subjInfo.progress >= 75 ? "#10b981" : "#0284c7" }}></div>
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a", width: "40px", textAlign: "right" }}>{subjInfo.progress}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {selectedSection && selectedSubject && (
                <>
                  <div style={{ color: "#0284c7", fontWeight: "700", fontSize: "13px", cursor: "pointer" }} onClick={() => setSelectedSubject(null)}>
                    ⬅️ BACK TO CURRICULUM LIST
                  </div>

                  <div style={{ maxWidth: "650px", margin: "0 auto", width: "100%", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}>
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                      <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "12px", backgroundColor: "#f1f5f9", fontWeight: "700", color: "#475569" }}>{selectedSection} SYLLABUS AUDIT</span>
                      <h3 style={{ margin: "8px 0 4px 0", fontSize: "22px", color: "#0f172a", fontWeight: "800" }}>{selectedSubject}</h3>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Handled by: <strong>{syllabusData[selectedSection][selectedSubject].faculty}</strong></p>
                    </div>

                    <div style={{ backgroundColor: "#f8fafc", padding: "25px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "8px" }}>
                        <span>% COMPLETED</span>
                        <span>% PENDING</span>
                      </div>
                      <div style={{ width: "100%", height: "24px", backgroundColor: "#e2e8f0", borderRadius: "12px", overflow: "hidden", display: "flex", border: "1px solid #cbd5e1" }}>
                        <div style={{ width: `${syllabusData[selectedSection][selectedSubject].progress}%`, backgroundColor: "#10b981", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: "800", transition: "width 0.2s" }}>
                          {syllabusData[selectedSection][selectedSubject].progress > 10 ? `${syllabusData[selectedSection][selectedSubject].progress}%` : ""}
                        </div>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "12px", fontWeight: "700" }}>
                          {100 - syllabusData[selectedSection][selectedSubject].progress}%
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                      <label style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", fontWeight: "700", color: "#334155" }}>
                        <span>ADJUST OR CALIBRATE PROGRESS LOGS:</span>
                        <span style={{ color: "#0284c7" }}>{syllabusData[selectedSection][selectedSubject].progress}% Complete</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={syllabusData[selectedSection][selectedSubject].progress} 
                        onChange={(e) => handleSliderChange(e.target.value)}
                        style={{ width: "100%", cursor: "pointer", accentColor: "#0284c7" }}
                      />
                    </div>

                    <button 
                      onClick={() => { alert("Progress metrics saved to database!"); setSelectedSubject(null); }}
                      style={{ width: "100%", backgroundColor: "#0f172a", color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                    >
                      💾 Lock & Save Syllabus Record
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ================= FEATURE 3: LEAVE APPROVAL SYSTEM ================= */}
          {activeTab === "Leave Verification" && (
            <div style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
              <div style={{ flex: 1, backgroundColor: "#ffffff", padding: "25px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Incoming Faculty Leave Ledger</h3>
                <p style={{ margin: "0 0 20px 0", color: "#64748b", fontSize: "13px" }}>Click on a faculty member's name to invoke the deep-dive panel inspection.</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {leaveRequests.map((req) => (
                    <div 
                      key={req.id}
                      onClick={() => setSelectedLeaveId(req.id)}
                      style={{
                        padding: "16px 20px",
                        borderRadius: "8px",
                        border: selectedLeaveId === req.id ? "2px solid #38bdf8" : "1px solid #e2e8f0",
                        backgroundColor: selectedLeaveId === req.id ? "#f0f9ff" : "#f8fafc",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.2s"
                      }}
                    >
                      <div>
                        <strong style={{ display: "block", fontSize: "15px", color: "#1e293b" }}>{req.faculty}</strong>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Reason: {req.reason} ({req.duration})</span>
                      </div>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        backgroundColor: req.status === "Approved" ? "#d1fae5" : req.status === "Rejected" ? "#fee2e2" : "#fef3c7",
                        color: req.status === "Approved" ? "#065f46" : req.status === "Rejected" ? "#991b1b" : "#92400e"
                      }}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {activeLeaveObject && (
                <div style={{ width: "420px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>Command Center Inspection</h3>
                  <span style={{ fontSize: "12px", color: "#0284c7", fontWeight: "600" }}>Target Profile: {activeLeaveObject.faculty}</span>
                  <hr style={{ margin: "15px 0", border: "0", borderTop: "1px solid #e2e8f0" }} />
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>1) Condition Check</label>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b", marginTop: "2px" }}>🏥 {activeLeaveObject.sickCheck}</div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>2) Emergency Status</label>
                      <span style={{ fontSize: "12px", fontWeight: "700", display: "inline-block", marginTop: "2px", color: activeLeaveObject.emergencyStatus.includes("High-Priority") ? "#dc2626" : "#4b5563" }}>⚠️ {activeLeaveObject.emergencyStatus}</span>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>3) Performance Tag</label>
                      <span style={{ fontSize: "11px", fontWeight: "800", padding: "2px 8px", borderRadius: "4px", display: "inline-block", marginTop: "2px", backgroundColor: activeLeaveObject.performanceGrade === "Good" ? "#d1fae5" : "#f3f4f6", color: activeLeaveObject.performanceGrade === "Good" ? "#065f46" : "#374151" }}>★ {activeLeaveObject.performanceGrade} Faculty</span>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>4) Syllabus Regulator Pace</label>
                      <span style={{ fontSize: "11px", fontWeight: "800", padding: "2px 8px", borderRadius: "4px", display: "inline-block", marginTop: "2px", backgroundColor: activeLeaveObject.syllabusSpeed === "Fast" ? "#e0f2fe" : "#fee2e2", color: activeLeaveObject.syllabusSpeed === "Fast" ? "#0369a1" : "#991b1b" }}>⏱️ {activeLeaveObject.syllabusSpeed} Runner</span>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>5) Track Attendance Presence</label>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", marginTop: "2px" }}>📈 {activeLeaveObject.attendanceHistory}</div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "25px" }}>
                    <button onClick={() => handleProcessLeave(activeLeaveObject.id, "Approved")} style={{ padding: "12px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Accept Leave</button>
                    <button onClick={() => handleProcessLeave(activeLeaveObject.id, "Rejected")} style={{ padding: "12px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Deny Leave</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= FEATURE 4: STUDENT COUNSELING AUDIT ================= */}
          {activeTab === "Student Counseling" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px", maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Student Counseling Profile Audit</h3>
                <p style={{ margin: "0 0 20px 0", color: "#64748b", fontSize: "13px" }}>Input any sequential roll numbers ranging from 23L31A05L1 down to 23L31A05M1 to cross-examine student attendance and history warnings.</p>
                
                <div style={{ display: "flex", gap: "12px" }}>
                  <input 
                    type="text" 
                    placeholder="e.g. 23L31A05L5" 
                    value={rollNumberInput}
                    onChange={(e) => setRollNumberInput(e.target.value)}
                    style={{ flex: 1, padding: "14px 18px", borderRadius: "8px", border: "2px solid #cbd5e1", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}
                  />
                  <button onClick={handleStudentAuditLookup} style={{ backgroundColor: "#0f172a", color: "white", padding: "0 28px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>Query Record</button>
                </div>
              </div>

              {searchedStudent && (
                <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "35px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", fontSize: "22px", color: "#0f172a", fontWeight: "800" }}>{searchedStudent.name}</h3>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#64748b" }}>Roll Number: {searchedStudent.rollNo} • Class Section: {searchedStudent.section}</span>
                    </div>
                    {searchedStudent.attendance < 75 && (
                      <span style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", animation: "pulse 2s infinite" }}>⚠️ ATTENDANCE SHORTAGE</span>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
                    <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", marginBottom: "4px" }}>CUMULATIVE ATTENDANCE</label>
                      <strong style={{ fontSize: "24px", color: searchedStudent.attendance < 75 ? "#dc2626" : "#10b981" }}>{searchedStudent.attendance}%</strong>
                    </div>
                    <div style={{ backgroundColor: "#f8fafc", padding: "18px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", marginBottom: "4px" }}>ACADEMIC STANDING EVALUATION</label>
                      <strong style={{ fontSize: "20px", color: searchedStudent.academicStanding === "Low" ? "#b91c1c" : "#1e293b" }}>{searchedStudent.academicStanding.toUpperCase()}</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #e2e8f0", paddingTop: "25px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Disciplinary & Behavior History Log</label>
                      <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: "600", color: "#334155" }}>{searchedStudent.behaviorHistory}</p>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase" }}>Parental Background Demographic</label>
                      <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: "600", color: "#334155" }}>{searchedStudent.parentBackground}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default HodDashboard;