import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

export default function NewArticle() {
  const context = useContext(ArticleContext);
  //   console.log("This is ", context);

  const [addAlert, setAddAlert] = useState("");
  const navigate = useNavigate();
  const { checkAuthentic } = context;
  useEffect(() => {
    checkAuthentic().then((success) => {
      console.log(success);
      if (!success) {
        console.log("not authenticated");
        navigate("/login");
      }
    });
  }, []);

  const [data, setData] = React.useState({
    newTitle: "",
    newArticleText: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        title: data.newTitle,
        aText: data.newArticleText,
      })
    );
    const token = localStorage.getItem("authtoken");
    const response = await fetch("http://localhost:5000/api/addArticle", {
      method: "POST",
      headers: {
        "content-type": "Application/JSON",
        "auth-token": token,
      },
      body: JSON.stringify({
        title: data.newTitle,
        aText: data.newArticleText,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      setAddAlert(
        <div class="alert alert-success my-3" role="alert">
          <b>Successfully Added</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
        navigate("/");
      }, 1500);
    } else if (json.invalidEntry) {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Invalid Entries: Enter minimum 3 character</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 1500);
    } else {
      setAddAlert(
        <div class="alert alert-danger my-3" role="alert">
          <b>Internal Server Error</b>
        </div>
      );
      setTimeout(() => {
        setAddAlert("");
      }, 1500);
      // alert("Some Error Occured");
    }
  };

  const onChange = (e) => {
    console.log(data);

    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        {addAlert}
        <h1 className="text-center pageHeading my-4">Add New Articles</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newTitle" className="form-label my-3">
              Enter Title :{" "}
            </label>
            <input
              type="text"
              name="newTitle"
              className="form-control"
              id="newTitle"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newArticleText" className="form-label my-3">
              Example textarea
            </label>
            <textarea
              name="newArticleText"
              className="form-control"
              id="newArticleText"
              rows={7}
              onChange={onChange}
            ></textarea>

            <button type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
