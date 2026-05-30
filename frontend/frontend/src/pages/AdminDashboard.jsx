import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Campus Notifications");

  // ================= STATE FOR FEATURE 1: FACULTY MANAGEMENT =================
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [facultyNameInput, setFacultyNameInput] = useState("");
  const [assignedSubject, setAssignedSubject] = useState("Cryptography & Network Security (CNS)");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  // SEEDED RECOGNIZED MASTER CORE CORE FACULTY MEMBERS POOL
  const [facultyRegistry, setFacultyRegistry] = useState([
    { id: "FAC-2026-01", name: "NTR SIR", subject: "Cloud Computing (CC)", user: "ntr.cc", pass: "NTR_Auth@2026", status: "Active" },
    { id: "FAC-2026-02", name: "RAMESH SIR", subject: "Artificial Intelligence (AI)", user: "ramesh.ai", pass: "RameshAI#99", status: "Active" },
    { id: "FAC-2026-03", name: "OMKAR SIR", subject: "Software Project Management (SPM)", user: "omkar.spm", pass: "OmkarSPM!55", status: "Active" },
    { id: "FAC-2026-04", name: "VISALA MA'AM", subject: "Cryptography & Network Security (CNS)", user: "visala.cns", pass: "VisalaCNS*44", status: "Active" },
    { id: "FAC-2026-05", name: "USHA MA'AM", subject: "Mathematical Foundations for Aptitude & Reasoning (MFAR)", user: "usha.mfar", pass: "UshaMFAR&11", status: "Active" }
  ]);

  const btechSubjects = [
    "Cryptography & Network Security (CNS)",
    "Artificial Intelligence (AI)",
    "Cloud Computing (CC)",
    "Software Project Management (SPM)",
    "Mathematical Foundations for Aptitude & Reasoning (MFAR)",
    "Data Structures & Algorithms (DSA)",
    "Database Management Systems (DBMS)",
    "Operating Systems (OS)",
    "Computer Networks (CN)"
  ];

  // ================= STATE FOR FEATURE 2: TIMETABLE SCHEDULE & SUBSTITUTION ENGINE =================
  const daysList = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const periodsList = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
  
  // Pre-seeded template demonstrating an active lesson matrix
  const [timetableMatrix, setTimetableMatrix] = useState({
    MON: { 
      p1: { subject: "CLOUD COMPUTING (CC)", faculty: "NTR SIR" }, 
      p2: { subject: "ARTIFICIAL INTELLIGENCE (AI)", faculty: "RAMESH SIR" }, 
      p3: { subject: "SOFTWARE PROJECT MANAGEMENT (SPM)", faculty: "OMKAR SIR" }, 
      p4: { subject: "CRYPTOGRAPHY & NETWORK SECURITY (CNS)", faculty: "VISALA MA'AM" }, 
      p5: { subject: "MATHEMATICAL FOUNDATIONS FOR APTITUDE & REASONING (MFAR)", faculty: "USHA MA'AM" }, 
      p6: { subject: "", faculty: "" }, 
      p7: { subject: "" , faculty: "" } 
    },
    TUE: { p1: { subject: "", faculty: "" }, p2: { subject: "", faculty: "" }, p3: { subject: "", faculty: "" }, p4: { subject: "", faculty: "" }, p5: { subject: "", faculty: "" }, p6: { subject: "", faculty: "" }, p7: { subject: "" , faculty: "" } },
    WED: { p1: { subject: "", faculty: "" }, p2: { subject: "", faculty: "" }, p3: { subject: "", faculty: "" }, p4: { subject: "", faculty: "" }, p5: { subject: "", faculty: "" }, p6: { subject: "", faculty: "" }, p7: { subject: "" , faculty: "" } },
    THU: { p1: { subject: "", faculty: "" }, p2: { subject: "", faculty: "" }, p3: { subject: "", faculty: "" }, p4: { subject: "", faculty: "" }, p5: { subject: "", faculty: "" }, p6: { subject: "", faculty: "" }, p7: { subject: "" , faculty: "" } },
    FRI: { p1: { subject: "", faculty: "" }, p2: { subject: "", faculty: "" }, p3: { subject: "", faculty: "" }, p4: { subject: "", faculty: "" }, p5: { subject: "", faculty: "" }, p6: { subject: "", faculty: "" }, p7: { subject: "" , faculty: "" } },
    SAT: { p1: { subject: "", faculty: "" }, p2: { subject: "", faculty: "" }, p3: { subject: "", faculty: "" }, p4: { subject: "", faculty: "" }, p5: { subject: "", faculty: "" }, p6: { subject: "", faculty: "" }, p7: { subject: "" , faculty: "" } }
  });

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [targetCell, setTargetCell] = useState({ day: "", periodKey: "" });
  const [cellSubjectInput, setCellSubjectInput] = useState("");
  const [cellFacultyInput, setCellFacultyInput] = useState("");

  // ---------------- NEW NEW SUBSTITUTION CONTROLLER ENGINE POOLS ----------------
  const [absentFacultyPool, setAbsentFacultyPool] = useState(["NTR SIR"]); // Preset example
  const [substitutionWorkflowCell, setSubstitutionWorkflowCell] = useState(null);

  // Static tracking mapping to check syllabus speed ranks
  const facultySyllabusTracker = {
    "RAMESH SIR": { subjectCode: "AI", pace: "Slow (Lagging expected milestones)" },
    "OMKAR SIR": { subjectCode: "SPM", pace: "On-Time (Perfect timetable alignment)" },
    "VISALA MA'AM": { subjectCode: "CNS", pace: "Fast (Ahead of schedule)" },
    "USHA MA'AM": { subjectCode: "MFAR", pace: "Slow (Needs extra periods)" },
    "NTR SIR": { subjectCode: "CC", pace: "On-Time" }
  };

  // ================= STATE FOR FEATURE 3: FEES DUE =================
  const [studentFeeRecords] = useState([
    { rollNumber: "23L31A05L1", name: "CHANDRA KANTH", paidAmount: "1,00,000", dueAmount: "0" },
    { rollNumber: "23L31A05L2", name: "DEEPIKA REDDY", paidAmount: "85,000", dueAmount: "15,000" },
    { rollNumber: "23L31A05L3", name: "GOKUL SHARMA", paidAmount: "60,000", dueAmount: "40,000" },
    { rollNumber: "23L31A05L4", name: "HARSHINI V.", paidAmount: "95,000", dueAmount: "5,000" },
    { rollNumber: "23L31A05L5", name: "ISHWAR KUMAR", paidAmount: "45,000", dueAmount: "55,000" },
    { rollNumber: "23L31A05L6", name: "KAVYA SREE", paidAmount: "75,000", dueAmount: "25,000" },
    { rollNumber: "23L31A05L7", name: "MANISH VERMA", paidAmount: "50,000", dueAmount: "50,000" },
    { rollNumber: "23L31A05L8", name: "SAI KUMAR", paidAmount: "70,000", dueAmount: "30,000" },
    { rollNumber: "23L31A05L9", name: "NITHIN TEJA", paidAmount: "90,000", dueAmount: "10,000" },
    { rollNumber: "23L31A05M0", name: "PRANAY RAJ", paidAmount: "30,000", dueAmount: "70,000" }
  ]);

  const [feeSubView, setFeeSubView] = useState("list"); 
  const [rollSearchInput, setRollSearchInput] = useState("");
  const [activeStudentProfile, setActiveStudentProfile] = useState(null);

  // ================= STATE FOR FEATURE 4: CAMPUS NOTIFICATIONS =================
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifComplexity, setNotifComplexity] = useState("Casual"); 
  const [notifAttendScope, setNotifAttendScope] = useState("Everyone");
  const [notifPlace, setNotifPlace] = useState(""); 
  const [notifDate, setNotifDate] = useState("2026-05-28");
  const [notifTime, setNotifTime] = useState("09:00");

  const [broadcastRecords, setBroadcastRecords] = useState([
    { id: 1, title: "YUVATARANG FIESTA", complexity: "Medium", attend: "Everyone", place: "MAIN AUDITORIUM BLOCK-A", date: "2026-05-28", time: "09:00" },
    { id: 2, title: "MID-TERM EXAM CELL BRIEFING", complexity: "Emergency", attend: "HODs", place: "CONFERENCE HALL 2", date: "2026-05-28", time: "11:00" }
  ]);

  // ================= BUSINESS LOGIC HANDLERS =================
  const handleRegisterFaculty = (e) => {
    e.preventDefault();
    if (!facultyNameInput.trim() || !generatedUsername.trim() || !generatedPassword.trim()) return;

    const newFacultyRecord = {
      id: `FAC-2026-${String(facultyRegistry.length + 1).padStart(2, '0')}`,
      name: facultyNameInput.trim().toUpperCase(),
      subject: assignedSubject,
      user: generatedUsername.trim().toLowerCase(),
      pass: generatedPassword.trim(),
      status: "Active"
    };

    setFacultyRegistry([newFacultyRecord, ...facultyRegistry]);
    setFacultyNameInput("");
    setGeneratedUsername("");
    setGeneratedPassword("");
    setIsFacultyModalOpen(false);
  };

  const handleOpenCellAssignment = (day, periodKey) => {
    const currentCell = timetableMatrix[day][periodKey];
    
    // SMART FORK: If original teacher assigned is marked absent, trigger substitution engine
    if (currentCell.faculty && absentFacultyPool.includes(currentCell.faculty)) {
      setSubstitutionWorkflowCell({ day, periodKey, originalFaculty: currentCell.faculty, subject: currentCell.subject });
      return;
    }

    setTargetCell({ day, periodKey });
    setCellSubjectInput(currentCell.subject);
    setCellFacultyInput(currentCell.faculty);
    setIsAssignModalOpen(true);
  };

  const handleSaveCellAssignment = (e) => {
    e.preventDefault();
    const { day, periodKey } = targetCell;

    setTimetableMatrix({
      ...timetableMatrix,
      [day]: {
        ...timetableMatrix[day],
        [periodKey]: {
          subject: cellSubjectInput.trim().toUpperCase(),
          faculty: cellFacultyInput.trim().toUpperCase()
        }
      }
    });

    setIsAssignModalOpen(false);
  };

  // EXECUTE SUBSTITUTE OVERRIDE TASK RULE
  const executeSubstituteAllocation = (substituteTeacher) => {
    const { day, periodKey, subject } = substitutionWorkflowCell;
    
    setTimetableMatrix({
      ...timetableMatrix,
      [day]: {
        ...timetableMatrix[day],
        [periodKey]: {
          subject: subject,
          faculty: substituteTeacher + " (PROXY)"
        }
      }
    });

    alert(`Successfully allocated proxy cover duty to ${substituteTeacher} for ${day} ${periodKey.toUpperCase()}!`);
    setSubstitutionWorkflowCell(null);
  };

  const handleGlobalSaveTimetable = () => {
    let allFilled = true;
    for (let day of daysList) {
      for (let period of periodsList) {
        const cell = timetableMatrix[day][period];
        if (!cell.subject.trim() || !cell.faculty.trim()) {
          allFilled = false;
          break;
        }
      }
      if (!allFilled) break;
    }

    if (allFilled) {
      alert("Your weekly timetable is successfully saved");
    } else {
      alert("You have to fill all boxes for saving the timetable, otherwise it will not save");
    }
  };

  const handleSearchRollSubmit = (e) => {
    e.preventDefault();
    const cleanSearchInput = rollSearchInput.trim().toUpperCase();
    if (!cleanSearchInput) return;

    const matchedStudent = studentFeeRecords.find((student) => student.rollNumber === cleanSearchInput);

    if (matchedStudent) {
      setActiveStudentProfile(matchedStudent);
      setFeeSubView("options");
    } else {
      alert(`Student profile with roll number "${cleanSearchInput}" was not located.`);
    }
  };

  const handleCreateNotificationSubmit = (e) => {
    e.preventDefault();
    if (!notifTitle.trim()) return;

    const newNotification = {
      id: Date.now(),
      title: notifTitle.trim().toUpperCase(),
      complexity: notifComplexity,
      attend: notifAttendScope,
      place: notifPlace.trim().toUpperCase() || "CAMPUS PREMISES",
      date: notifDate,
      time: notifTime
    };

    setBroadcastRecords([newNotification, ...broadcastRecords]);
    setNotifTitle("");
    setNotifComplexity("Casual");
    setNotifAttendScope("Everyone");
    setNotifPlace("");
    setIsBroadcastModalOpen(false);
  };

  const toggleAbsentStatus = (name) => {
    if (absentFacultyPool.includes(name)) {
      setAbsentFacultyPool(absentFacultyPool.filter(f => f !== name));
    } else {
      setAbsentFacultyPool([...absentFacultyPool, name]);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/");
    }
  };

  const getComplexityStyles = (complexity) => {
    if (complexity === "Emergency") return { border: "2px solid #e11d48", badgeBg: "#fff1f2", badgeColor: "#9f1239" };
    if (complexity === "Medium") return { border: "2px solid #f59e0b", badgeBg: "#fef3c7", badgeColor: "#92400e" };
    return { border: "2px solid #3b82f6", badgeBg: "#eff6ff", badgeColor: "#1e40af" };
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      
      {/* ================= LEFT SIDEBAR NAVIGATION ================= */}
      <div style={{ width: "270px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "25px 0", justifyContent: "space-between" }}>
        <div>
          <div style={{ textAlign: "center", padding: "10px 20px 25px 20px", borderBottom: "2px solid #f1f5f9" }}>
            <div style={{ fontSize: "55px", marginBottom: "10px" }}>🛠️</div>
            <h4 style={{ margin: "0 0 5px 0", color: "#0f172a", fontWeight: "800", fontSize: "16px", letterSpacing: "0.5px" }}>CENTRAL COMMAND</h4>
            <span style={{ fontSize: "11px", color: "#be123c", backgroundColor: "#fff1f2", padding: "4px 12px", borderRadius: "12px", fontWeight: "700" }}>ADMIN PORTAL</span>
          </div>

          <div style={{ marginTop: "25px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {["Faculty Management", "Schedule Manager", "Fees Due", "Campus Notifications"].map((tabName, idx) => {
              const icons = ["👥 ", "📅 ", "💰 ", "📢 "];
              return (
                <button
                  key={tabName}
                  onClick={() => { setActiveTab(tabName); setSubstitutionWorkflowCell(null); }}
                  style={{
                    textAlign: "left", padding: "14px 24px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer", transition: "all 0.2s ease",
                    backgroundColor: activeTab === tabName ? "#fff1f2" : "transparent",
                    color: activeTab === tabName ? "#be123c" : "#64748b",
                    borderLeft: activeTab === tabName ? "5px solid #be123c" : "5px solid transparent",
                  }}
                >
                  {icons[idx]}{tabName}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: "0 20px" }}>
          <button onClick={handleLogout} style={{ width: "100%", padding: "12px 20px", backgroundColor: "#fff5f5", color: "#e11d48", border: "1px solid #fecdd3", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            ↪️ Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT MODULE WRAPPER ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <div style={{ backgroundColor: "#ffffff", padding: "20px 40px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>
            {activeTab.toUpperCase()}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>Systems Authority: Global Admin</span>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#be123c", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>ADM</div>
          </div>
        </div>

        <div style={{ padding: "40px", overflowY: "auto", maxHeight: "calc(100vh - 85px)" }}>
          
          {/* ================= VIEW 1: FACULTY MANAGEMENT ================= */}
          {activeTab === "Faculty Management" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "20px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Faculty Authorization Registry</h3>
                  <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Manage system profiles and active campus state parameters.</p>
                </div>
                <button onClick={() => setIsFacultyModalOpen(true)} style={{ backgroundColor: "#10b981", color: "#ffffff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
                  ➕ Add New Faculty Member
                </button>
              </div>

              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "30px", border: "1px solid #e2e8f0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "14px 16px", color: "#475569" }}>Faculty ID</th>
                      <th style={{ padding: "14px 16px", color: "#475569" }}>Full Name</th>
                      <th style={{ padding: "14px 16px", color: "#475569" }}>Core Specialization</th>
                      <th style={{ padding: "14px 16px", color: "#475569" }}>Portal Username</th>
                      <th style={{ padding: "14px 16px", color: "#475569" }}>Attendance Mark Status</th>
                      <th style={{ padding: "14px 16px", color: "#475569", textAlign: "center" }}>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyRegistry.map((faculty) => (
                      <tr key={faculty.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "16px", fontWeight: "700", color: "#2563eb" }}>{faculty.id}</td>
                        <td style={{ padding: "16px", fontWeight: "700", color: "#0f172a" }}>{faculty.name}</td>
                        <td style={{ padding: "16px" }}><span style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>{faculty.subject}</span></td>
                        <td style={{ padding: "16px", fontFamily: "monospace", fontWeight: "600" }}>{faculty.user}</td>
                        <td style={{ padding: "16px" }}>
                          <button 
                            onClick={() => toggleAbsentStatus(faculty.name)}
                            style={{
                              padding: "6px 12px", borderRadius: "6px", border: "none", fontWeight: "700", fontSize: "11px", cursor: "pointer",
                              backgroundColor: absentFacultyPool.includes(faculty.name) ? "#fee2e2" : "#e0f2fe",
                              color: absentFacultyPool.includes(faculty.name) ? "#ef4444" : "#0369a1"
                            }}
                          >
                            {absentFacultyPool.includes(faculty.name) ? "🛑 MARKED ABSENT (ON LEAVE)" : "🟢 PRESENT"}
                          </button>
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}><span style={{ fontSize: "11px", color: "#16a34a", backgroundColor: "#dcfce7", padding: "4px 12px", borderRadius: "12px", fontWeight: "700" }}>{faculty.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: SCHEDULE MANAGER & SUBSTITUTION INTERACTION ================= */}
          {activeTab === "Schedule Manager" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* PRIMARY MASTER TIMETABLE BLOCK */}
              <div style={{ backgroundColor: "#ffffff", padding: "20px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Weekly Class Schedule Configuration</h3>
                <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
                  Click an assigned class card. If the assigned teacher is flagged as <strong style={{ color: "#ef4444" }}>Absent</strong>, the smart substitution proxy engine activates automatically!
                </p>
              </div>

              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "25px", border: "1px solid #e2e8f0", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid #cbd5e1", textAlign: "center", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                      <th style={{ padding: "12px", border: "1px solid #cbd5e1", color: "#334155", fontWeight: "700", width: "80px" }}>Day</th>
                      {periodsList.map((p, pIdx) => (
                        <th key={p} style={{ padding: "12px", border: "1px solid #cbd5e1", color: "#334155", fontWeight: "700" }}>
                          Period {pIdx + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {daysList.map((day) => {
                      const row = timetableMatrix[day];
                      return (
                        <tr key={day} style={{ borderBottom: "1px solid #cbd5e1", height: "85px" }}>
                          <td style={{ backgroundColor: "#f8fafc", fontWeight: "800", color: "#1e293b", border: "1px solid #cbd5e1" }}>{day}</td>
                          
                          {periodsList.map((pKey) => {
                            const isAbsent = absentFacultyPool.includes(row[pKey].faculty);
                            return (
                              <td 
                                key={pKey} 
                                onClick={() => handleOpenCellAssignment(day, pKey)} 
                                style={{ 
                                  border: "1px solid #cbd5e1", cursor: "pointer", padding: "6px",
                                  backgroundColor: isAbsent ? "#fef2f2" : (row[pKey].subject ? "#f0fdf4" : "#ffffff")
                                }}
                              >
                                {row[pKey].subject ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontWeight: "800", color: isAbsent ? "#991b1b" : "#0f172a", fontSize: "11px" }}>{row[pKey].subject}</span>
                                    <span style={{ 
                                      fontSize: "10px", fontWeight: "700", padding: "2px 4px", borderRadius: "4px",
                                      backgroundColor: isAbsent ? "#fee2e2" : "#eff6ff", 
                                      color: isAbsent ? "#ef4444" : "#2563eb" 
                                    }}>
                                      👤 {row[pKey].faculty} {isAbsent && "(ABSENT)"}
                                    </span>
                                    {isAbsent && (
                                      <span style={{ fontSize: "9px", color: "#b45309", backgroundColor: "#fef3c7", padding: "1px 3px", borderRadius: "3px", fontWeight: "bold" }}>
                                        ⚠️ Click Proxy Shift
                                      </span>
                                    )}
                                  </div>
                                ) : <span style={{ color: "#94a3b8", fontSize: "11px" }}>+ Assign Base</span>}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ================= NEW INJECTED DOM FEATURE: THE SUBSTITUTION ACTION BOARD ================= */}
              {substitutionWorkflowCell && (
                <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "12px", border: "2px dashed #be123c", marginTop: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div>
                      <span style={{ fontSize: "11px", backgroundColor: "#be123c", color: "white", padding: "4px 10px", borderRadius: "4px", fontWeight: "bold" }}>PROXY SCHEDULER MATRIX</span>
                      <h3 style={{ margin: "6px 0 0 0", color: "#0f172a", fontWeight: "800" }}>
                        Assign Proxy for {substitutionWorkflowCell.originalFaculty} ({substitutionWorkflowCell.subject})
                      </h3>
                      <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>
                        Target Slot: <strong style={{ color: "#334155" }}>{substitutionWorkflowCell.day} - {substitutionWorkflowCell.periodKey.toUpperCase()}</strong>
                      </p>
                    </div>
                    <button 
                      onClick={() => setSubstitutionWorkflowCell(null)}
                      style={{ padding: "6px 12px", backgroundColor: "#f1f5f9", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", color: "#475569" }}
                    >
                      ✕ Close Panel
                    </button>
                  </div>

                  <h4 style={{ color: "#475569", fontSize: "13px", margin: "0 0 12px 0" }}>Core Faculty Availability & Syllabus Tracking Breakdown:</h4>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {facultyRegistry
                      .filter(fac => fac.name !== substitutionWorkflowCell.originalFaculty)
                      .map((fac) => {
                        const isSubAbsent = absentFacultyPool.includes(fac.name);
                        const tracking = facultySyllabusTracker[fac.name] || { pace: "Normal/Unknown" };
                        
                        return (
                          <div 
                            key={fac.name}
                            style={{ 
                              display: "flex", justifyContent: "space-between", alignItems: "center", 
                              padding: "14px 20px", border: "1px solid #e2e8f0", borderRadius: "8px",
                              backgroundColor: isSubAbsent ? "#f8fafc" : "#ffffff"
                            }}
                          >
                            <div>
                              <strong style={{ color: "#0f172a", fontSize: "14px" }}>{fac.name}</strong>
                              <span style={{ marginLeft: "10px", fontSize: "11px", backgroundColor: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", color: "#475569", fontWeight: "600" }}>
                                Dept Core: {fac.subject}
                              </span>
                              
                              {/* TWIN POINT VERIFICATION STATEMENT ROWS */}
                              <div style={{ display: "flex", gap: "15px", marginTop: "5px", fontSize: "12px" }}>
                                <span>1) Status: {isSubAbsent ? <strong style={{ color: "#ef4444" }}>Busy/On Leave</strong> : <strong style={{ color: "#16a34a" }}>🟢 Free & Available</strong>}</span>
                                <span>•</span>
                                <span>2) Syllabus Progress: <strong style={{ color: tracking.pace.includes("Slow") ? "#b45309" : "#0284c7" }}>{tracking.pace}</strong></span>
                              </div>
                            </div>

                            <button
                              disabled={isSubAbsent}
                              onClick={() => executeSubstituteAllocation(fac.name)}
                              style={{
                                padding: "10px 18px", borderRadius: "6px", border: "none", fontWeight: "700", fontSize: "12px", cursor: isSubAbsent ? "not-allowed" : "pointer",
                                backgroundColor: isSubAbsent ? "#cbd5e1" : "#be123c",
                                color: "white"
                              }}
                            >
                              {isSubAbsent ? "❌ Cannot Assign" : "⚡ One-Click Assign Proxy"}
                            </button>
                          </div>
                        );
                    })}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <button 
                  onClick={handleGlobalSaveTimetable}
                  style={{ backgroundColor: "#be123c", color: "#ffffff", border: "none", padding: "14px 35px", borderRadius: "8px", fontWeight: "800", fontSize: "15px", cursor: "pointer" }}
                >
                  💾 Save Weekly Timetable
                </button>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: FEES DUE MODULE ================= */}
          {activeTab === "Fees Due" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              {feeSubView === "list" && (
                <>
                  <div style={{ backgroundColor: "#ffffff", padding: "20px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Fees Audit Verification Panel</h3>
                    <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Please type and submit a valid academic registration number below to check ledger boards.</p>
                  </div>

                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "40px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                    <form onSubmit={handleSearchRollSubmit} style={{ maxWidth: "550px", margin: "0 auto" }}>
                      <label style={{ display: "block", textAlign: "left", fontWeight: "700", color: "#334155", marginBottom: "10px", fontSize: "14px" }}>
                        Enter Student Roll Number:
                      </label>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g., 23L31A05L8" 
                          value={rollSearchInput}
                          onChange={(e) => setRollSearchInput(e.target.value)}
                          style={{ flex: 1, padding: "14px 18px", borderRadius: "8px", border: "2px solid #cbd5e1", fontSize: "15px", fontWeight: "600", outline: "none", boxSizing: "border-box" }}
                        />
                        <button 
                          type="submit"
                          style={{ backgroundColor: "#0f172a", color: "#ffffff", border: "none", padding: "0 25px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                        >
                          Submit Roll No.
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}

              {feeSubView === "options" && activeStudentProfile && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "20px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "800" }}>Account Balance Overview: {activeStudentProfile.rollNumber}</h3>
                      <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Student Name: <span style={{ color: "#be123c" }}>{activeStudentProfile.name}</span> | Annual Fee Commitment: ₹1,00,000</p>
                    </div>
                    <button 
                      onClick={() => { setFeeSubView("list"); setActiveStudentProfile(null); }} 
                      style={{ padding: "8px 16px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontWeight: "700", color: "#475569", fontSize: "13px" }}
                    >
                      ⬅️ Search Another
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
                    <div style={{ backgroundColor: "#ffffff", border: "2px solid #10b981", borderRadius: "14px", padding: "35px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                        <span style={{ fontSize: "28px" }}>🟢</span>
                        <h3 style={{ margin: 0, color: "#059669", fontSize: "22px", fontWeight: "800" }}>1) Fees Paid</h3>
                      </div>
                      <div style={{ borderTop: "1px solid #e6f4ea", paddingTop: "15px" }}>
                        <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginBottom: "4px" }}>CONFIRMED RECEIVED AMOUNT</span>
                        <h2 style={{ margin: 0, color: "#0f172a", fontSize: "32px", fontWeight: "800" }}>₹{activeStudentProfile.paidAmount}</h2>
                      </div>
                    </div>

                    <div style={{ backgroundColor: "#ffffff", border: "2px solid #e11d48", borderRadius: "14px", padding: "35px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                        <span style={{ fontSize: "28px" }}>🔴</span>
                        <h3 style={{ margin: 0, color: "#be123c", fontSize: "22px", fontWeight: "800" }}>2) Fees Due</h3>
                      </div>
                      <div style={{ borderTop: "1px solid #ffe4e6", paddingTop: "15px" }}>
                        <span style={{ fontSize: "13px", color: "#64748b", display: "block", marginBottom: "4px" }}>TOTAL OUTSTANDING LIABILITIES</span>
                        <h2 style={{ margin: 0, color: "#0f172a", fontSize: "32px", fontWeight: "800" }}>₹{activeStudentProfile.dueAmount}</h2>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ================= VIEW 4: CAMPUS NOTIFICATIONS ================= */}
          {activeTab === "Campus Notifications" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "20px 30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>Active Campus Broadcast Logs</h3>
                  <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>Dispatch announcements to circular dashboard feeds.</p>
                </div>
                <button onClick={() => setIsBroadcastModalOpen(true)} style={{ backgroundColor: "#be123c", color: "#ffffff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
                  📢 Broadcast New Circular
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {broadcastRecords.map((notif) => {
                  const styles = getComplexityStyles(notif.complexity);
                  return (
                    <div key={notif.id} style={{ backgroundColor: "#ffffff", padding: "25px", borderRadius: "12px", border: styles.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "11px", fontWeight: "800", backgroundColor: styles.badgeBg, color: styles.badgeColor, padding: "4px 10px", borderRadius: "6px" }}>
                            {notif.complexity.toUpperCase()}
                          </span>
                          <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>Target Scope: {notif.attend}</span>
                        </div>
                        <h3 style={{ margin: "10px 0 6px 0", fontSize: "16px", fontWeight: "800", color: "#0f172a" }}>{notif.title}</h3>
                        <span style={{ fontSize: "12px", color: "#475569", fontWeight: "600" }}>📍 Venue Location: {notif.place}</span>
                      </div>
                      <div style={{ textAlign: "right", borderLeft: "2px dashed #e2e8f0", paddingLeft: "25px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a" }}>{notif.date}</div>
                        <div style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", marginTop: "2px" }}>⏱️ {notif.time} AM</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= MODAL OVERLAYS: BASE FACULTY SIGN UP FORM ================= */}
      {isFacultyModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", width: "100%", maxWidth: "500px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#0f172a", fontSize: "18px", fontWeight: "800" }}>Register Faculty Profile Base</h3>
            <form onSubmit={handleRegisterFaculty} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Faculty Full Name:</label>
                <input type="text" required placeholder="e.g. PROF. OMKAR SIR" value={facultyNameInput} onChange={(e) => setFacultyNameInput(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Core Specialization Module:</label>
                <select value={assignedSubject} onChange={(e) => setAssignedSubject(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                  {btechSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Set Portal Username:</label>
                <input type="text" required placeholder="omkar.spm" value={generatedUsername} onChange={(e) => setGeneratedUsername(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Set System Password Key:</label>
                <input type="text" required placeholder="Create strong key" value={generatedPassword} onChange={(e) => setGeneratedPassword(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="submit" style={{ flex: 1, backgroundColor: "#10b981", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Save Account</button>
                <button type="button" onClick={() => setIsFacultyModalOpen(false)} style={{ flex: 1, backgroundColor: "#f1f5f9", color: "#475569", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL OVERLAYS: STANDARD TIMETABLE ASSIGNMENT BLOCK ================= */}
      {isAssignModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", width: "100%", maxWidth: "450px" }}>
            <h3 style={{ margin: "0 0 5px 0", color: "#0f172a", fontSize: "18px", fontWeight: "800" }}>Configure Target Timetable Slot</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "12px", color: "#64748b" }}>Target Location: {targetCell.day} - {targetCell.periodKey?.toUpperCase()}</p>
            <form onSubmit={handleSaveCellAssignment} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Subject Text:</label>
                <input type="text" required placeholder="e.g. DATA STRUCTURES (DSA)" value={cellSubjectInput} onChange={(e) => setCellSubjectInput(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Assign Faculty Instructor:</label>
                <input type="text" required placeholder="e.g. RAMESH SIR" value={cellFacultyInput} onChange={(e) => setCellFacultyInput(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="submit" style={{ flex: 1, backgroundColor: "#be123c", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Commit Box</button>
                <button type="button" onClick={() => setIsAssignModalOpen(false)} style={{ flex: 1, backgroundColor: "#f1f5f9", color: "#475569", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Dismiss</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL OVERLAYS: BROADCAST GENERATOR FORM ================= */}
      {isBroadcastModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px", width: "100%", maxWidth: "500px" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#0f172a", fontSize: "18px", fontWeight: "800" }}>Dispatch Campus-Wide Announcement Circular</h3>
            <form onSubmit={handleCreateNotificationSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Circular Topic Header:</label>
                <input type="text" required placeholder="e.g. ANNUAL TECH FEST INSTRUCTIONS" value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Severity Tier:</label>
                  <select value={notifComplexity} onChange={(e) => setNotifComplexity(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                    <option value="Casual">Casual Informative</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Emergency">🚨 Critical Emergency</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Target Recipient Scope:</label>
                  <select value={notifAttendScope} onChange={(e) => setNotifAttendScope(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white" }}>
                    <option value="Everyone">Everyone (All Tiers)</option>
                    <option value="Faculty Only">Faculty Sub-Group</option>
                    <option value="HODs">Department HODs Only</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>📍 Venue / Meeting Place Location:</label>
                <input type="text" required placeholder="e.g. SEMINAR HALL BLOCK 3" value={notifPlace} onChange={(e) => setNotifPlace(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Calendar Date:</label>
                  <input type="date" value={notifDate} onChange={(e) => setNotifDate(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Execution Time Stamp:</label>
                  <input type="time" value={notifTime} onChange={(e) => setNotifTime(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="submit" style={{ flex: 1, backgroundColor: "#be123c", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Publish Circular</button>
                <button type="button" onClick={() => setIsBroadcastModalOpen(false)} style={{ flex: 1, backgroundColor: "#f1f5f9", color: "#475569", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer" }}>Dismiss</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;