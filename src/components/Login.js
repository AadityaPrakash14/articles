import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

export const Login = () => {
  const context = useContext(ArticleContext);
  const { getUser, setUname } = context;
  const [addAlert, setAddAlert] = useState("");

  const [credentials, setcredentials] = React.useState({
    lemail: "",
    lpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     email: credentials.lemail,
    //     password: credentials.lpassword,
    //   })
    // );

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
      },
      body: JSON.stringify({
        email: credentials.lemail,
        password: credentials.lpassword,
      }),
    });
    const json = await response.json();
    // console.log(json);

    if (json.success) {
      let username = credentials.lemail.split("@")[0];
      setUname(username);
      setcredentials({
        lemail: "",
        lpassword: "",
      });
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
    } else {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Incorrect Credientials</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 1500);
      // alert("Incorrect Credientials");
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
        <h1 className="my-5 text-center" style={{ color: "black" }}>
          Welcome To Content Management System's Login Page
        </h1>
        <form onSubmit={handleSubmit} className="formAuth">
          <div className="form-group mt-5 col-lg-4 formInput">
            <label htmlFor="lemail">Email Address :- </label>
            <input
              type="email"
              className="form-control my-1"
              id="lemail"
              name="lemail"
              value={credentials.lemail}
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group my-3 mt-5 col-lg-4 formInput">
            <label htmlFor="lpassword">Password :-</label>
            <input
              type="password"
              className="form-control my-1"
              id="lpassword"
              name="lpassword"
              value={credentials.lpassword}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <p className="text-center mt-4">
            <button type="submit" className="btn btn-primary my-3 buttonSt">
              Login
            </button>
          </p>
        </form>
        <p className="text-center my-3">
          <Link style={{ color: "blue", fontSize: "18px" }} to={`/signup`}>
            Sign Up?
          </Link>
        </p>
      </div>
    </>
  );
};
