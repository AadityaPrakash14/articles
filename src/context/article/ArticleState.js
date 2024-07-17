import { useState } from "react";
import ArticleContext from "./ArticleContext";

const ArticleState = (props) => {
  const host = "http://localhost:5000";
  let authtoken = localStorage.getItem("authtoken");

  const [allArticle, setAllArticle] = useState([]);
  const [user, setuser] = useState({});
  const [uname, setUname] = useState("username");
  const [userArticle, setUserArticle] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [search, setSearch] = useState({ text: "", by: "heading" });
  const [articleLikes, setArticleLikes] = useState([]);

  const getAllArticle = async () => {
    const response = await fetch(`${host}/api/allArticle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setAllArticle(json.allArticle);
    }
  };

  const searchArticles = (articles) => {
    let searchedArticles = [];
    if (search.by === "heading") {
      searchedArticles = articles.filter((article) => {
        if (article.title.toLowerCase().includes(search.text.toLowerCase())) {
          return article;
        }
      });
    } else {
      searchedArticles = articles.filter((article) => {
        if (
          article.authName.toLowerCase().includes(search.text.toLowerCase())
        ) {
          return article;
        }
      });
    }
    return searchedArticles;
  };

  const getUserArticle = async () => {
    const response = await fetch(`${host}/api/userArticle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    });
    const json = await response.json();
    if (json.success) {
      // console.log("Article State :- ", json.allUserArticle);

      setUserArticle(json.allUserArticle);
      return json.allUserArticle;
    }
  };

  const getUser = async () => {
    const response = await fetch(`${host}/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    // console.log(json);

    let name = json.user.email.split("@")[0];
    // console.log(name);
    setUname(name);
    setuser(json.user);
    return name;
  };

  const getSingleArticle = async (id) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/singleArticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    // console.log("JSON ", json);
    if (json.success) {
      setSingleArticle(json.article);
    } else {
      setSingleArticle({});
    }
  };

  const getArticleLikes = async (articleId) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/like/getLikes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId }),
    });
    const json = await response.json();
    // console.log("JSON ", json);
    const username = await getUser();
    if (json.success) {
      setArticleLikes(json.articleLikes);
      let isLiked = json.articleLikes.includes(username);
      // console.log(uname);

      return { isLiked, num: json.articleLikes.length };
    } else {
      setArticleLikes([]);
      return { isLiked: false, num: 0 };
    }
  };

  const addRemLikes = async (articleId) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/like/addRemLike`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, uname }),
    });
    const json = await response.json();
    const username = await getUser();

    // console.log("JSON ", json);
    let isLiked = json.articleLikes.includes(username);

    if (json.success) {
      setArticleLikes(json.articleLikes);
      return { isLiked, num: json.articleLikes.length };
    } else {
      setArticleLikes([]);
      return { isLiked: false, num: 0 };
    }
  };

  const deleteArticle = async (id) => {
    // console.log(JSON.stringify({ id }));

    const response = await fetch(`${host}/api/deleteOne`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    if (json.success) {
      return true;
    }
    return false;
  };

  const checkAuthentic = async () => {
    if (localStorage.getItem("authtoken").length === 0) {
      setIsAuthentic(false);
      console.log("returned from here");
      return false;
    }
    const response = await fetch(`${host}/auth/isAuthentic`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const json = await response.json();
    // const navigate = useNavigate();
    // console.log(json);
    // setIsAuthentic(json.success);
    console.log("returned after api ", json);

    return json.success;
  };

  return (
    <ArticleContext.Provider
      value={{
        allArticle,
        getAllArticle,
        getUser,
        setUname,
        user,
        uname,
        getUserArticle,
        userArticle,
        getSingleArticle,
        singleArticle,
        deleteArticle,
        searchArticles,
        articleLikes,
        getArticleLikes,
        addRemLikes,
        search,
        setSearch,
        checkAuthentic,
        isAuthentic,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
