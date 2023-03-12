import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { store } from "../../App";
import { Redirect } from "react-router";
import Welcome from "../Welcome";
import Footer from "../Footer";
import "./index.css";

const Login = () => {
  const [token, setToken] = useContext(store);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5009/login", data)
      .then((res) => {
        setToken(res.data.token);
        setMsg(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(!isLoading);

  };
  if (token) {
    return <Redirect to="/myprofile" />;
  }
  return (
    <div>
      {!token && (
        <center>
          <Welcome />
          <div className="form-container">
            <form onSubmit={submitHandler} autoComplete="off">
              <p className="para">
                Let's Connect to your workspace. <br /> Please enter your email
                and password.
              </p>
              <div className="inputBox">
                <input
                  className="input"
                  required="required"
                  type="email"
                  onChange={changeHandler}
                  name="email"
                />
                <span className="span">Email</span>
              </div>
              <br />
              <div className="inputBox">
                <input
                  className="input"
                  required="required"
                  type="password"
                  onChange={changeHandler}
                  name="password"
                />
                <span className="span">Password</span>
              </div>
              <br />
              <div className="link">
                <Link to="/register">Dont have an account?</Link>
              </div>{" "}
              <br />
              <p className="message">{msg}</p>
              <button
                type="button"
                className={`button ${isLoading ? "button--loading" : ""}`}
                onClick={submitHandler}
              >
                <span className="button__text">Signin</span>
              </button>
              <br />
            </form>
          </div>
          <Footer />
        </center>
      )}
    </div>
  );
};

export default Login;
