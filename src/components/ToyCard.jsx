import React from "react";

function ToyCard({ toy, toys, setToys }) {

  // DELETE TOY
  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    }).then(() => {

      const updatedToys = toys.filter(
        (singleToy) => singleToy.id !== toy.id
      );

      setToys(updatedToys);

    });
  }

  // LIKE TOY
  function handleLike() {

    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: updatedLikes,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {

        const updatedToys = toys.map((singleToy) => {

          if (singleToy.id === updatedToy.id) {
            return updatedToy;
          } else {
            return singleToy;
          }

        });

        setToys(updatedToys);

      });
  }

  return (
    <div className="card" data-testid="toy-card">

      <h2>{toy.name}</h2>

      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />

      <p> Likes:{toy.likes} </p>

      <button
        className="like-btn"
        onClick={handleLike}
      >
        Like {"<3"}
      </button>

      <button
        className="del-btn"
        onClick={handleDelete}
      >
        Donate to GoodWill
      </button>

    </div>
  );
}

export default ToyCard;