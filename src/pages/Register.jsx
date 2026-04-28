import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  // 🔥 Generate OTP
  const sendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowOtpBox(true);

    alert("OTP (for demo): " + newOtp); // 👈 simulate email
  };

  // 🔥 Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("✅ Registered Successfully");

      // Save user (simulate DB)
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      window.location.href = "/login";
    } else {
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!showOtpBox && (
        <button onClick={sendOtp}>Send OTP</button>
      )}

      {showOtpBox && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={verifyOtp}>Verify & Register</button>
        </>
      )}
    </div>
  );
}

export default Register;