import React from "react";
import logo from "../assets/lg.png"; // ensure this path is correct

function QRPage() {
  return (
    <div
      style={{
        backgroundColor: "#263b5e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      {/* Top Logos */}
      <img
        src={logo}
        alt="Cybersquare Logo"
        style={{
          width: "130px",
          marginBottom: "20px",
        }}
      />

      {/* Heading */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          textTransform: "uppercase",
          marginBottom: "10px",
          color: "#ffd33d",
        }}
      >
        Scan to Register
      </h1>

      
      {/* Mobile-like card area */}
      <div
        style={{
          backgroundColor: "white",
          width: "270px",
          borderRadius: "25px",
          padding: "30px 20px",
          textAlign: "center",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
          color: "#000",
          height:"270px"
        }}
      >
        <h2 style={{ marginBottom: "15px", fontWeight: 700 }}>
          Student Registration
        </h2>

        <img
          src="http://127.0.0.1:8000/qr/"
          alt="Student Registration QR"
          style={{
            width: "240px",
            height: "240px",
            marginBottom: "20px",
          }}
        />

      </div>
    </div>
  );
}

export default QRPage;
