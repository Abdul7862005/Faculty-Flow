import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  
  // Track which view the user is looking at: 'selection', 'faculty', 'admin', or 'hod'
  const [activeView, setActiveView] = useState("selection");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state to prevent freeze indicators

  const handleLoginSubmit = async (e, roleType) => {
    e.preventDefault();
    setLoading(true); // Start loading animation / disable button
    
    console.log("Attempting login connection to backend for:", roleType);

    try {
      // Determine backend URL based on environment
      const backendURL = window.location.hostname === 'localhost' 
        ? 'http://localhost:5001' 
        : 'https://faculty-flow-backend.onrender.com';
      
      const response = await axios.post(`${backendURL}/api/auth/login`, {
        email: username,
        password: password,
        role: roleType
      });

      console.log("Backend Response Raw Data:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", roleType);
        localStorage.setItem("userName", response.data.name || "Academic User");
        
        alert(`Authentication Successful! Welcome back.`);
        
        // Dynamic Role-Based Routing Update
        if (roleType === "admin") {
          navigate("/admin-dashboard");
        } else if (roleType === "hod") {
          navigate("/hod-dashboard");
        } else {
          navigate("/faculty-dashboard");
        }
      } else {
        alert("Server responded, but failed to generate an authentication token.");
      }
    } catch (error) {
      console.error(`${roleType} login system error context:`, error);
      
      if (!error.response) {
        // FIXED: Updated error string to mention port 5001 
        alert("Network Error: Cannot connect to the backend server. Make sure 'node server.js' is running on port 5001.");
      } else {
        alert(error.response?.data?.message || `Failed authentication for ${roleType}.`);
      }
    } finally {
      setLoading(false); // Stop loading state regardless of outcome
    }
  };

  // Inline Common Styles to match the light blue premium background theme
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#e2ecf8",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const mainHeadingStyle = {
    fontSize: "46px",
    fontWeight: "300",
    color: "#2c3e50",
    letterSpacing: "2px",
    marginTop: "60px",
    textAlign: "center"
  };

  const cardContainerStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    padding: "40px",
    width: "100%",
    boxSizing: "border-box"
  };

  const footerStyle = {
    marginBottom: "20px",
    fontSize: "13px",
    color: "#7f8c8d",
    textAlign: "center"
  };

  const btnStyle = {
    backgroundColor: "#1b4f72",
    color: "#ffffff",
    border: "none",
    padding: "10px 40px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "uppercase"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ecf0f1",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none"
  };

  // --- VIEW 1: THE THREE SELECTION CARDS ---
  if (activeView === "selection") {
    return (
      <div style={containerStyle}>
        <h1 style={mainHeadingStyle}>FACULTY FLOW </h1>
        
        <div style={{ maxWidth: "1100px", width: "100%", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px", boxSizing: "border-box" }}>
          
          {/* Faculty Card */}
          <div style={{ ...cardContainerStyle, textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>👴</div>
            <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", fontWeight: "600" }}>FACULTY DASHBOARD</h3>
            <p style={{ color: "#7f8c8d", fontSize: "14px", lineHeight: "1.6", minHeight: "70px", margin: "0 0 25px 0" }}>
              Access your personal academic dashboard, manage classes, and view student progress.
            </p>
            <button style={btnStyle} onClick={() => { setActiveView("faculty"); setUsername(""); setPassword(""); }}>Login</button>
          </div>

          {/* Admin Card */}
          <div style={{ ...cardContainerStyle, textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>⚙️</div>
            <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", fontWeight: "600" }}>ADMIN FLOW</h3>
            <p style={{ color: "#7f8c8d", fontSize: "14px", lineHeight: "1.6", minHeight: "70px", margin: "0 0 25px 0" }}>
              Administer system settings, manage users, and configure global parameters.
            </p>
            <button style={btnStyle} onClick={() => { setActiveView("admin"); setUsername(""); setPassword(""); }}>Login</button>
          </div>

          {/* HOD Card */}
          <div style={{ ...cardContainerStyle, textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>👨‍💼</div>
            <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", fontWeight: "600" }}>HOD DASHBOARD</h3>
            <p style={{ color: "#7f8c8d", fontSize: "14px", lineHeight: "1.6", minHeight: "70px", margin: "0 0 25px 0" }}>
              Head of Department portal. Oversee department-wide performance and make key approvals.
            </p>
            <button style={btnStyle} onClick={() => { setActiveView("hod"); setUsername(""); setPassword(""); }}>Login</button>
          </div>

        </div>

        <div style={footerStyle}>
          © 2026 Faculty Flow Project - All Rights Reserved | <span style={{cursor:"pointer"}}>Help</span> | <span style={{cursor:"pointer"}}>Privacy</span>
        </div>
      </div>
    );
  }

  // --- VIEW 2: INDIVIDUAL PORTAL SIGN IN FORMS (FACULTY, ADMIN, HOD) ---
  const config = {
    faculty: { title: "SIGN IN TO FACULTY DASHBOARD", cardTitle: "SIGN IN TO FACULTY DASHBOARD", icon: "👴" },
    admin: { title: "SIGN IN TO ADMIN FLOW", cardTitle: "SIGN IN TO ADMIN FLOW", icon: "⚙️" },
    hod: { title: "SIGN IN TO HOD DASHBOARD", cardTitle: "SIGN IN TO HOD DASHBOARD", icon: "👨‍💼" }
  };

  const currentPortal = config[activeView];

  return (
    <div style={containerStyle}>
      <div style={{ width: "100%", position: "relative" }}>
        <button 
          onClick={() => setActiveView("selection")} 
          disabled={loading}
          style={{ position: "absolute", left: "40px", top: "40px", background: "none", border: "none", color: "#2c3e50", fontSize: "16px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}
        >
          ← Back
        </button>
        <h1 style={mainHeadingStyle}>{currentPortal.title}</h1>
      </div>

      <div style={{ maxWidth: "650px", width: "100%", padding: "0 20px", boxSizing: "border-box" }}>
        <div style={{ ...cardContainerStyle, padding: "50px 40px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "35px" }}>
            <span style={{ fontSize: "28px" }}>{currentPortal.icon}</span>
            <h2 style={{ margin: 0, fontSize: "22px", color: "#34495e", fontWeight: "600", letterSpacing: "1px" }}>{currentPortal.cardTitle}</h2>
          </div>

          <form onSubmit={(e) => handleLoginSubmit(e, activeView)}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#2c3e50", fontWeight: "600" }}>Username</label>
              <input 
                type="email" 
                placeholder="Enter username"
                required 
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#2c3e50", fontWeight: "600" }}>Password</label>
              <input 
                type="password" 
                placeholder="Enter password"
                required 
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ ...btnStyle, width: "100%", padding: "12px", backgroundColor: loading ? "#7f8c8d" : "#1b4f72", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "AUTHENTICATING..." : "LOG IN"}
            </button>
          </form>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "13px", color: "#7f8c8d" }}>
            <span style={{ cursor: "pointer" }}>Forgot username or password?</span>
            <span style={{ cursor: "pointer", color: "#1b4f72", fontWeight: "600" }}>Create an account</span>
          </div>
        </div>
      </div>

      <div style={footerStyle}>
        © 2026 Faculty Flow Project - All Rights Reserved | <span style={{cursor:"pointer"}}>Help</span> | <span style={{cursor:"pointer"}}>Privacy</span>
      </div>
    </div>
  );
}

export default Login;