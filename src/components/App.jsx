import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  function deleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  function updateLikes(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );

    setToys(updatedToys);
  }

  return (
    <div>
      <div id="toy-header">
        <img
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
          alt="toy header"
        />
      </div>

      {showForm ? <ToyForm addToy={addToy} /> : null}

      <div className="buttonContainer">
        <button onClick={() => setShowForm(!showForm)}>
          Add a Toy
        </button>
      </div>

      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDeleteToy={deleteToy}
            onUpdateLikes={updateLikes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;