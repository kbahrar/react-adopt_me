import { useState, useEffect } from "react";

const CACHES = {};

export default function useBridList(animal) {
  const [breeds, setBreeds] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) setBreeds([]);
    else if (CACHES[animal]) setBreeds(CACHES[animal]);
    else getBreedsList();
  }, [animal]);

  async function getBreedsList() {
    setStatus("loading ...");
    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();
    CACHES[animal] = json.breeds || [];
    // console.log(json);
    setBreeds(CACHES[animal]);
    setStatus("done.");
  }

  return [breeds, status];
}
