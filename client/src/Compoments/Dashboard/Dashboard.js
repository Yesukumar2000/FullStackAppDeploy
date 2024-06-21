import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });
  let navigate = useNavigate();
  let dataToSend = new FormData();
  dataToSend.append("email", storeObj.reducer.userDetails.email);

  let deleteAccount = async () => {
    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };
    let JSONData = await fetch("/deleteAccount", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    if (JSOData.status === "success") {
      navigate("/signup");
    }
  };
  return (
    <>
      <div className="dashboard-container">
        <TopNavigation />
        <h1>Dashboard</h1>
        <h2>
          Welcome {storeObj.reducer.userDetails.firstName}{" "}
          {storeObj.reducer.userDetails.lastName}
        </h2>
        <img
          src={`/${storeObj.reducer.userDetails.profilePic}`}
          alt="Profile"
          className="profile-img"
        />
        <button className="delete-btn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  );
}

export default Dashboard;
