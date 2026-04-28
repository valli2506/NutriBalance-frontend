import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");   // 🔥 email instead of username
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);

  
  const sendOtp = () => {

    if (!email || !password) {
      alert("Enter email & password first ❗");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(newOtp);
    setShowOtpBox(true);

    alert("OTP (demo): " + newOtp); // simulate email
  };

  // 🔥 STEP 2: VERIFY OTP → THEN LOGIN API
  const verifyAndLogin = async () => {

    if (otp !== generatedOtp) {
      alert("Invalid OTP ❌");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email.trim(),   // ✅ still sending as username
          password: password
        })
      });

      const result = await response.text();

      if (result.includes("successful")) {

        localStorage.setItem("username", email);

        navigate("/dashboard");

      } else {
        alert("Invalid credentials ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">
        <h1>Welcome Back 👋</h1>
        <p className="tagline">
          Continue your journey towards a healthier life
        </p>

        <div className="features">
          <div className="feature">📊 Track your daily nutrition progress</div>
          <div className="feature">🥗 Maintain a balanced diet</div>
          <div className="feature">🤖 Get AI-powered health insights</div>
          <div className="feature">❤️ Improve your lifestyle habits</div>
        </div>
      </div>

      <div className="auth-right">

        <div className="auth-form">

          <h2>Login to Your Account</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 🔥 STEP 1 BUTTON */}
          {!showOtpBox && (
            <button onClick={sendOtp}>Send OTP</button>
          )}

          {/* 🔥 STEP 2 OTP BOX */}
          {showOtpBox && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />

              <button onClick={verifyAndLogin}>
                Verify & Login
              </button>
            </>
          )}

          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;