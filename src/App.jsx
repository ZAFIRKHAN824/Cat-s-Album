import { useEffect, useLayoutEffect, useState, useContext } from "react";

import "./App.css";
// import SlideBar from "./component/slideBar";
import Favourites from "./component/favourites";
import Home from "./pages/Home";
import { AuthProvider } from "./pages/GlobalVariables";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import BreedDetails from "./pages/BreedDetails";
// import BreedDetails from "./pages/BreedDetails";
// import GlobalVariables from "./pages/GlobalVariables";
function App() {
  // if (catObj.length === 0) return;
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: "favourites",
      element: (
        <div>
          <Favourites />
        </div>
      ),
    },
    {
      path: "biodata",
      element: (
        <div>
          <BreedDetails />
        </div>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
