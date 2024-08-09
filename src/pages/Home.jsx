import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import AuthContext from "./GlobalVariables";

export default function Home() {
  const [favPic, setFavPic] = useState([]);
  const [catObj, setCatObj] = useState([]);
  const [catNamePic, setCatNamePic] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchCat, setSearchCat] = useState([]);
  const [breedDetail, setBreedDetail] = useContext(AuthContext);

  const [pageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    const arr = catObj.map((cat, i) => ({
      id: i,
      breed: cat.name?.toLowerCase(),
      link: cat.image?.url,
    }));

    setCatNamePic(arr);
  }, [catObj]);

  useEffect(() => {
    console.log("searchCat: ", searchCat);
  }, [searchCat]);

  function onSearch() {
    const searchedCat = catNamePic.filter((obj) =>
      obj?.breed?.includes(searchValue.toLowerCase())
    );
    setSearchCat(searchedCat);
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key":
      "live_pAxxON9xYCpe0Q1Q8CAx838e9fOyZyZGxi7Rt4UuWCsXqSJfFnRbqvy034YTC70G",
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds", requestOptions)
      .then((response) => response.json())
      .then((result) => setCatObj(result))
      .catch((error) => console.log("error", error));
  }, []);

  function onSearchApi() {
    fetch(
      `https://api.thecatapi.com/v1/breeds/search?q=${searchValue}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSearchCat(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    setFavPic(JSON.parse(localStorage.getItem("favCatObj")));
    setPageMounted(true);
  }, []);

  useEffect(() => {
    if (pageMounted) localStorage.setItem("favCatObj", JSON.stringify(favPic));
  }, [favPic, pageMounted]);

  return (
    <div>
      <div>
        <div className="mainheader">
          <h1 id="header">Cat App</h1>
          <button id="option">
            <Link to="favourites">Favourites</Link>
          </button>
        </div>
        <div id="searchBar">
          <input
            onChange={(e) => {
              onSearchApi();
              setSearchValue(e.target.value);
            }}
            type="search"
            placeholder="Search cat by their breed name!"
          />
        </div>
        <div id="searchresult">
          {searchCat.length > 0 &&
            searchValue !== "" &&
            searchCat.map((cat) => (
              <div key={cat.id} className="searchrow">
                <Link to="biodata" onClick={() => setBreedDetail(cat)}>
                  {cat.name}
                </Link>
              </div>
            ))}
        </div>
        <div>
          {catObj.map((cat) => (
            <div key={cat.id} className="imagearea">
              <Link to="biodata" onClick={() => setBreedDetail(cat)}>
                {" "}
                <img src={cat.image?.url} alt={cat.name} />
              </Link>
              <span>
                <button
                  id="fav"
                  onClick={() => {
                    const isCatExist = favPic.find(
                      (cats) => cats.breed === cat.name
                    );
                    if (!isCatExist) {
                      setFavPic((prev) => [
                        ...prev,
                        { breed: cat.name, url: cat.image?.url },
                      ]);
                    }
                  }}
                >
                  {favPic.find((item) => cat.name === item.breed) ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )}
                </button>
              </span>
              <br />
              <div id="catName">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
