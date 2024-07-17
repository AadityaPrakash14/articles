import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

export const Signup = () => {
  const context = useContext(ArticleContext);
  const { getUser, setUname } = context;
  const [addAlert, setAddAlert] = useState("");

  const [credentials, setcredentials] = React.useState({
    sname: "",
    semail: "",
    spassword: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.spassword !== credentials.cpassword) {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Password and C-Password donot match.</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 1500);
      // alert("Password and C-Password donot match.");
      return;
    }

    let mail = credentials.semail;
    mail = mail.split("@");
    if (mail[0].length === 0 || mail[1] !== "gmail.com") {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Please use gmail account to signup!</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 3500);
      // alert("Password and C-Password donot match.");
      return;
    }

    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
      },
      body: JSON.stringify({
        name: credentials.sname,
        email: credentials.semail,
        password: credentials.spassword,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      let username = credentials.semail.split("@")[0];
      setUname(username);
      localStorage.setItem("authtoken", json.authtoken);
      getUser();
      setAddAlert(
        <div class="alert alert-success my-3" role="alert">
          <b>Welcome {username}</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
        navigate("/");
      }, 1500);
    } else if (json.invalidEntry) {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Invalid Entry: Min length of name and password must be 3 and 5</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 4500);
      // alert("This email has been already used, Try Another!");
    } else if (json.mailUsed) {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>This mail has been used try another!</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 2500);
    } else {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Internal Server Error! Try Again Later</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 1500);
    }
  };

  const onChange = (e) => {
    // console.log([e.target.name]);

    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        {addAlert}
        <h1 className="my-5 text-center">Signup using Gmail Account</h1>
        <form onSubmit={handleSubmit} className="formAuth">
          <div className="form-group mt-5 col-lg-4 formInput">
            <label htmlFor="sname">Enter Name :- </label>
            <input
              type="text"
              className="form-control my-1"
              id="sname"
              name="sname"
              value={credentials.sname}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group my-3 mt-4 col-lg-4 formInput">
            <label htmlFor="semail">Email Address :- </label>
            <input
              type="email"
              className="form-control my-1"
              id="semail"
              name="semail"
              value={credentials.semail}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group my-3 mt-4 col-lg-4 formInput">
            <label htmlFor="spassword">Password :-</label>
            <input
              type="password"
              className="form-control my-1"
              id="spassword"
              name="spassword"
              value={credentials.spassword}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="form-group my-3 mt-4 col-lg-4 formInput">
            <label htmlFor="cpassword">Confirm Password :-</label>
            <input
              type="password"
              className="form-control my-1"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              placeholder="Confirm Password"
            />
          </div>
          <p className="text-center mt-4">
            <button type="submit" className="btn btn-primary my-3 buttonSt">
              Sign Up
            </button>
          </p>
        </form>
        <p className="text-center my-3 mb-5">
          <Link style={{ color: "blue", fontSize: "18px" }} to={`/login`}>
            Go to Login
          </Link>
        </p>
      </div>
    </>
  );
};
