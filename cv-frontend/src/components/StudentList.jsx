import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./StudentList.css";
import logo from "../assets/lg.png";

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch students data
  useEffect(() => {
    API.get("/auth/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/hrlogin"); // redirect to login page
  };

  // Optional: get username/email from token if needed
  const username = "HR"; // you can parse JWT here if you want dynamic username

  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div>
          <img src={logo} alt="Cybersquare Logo" className="logo" />
        </div>
        <div>
          <h1>Students Details Portal</h1>
        </div>
        <div className="profile-section">
          <span className="username">{username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="page-container">
        {students.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
            No student data available
          </p>
        ) : (
          <div className="students-wrapper">
            {students.map((student) => (
              <div key={student.id} className="student-card">
                <img
                  src={`http://localhost:8000${student.photo}`}
                  alt={student.name}
                  className="student-photo"
                />
                <h2 className="student-name">{student.name}</h2>
                <p className="student-info">
                  <strong>Email:</strong> {student.email}
                </p>
                <p className="student-info">
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p className="student-info">
                  <strong>Course:</strong> {student.course}
                </p>

                <div className="cv-buttons">
                  <a
                    href={`http://localhost:8000${student.cv}`}
                    target="_blank"
                    rel="noreferrer"
                    className="cv-button view-btn"
                  >
                    📄 View CV
                  </a>

                  <a
                    href={`http://localhost:8000${student.cv}`}
                    download
                    className="cv-button download-btn"
                  >
                    ⬇ Download CV
                  </a>

                  <a
                    href={`http://localhost:8000${student.photo}`}
                    download
                    className="cv-button photo-btn"
                  >
                    🖼 Download Photo
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default StudentList;
