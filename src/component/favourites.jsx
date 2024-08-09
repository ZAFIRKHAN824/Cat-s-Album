import React, { useState, useEffect } from "react";
import "./fav.css";

export default function Favourites() {
  const favPicsFromLocalStorage = localStorage.getItem("favCatObj");
  const [favPic, setfavPic] = useState(JSON.parse(favPicsFromLocalStorage));
  // console.log("localFavv", JSON.parse(favPicsFromLocalStorage));

  const handleDeletePicFromFav = (name) => {
    setfavPic((prev) =>
      prev.filter((obj) => {
        console.log("hey", obj);
        return obj.breed !== name;
      })
    );
  };
  useEffect(() => {
    localStorage.setItem("favCatObj", JSON.stringify(favPic));
  }, [favPic]);

  return (
    <div id="mainFavBody">
      <div className="mainheader">
        <h1 id="header">Cat App</h1>

        <button
          id="option"
          onClick={(e) => {
            setSliderBar((prev) => !prev);
          }}
        >
          Favourite
        </button>
      </div>
      {favPic?.map((cat, i) => {
        return (
          <div key={cat.id} className="imagearea">
            <img src={cat.url} />
            <button
              onClick={() => handleDeletePicFromFav(cat.breed)}
              id="DleteButt"
            >
              ✖{" "}
            </button>

            <div id="catName">{cat.breed}</div>
          </div>
        );
      })}
    </div>
  );
}
