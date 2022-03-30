/* at the top, under React imports */
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import React, { StrictMode, useState } from "react";
import Details from "./Details";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

export default function App() {
  const theme = useState("darkblue");

  return (
    <div
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
      className="p-0 m-0"
    >
      <ThemeContext.Provider value={theme}>
        <Router>
          <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link className="text-6xl text-white hover:text-gray-200" to={"/"}>
              Adopt me
            </Link>
          </header>
          <Routes>
            <Route element={<Details />} path="/details/:id" />
            <Route element={<SearchParams />} path="/" />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
  // return React.createElement("div", {}, [
  //   React.createElement(Pet, {
  //     key: 1,
  //     name: "Pepper",
  //     animal: "Bird",
  //     breed: "Cockatiel",
  //   }),
  //   React.createElement(Pet, {
  //     key: 2,
  //     name: "Pepper",
  //     animal: "Bird",
  //     breed: "Cockatiel",
  //   }),
  //   React.createElement(Pet, {
  //     key: 3,
  //     name: "Pepper",
  //     animal: "Bird",
  //     breed: "Cockatiel",
  //   }),
  // ]);
}
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
