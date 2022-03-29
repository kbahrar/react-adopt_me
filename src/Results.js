import Pet from "./Pet";

export default function Results({ Pets }) {
  return (
    <div className="search">
      {!Pets.length ? (
        <h1>No Pets found</h1>
      ) : (
        Pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            key={pet.id}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
}
