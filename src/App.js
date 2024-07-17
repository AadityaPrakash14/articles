import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCards from "./components/AllCards";
import NewArticle from "./components/NewArticle";
import SearchBy from "./components/SearchBy";
import { NotFound } from "./components/NotFound";
import ArticleState from "./context/article/ArticleState";
import Navbar from "./components/Navbar";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import SingleArticle from "./components/SingleArticle";
import MyArticles from "./components/MyArticles";
import MySingleArticle from "./components/MySingleArticle";

function App() {
  return (
    <div className="App">
      <ArticleState>
        <Router>
          <Routes>
            <Route
              path="/"
              key={"home_page"}
              element={[<Navbar />, <SearchBy />, <AllCards />]}
            />

            <Route
              key={"addArticle"}
              path="addArticle"
              element={[<Navbar />, <NewArticle />]}
            />
            <Route index key={"login"} path="login" element={<Login />} />
            <Route key={"signup"} path="signup" element={<Signup />} />
            <Route
              key={"myArticle"}
              path="myArticle/:uname"
              element={[<Navbar />, <SearchBy />, <MyArticles />]}
            />
            <Route
              key={"singleArticle"}
              path="myArticle/:uname/:singleArticleId"
              element={[<Navbar />, <MySingleArticle />]}
            />
            <Route
              key={"singleArticleId"}
              path=":singleArticleId"
              element={[<Navbar />, <SingleArticle />]}
            />
            <Route key={"notfound"} path="*" element={[<NotFound />]} />
          </Routes>
        </Router>
      </ArticleState>
    </div>
  );
}

export default App;
