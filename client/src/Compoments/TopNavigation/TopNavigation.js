import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import './TopNavigation.css';

function TopNavigation() {
  
  let storeObj=useSelector((store)=>{
    return store
  })
  let navigate = useNavigate();
  useEffect(()=>{
    if(storeObj && storeObj.reducer.userDetails && storeObj.reducer.userDetails.email){
      // navigate("/dashboard");
    }else{
      navigate("/");
    }
  }, [storeObj, navigate]);
  return (
    <>
    <nav className="top-nav">
      <Link to="/dashboard" className="nav-link">DashBoard</Link>
      <Link to="/tasks" className="nav-link">Tasks</Link>
      <Link to="/editprofile" className="nav-link">EditProfile</Link>
      <Link to="/" className="nav-link">LogOut</Link>
    </nav>
  </>
  );
}

export default TopNavigation;
