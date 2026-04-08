import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    country: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {

    if (!form.username || !form.password) {
      alert("Fill required fields ⚠️");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.text();

      if (result.includes("success")) {

        // 🔥 STORE USER
        localStorage.setItem("username", form.username);

        // 🔥 GO TO PROFILE
        navigate("/profile");

      } else {
        alert(result);
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">
        <h1>NutriBalance</h1>
      </div>

      <div className="auth-right">

        <div className="auth-form">

          <h2>Create Account</h2>

          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="age" placeholder="Age" onChange={handleChange} />

          <select name="country" onChange={handleChange}>
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
          </select>

          <button onClick={handleSignup}>Create Account</button>

        </div>

      </div>

    </div>
  );
}

export default Signup;