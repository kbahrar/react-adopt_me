import Pet from "./Pet";

export default function Results({ Pets }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-5">
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
