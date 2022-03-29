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
    <ThemeContext.Provider value={theme}>
      <Router>
        <header>
          <Link to={"/"}>Adopt me</Link>
        </header>
        <Routes>
          <Route element={<Details />} path="/details/:id" />
          <Route element={<SearchParams />} path="/" />
        </Routes>
      </Router>
    </ThemeContext.Provider>
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
