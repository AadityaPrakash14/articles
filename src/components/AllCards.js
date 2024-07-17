import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import ArticleContext from "../context/article/ArticleContext";

const AllCards = () => {
  const context = useContext(ArticleContext);
  //   console.log("This is ", context);

  const { allArticle, getAllArticle, search, searchArticles } = context;

  const [cardEle, setCardEle] = useState([]);
  useEffect(() => {
    getAllArticle();
    // console.log("Called jere");
    // console.log(allArticle);

    let cards = [];
    let searchedArticle = searchArticles(allArticle);
    // console.log(searchedArticle);
    console.log(search);

    cards = searchedArticle.map((article) => (
      <div
        key={article._id}
        className="col col-lg-auto col-md-auto col-sm-auto"
      >
        <Card
          title={article.title}
          aText={article.aText}
          id={article._id}
          url={"/" + article._id}
          authname={article.authName}
        />
      </div>
    ));
    // console.log(allArticle);

    setCardEle(
      <div className="container">
        <div className="row">{cards}</div>
      </div>
    );
  }, [search, allArticle.length]);

  return (
    <>
      <h1 className="text-center pageHeading mb-4">All Articles</h1>
      {cardEle}
    </>
  );
};

export default AllCards;
