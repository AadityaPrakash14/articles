import React, { useContext } from "react";
import ArticleContext from "../context/article/ArticleContext";

export default function SearchBy() {
  const context = useContext(ArticleContext);
  const { search, setSearch } = context;

  const handleChange = (e) => {
    // console.log(e.target.value);
    let searchby = document.getElementById("searchBy");
    // console.log(searchby.value);
    setSearch({ text: e.target.value, by: searchby.value });
  };
  return (
    <>
      <div className="searchCont">
        <input
          type="text"
          id="searchBar"
          className="rounded"
          value={search.text}
          onChange={handleChange}
          placeholder="Search"
        />
        <select name="searchBy" className="rounded" id="searchBy">
          <option value="heading">Heading</option>
          <option value="authName">Author's Name</option>
        </select>
      </div>
    </>
  );
}
