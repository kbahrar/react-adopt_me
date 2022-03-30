import Results from "./Results";
import useBridList from "./useBridList";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const [location, setLocation] = useState("Seatle, WA");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);

  const [breeds, status] = useBridList(animal);

  const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
  const colors = ["peru", "darkblue", "chartreuse", "mediumorchid", "green"];

  useEffect(() => {
    getPets();
  }, []);

  async function getPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={(e) => {
          e.preventDefault();
          getPets();
        }}
      >
        <label className="search-label" htmlFor="location">
          Location
        </label>
        <input
          className="w-60"
          type="text"
          name="location"
          id="location"
          value={location}
          onInput={(e) => setLocation(e.target.value)}
        />
        <label className="search-label" htmlFor="animal">
          Animal
          <select
            className="w-60"
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="breed">
          Breed
          <select
            className="w-60 disabled:opacity-50"
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="color">
          Color
          <select
            id="color"
            className="w-60"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <strong>{status}</strong>
        <button
          style={{ backgroundColor: theme }}
          type="submit"
          className="rounded px-6 py-2 color text-white hover:opacity-50 border-none"
        >
          submit
        </button>
      </form>
      <Results Pets={pets} />
    </div>
  );
};

export default SearchParams;
