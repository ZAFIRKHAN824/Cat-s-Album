import React, { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "./GlobalVariables";

export default function BreedDetails() {
  const [breedDetail] = useContext(AuthContext);
  useEffect(() => {
    console.log("breedDeatil", breedDetail);
  }, [breedDetail]);

  return (
    <div>
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
      <div>Breed Id :{breedDetail.id}</div>
      <div>Breed Name :{breedDetail.name}</div>
      <div>Alternative Name :{breedDetail.alt_names}</div>
      <div>Origin:{breedDetail.origin}</div>
    </div>
  );
}
