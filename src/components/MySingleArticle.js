import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ArticleContext from "../context/article/ArticleContext";

const SingleArticle = () => {
  const context = useContext(ArticleContext);
  const [delAlert, setDelAlert] = useState("");
  const [retLike, setRetLike] = useState({ isLiked: true, num: 0 });

  //   console.log("This is ", context);
  const navigate = useNavigate();
  const {
    getSingleArticle,
    singleArticle,
    uname,
    deleteArticle,
    checkAuthentic,
    addRemLikes,
    getArticleLikes,
  } = context;

  const { singleArticleId } = useParams();

  const deleteOne = () => {
    deleteArticle(singleArticleId);

    setDelAlert(
      <div class="alert alert-danger my-3" role="alert">
        <b>Deleted Successfully</b>
      </div>
    );
    setTimeout(() => {
      setDelAlert("");
      navigate(`/myArticle/${uname}`);
    }, 1500);
  };
  const flip = async () => {
    // console.log(like);

    const data = await addRemLikes(singleArticleId);
    // console.log(data);

    setRetLike(data);
  };
  useEffect(() => {
    getSingleArticle(singleArticleId);
  }, []);

  useEffect(() => {
    checkAuthentic().then((success) => {
      console.log(success);
      if (!success) {
        console.log("not authenticated");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    getArticleLikes(singleArticleId).then((data) => {
      // console.log(data);

      setRetLike(data);
    });
    // console.log(articleLikes);
    // console.log(singleArticleId);
  }, []);

  return singleArticle ? (
    <>
      <div className="container">
        {delAlert}

        <h1 className="text-center mt-5" style={{ color: "red" }}>
          {singleArticle.title}
        </h1>
        <p className="articleText mt-4" style={{ color: "black" }}>
          {singleArticle.aText}
        </p>
        <br />
        <div className="authName" style={{ color: "black" }}>
          Author Name :- <b> {singleArticle.authName}</b>
        </div>

        <div className="text-center mt-4">
          {retLike.isLiked ? (
            <i
              class="fa-solid fa-heart likeIcon"
              onClick={flip}
              style={{ color: "#f40b2e" }}
            ></i>
          ) : (
            <i
              class="fa-regular fa-heart likeIcon"
              onClick={flip}
              style={{ color: "#050505" }}
            ></i>
          )}
          <span className="likeText">{retLike.num}</span>
        </div>

        <p className="text-center mt-4">
          <button
            type="button"
            onClick={deleteOne}
            className="btn btn-danger buttonSt"
          >
            Delete Article
          </button>
        </p>
        <br />

        <p className="text-center">
          <button type="button" className="btn btn-success buttonSt">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/myArticle/${uname}`}
            >
              My Articles
            </Link>
          </button>
        </p>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-center">
        No such Article with the id :- {singleArticleId} Exists.
        <Link to={`/myArticle/${uname}`}>My Articles</Link>
      </h1>
    </>
  );
};

export default SingleArticle;
