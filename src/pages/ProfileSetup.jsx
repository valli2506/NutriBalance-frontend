import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Profile.css";

function ProfileSetup(){

const navigate = useNavigate();

const [data,setData] = useState({
  name:"",
  age:"",
  weight:"",
  height:"",
  country:"",
  goal:"",
  health:""
});

const handleChange = (e)=>{
  setData({...data,[e.target.name]:e.target.value});
};

const handleSubmit = ()=>{
  // simple validation
  if(!data.name || !data.age || !data.weight || !data.height){
    alert("Please fill all required fields ⚠️");
    return;
  }

  localStorage.setItem("userProfile", JSON.stringify(data));
  navigate("/dashboard");
};

return(

<div className="profile-page">

<h1>Complete Your Profile 🧑‍⚕️</h1>

<div className="form">

<input name="name" placeholder="Full Name" onChange={handleChange}/>
<input name="age" placeholder="Age" type="number" onChange={handleChange}/>
<input name="weight" placeholder="Weight (kg)" type="number" onChange={handleChange}/>
<input name="height" placeholder="Height (cm)" type="number" onChange={handleChange}/>

<select name="country" onChange={handleChange}>
<option value="">🌍 Select Country</option>
<option>India</option>
<option>USA</option>
<option>UK</option>
<option>Canada</option>
<option>Australia</option>
<option>Germany</option>
<option>France</option>
<option>Japan</option>
<option>China</option>
<option>Brazil</option>
<option>South Korea</option>
<option>Italy</option>
<option>Spain</option>
</select>

<select name="goal" onChange={handleChange}>
<option value="">🎯 Select Goal</option>
<option>Weight Loss</option>
<option>Weight Gain</option>
<option>Maintain Fitness</option>
<option>Muscle Building</option>
<option>Improve Nutrition</option>
<option>Healthy Lifestyle</option>
<option>Fat Loss</option>
<option>Increase Energy</option>
</select>

<select name="health" onChange={handleChange}>
<option value="">🏥 Health Condition</option>
<option>None</option>
<option>Diabetes</option>
<option>Anemia</option>
<option>Obesity</option>
<option>Hypertension</option>
<option>Thyroid</option>
<option>PCOS</option>
<option>Heart Disease</option>
<option>Vitamin Deficiency</option>
<option>High Cholesterol</option>
<option>Digestive Issues</option>
</select>

{/* BUTTONS */}
<div style={{display:"flex", gap:"10px"}}>

<button onClick={handleSubmit}>
  ✅ Done
</button>

<button onClick={() => navigate("/dashboard")}>
  ⏭ Skip
</button>

</div>

</div>

</div>

);

}

export default ProfileSetup;