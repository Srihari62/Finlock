import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Welcome from "../Welcome";
import Footer from "../Footer";
import "./index.css";
const Register = () => {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5009/register", data)
      .then((res) => {
        setMsg(res.data);
        setData({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => setMsg(err));
  };
  return (
    <div>
      <center>
        <Welcome />
        <p className="para">
          Let's Connect to your workspace. <br /> Please create an account to
          continue
        </p>
        <div className="form-container">
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="inputBox">
              <input
                className="input"
                required="required"
                type="text"
                onChange={changeHandler}
                name="username"
              />
              <br />
              <span className="span">Username</span>
            </div>
            <div className="inputBox">
              <input
                className="input"
                required="required"
                type="email"
                onChange={changeHandler}
                name="email"
              />
              <br />
              <span className="span">Email</span>
            </div>
            <div className="inputBox">
              <input
                className="input"
                required="required"
                type="password"
                onChange={changeHandler}
                name="password"
              />
              <br />
              <span className="span">Password</span>
            </div>
            <div className="link">
              <Link to="/login">Already a user?</Link>
            </div>{" "}
            <br />
            <p className="message">{msg}</p>
            <button
                type="button"
                className={`button ${isLoading ? "button--loading" : ""}`}
                onClick={submitHandler}
              >
                <span className="button__text">Register</span>
              </button>
          </form>
        </div>
        <Footer />
      </center>
    </div>
  );
};

export default Register;
