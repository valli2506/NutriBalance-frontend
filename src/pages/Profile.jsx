import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile.css";

function Profile() {

  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");

    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleNext = () => {
    const confirmMove = window.confirm("Go to Dashboard?");
    if (confirmMove) {
      navigate("/dashboard");
    }
  };

  const username = localStorage.getItem("username");

  return (
    <div className="profile-page">

      <h1>Your Profile 👤</h1>

      {/* ✅ IF DATA EXISTS */}
      {data ? (
        <div className="form">

          <p><b>Name:</b> {data.name}</p>
          <p><b>Age:</b> {data.age}</p>
          <p><b>Weight:</b> {data.weight} kg</p>
          <p><b>Height:</b> {data.height} cm</p>
          <p><b>Country:</b> {data.country}</p>
          <p><b>Goal:</b> {data.goal}</p>
          <p><b>Health Issue:</b> {data.health}</p>

          {/* BUTTONS */}
          <div className="profile-buttons">

            <button onClick={() => navigate("/profile-setup")}>
              ✏ Edit
            </button>

            <button onClick={handleNext}>
              ➡ Next
            </button>

            <button onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}>
              🚪 Logout
            </button>

          </div>

        </div>

      ) : (

        /* ❗ IF NO DATA */
        <div className="form">
          <p><b>Username:</b> {username}</p>
          <p style={{color:"red"}}>No profile data found ⚠️</p>

          <button onClick={() => navigate("/profile-setup")}>
            ➕ Setup Profile
          </button>
        </div>

      )}

    </div>
  );
}

export default Profile;