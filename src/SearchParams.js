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
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getPets();
        }}
      >
        <label htmlFor="">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onInput={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="animal">
          Animal
          <select
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
        <label htmlFor="breed">
          Breed
          <select
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
        <label htmlFor="color">
          Color
          <select
            id="color"
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
        <button style={{ backgroundColor: theme }} type="submit">
          submit
        </button>
      </form>
      <Results Pets={pets} />
    </div>
  );
};

export default SearchParams;
