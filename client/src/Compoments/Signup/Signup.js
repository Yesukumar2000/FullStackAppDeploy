import React, { useRef, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePic, setProfilePic] = useState("./images/noimagepic.png");

  let onSignupUsingFD = async () => {
    let dataToSend = new FormData();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="container">
      <form>
        <h2>Employee Form</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef} type="text" placeholder="First name" />
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef} type="text" placeholder="Surname" />
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef} type="number" placeholder="Age" />
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="text" placeholder="Password" />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            ref={mobileNoInputRef}
            type="number"
            placeholder="9100000000"
          />
        </div>
        <div>
          <label>Profile Pic (file size limit - 225kb only)</label>
          <input
            ref={profilePicInputRef}
            type="file"
            onChange={(eo) => {
              let selectedPicPath = URL.createObjectURL(eo.target.files[0]);
              setProfilePic(selectedPicPath);
            }}
          />
          <br />
          <br />
          <img src={profilePic} className="profilePic" alt="profile" />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignupUsingFD();
              navigate("/");
            }}>
            Sign Up
          </button>
        </div>
      </form>
      <div className="Link">
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
