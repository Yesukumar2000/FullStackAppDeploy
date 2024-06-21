import React, { useEffect, useRef, useState } from "react";
import "./EditProfile.css";
import TopNavigation from "../TopNavigation/TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let storeObj = useSelector((store) => {
    return store;
  });
  useEffect(() => {
    firstNameInputRef.current.value = storeObj.reducer.userDetails.firstName;
    lastNameInputRef.current.value = storeObj.reducer.userDetails.lastName;
    ageInputRef.current.value = storeObj.reducer.userDetails.age;
    emailInputRef.current.value = storeObj.reducer.userDetails.email;
    mobileNoInputRef.current.value = storeObj.reducer.userDetails.mobileNo;
    setProfilePic(`/${storeObj.reducer.userDetails.profilePic}`);
  }, [storeObj]);
  let [profilePic, setProfilePic] = useState("./images/noimagepic.png");

  let updateProfile = async () => {
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
      method: "PUT",
      body: dataToSend,
    };
    let JSONData = await fetch("/updateUserDetails", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <>
      <div>
        <TopNavigation />
        <form>
          <h2>Edit Profile</h2>
          <div>
            <label>Frist Name</label>
            <input
              ref={firstNameInputRef}
              type="text"
              placeholder="Fristname"></input>
          </div>
          <div>
            <label>Last Name</label>
            <input
              ref={lastNameInputRef}
              type="text"
              placeholder="Surname"></input>
          </div>
          <div>
            <label>Age</label>
            <input ref={ageInputRef} type="number" placeholder="Age"></input>
          </div>
          <div>
            <label>Email (ReadOnly)</label>
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Email"
              readOnly
            />
          </div>
          <div>
            <label>Password</label>
            <input
              ref={passwordInputRef}
              type="text"
              placeholder="password"></input>
          </div>
          <div>
            <label>Mobile No</label>
            <input
              ref={mobileNoInputRef}
              type="number"
              placeholder="9100000000"></input>
          </div>
          <div>
            <label>Profile Pic(file size limit-225kb only)</label>
            <input
              ref={profilePicInputRef}
              type="file"
              placeholder="path"
              onChange={(eo) => {
                let selectedPicPath = URL.createObjectURL(eo.target.files[0]);
                setProfilePic(selectedPicPath);
              }}></input>
            <br></br>
            <br></br>
            <img src={profilePic} className="profilePic" alt="profile" />
          </div>
          <div>
            <div>
              <button
                type="button"
                onClick={() => {
                  updateProfile();
                }}>
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
