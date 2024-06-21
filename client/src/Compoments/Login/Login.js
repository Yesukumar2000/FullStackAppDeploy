import React, { useEffect, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = "";
    if (localStorage.getItem("token")) {
      validateToken();
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
    }
  });

  let validateToken = async () => {
    let dataToSend = new FormData();
    dataToSend.append("token", localStorage.getItem("token"));
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/validateToken", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    if (JSOData.status === "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
  };

  let validateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let response = await axios.post("/login", dataToSend);
    console.log(response);

    if (response.data.status === "success") {
      localStorage.setItem("token", response.data.data.token);
      dispatch({ type: "login", data: response.data.data });
      navigate("/dashboard");
    } else {
      alert(response.data.msg);
    }
    // let reqOptions ={
    //   method:"POST",
    //   body:dataToSend,
    // }
    // let JSONData= await fetch("/login",reqOptions);
    // let JSOData = await JSONData.json();
    // console.log(JSOData);
    // if(JSOData.status === "success"){
    //   localStorage.setItem("token",JSOData.data.token);

    //   dispatch({type:"login",data:JSOData.data});
    //   navigate("/dashboard");
    // }else{
    //   alert(JSOData.msg);
    // }
  };
  let validateLogin2 = () => {
    console.log("ValidateLogin2");
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };
      let JSONData = await fetch("/login", reqOptions);
      let JSOData = await JSONData.json();
      console.log(JSOData);
      if (JSOData.status === "success") {
        localStorage.setItem("token", JSOData.data.token);

        dispatch({ type: "login", data: JSOData.data });
        navigate("/dashboard");
      } else {
        alert(JSOData.msg);
      }
    };
  };
  return (
    <div className="container">
      <form>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="text" placeholder="Password" />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              validateLogin();
              dispatch(validateLogin2());
            }}>
            Login
          </button>
        </div>
      </form>
      <div className="Link">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
