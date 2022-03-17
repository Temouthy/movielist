import React from "react";

function MovieCard(props) {
  const { movies } = props;
  return (
    <>  
      {movies.map((item, i) => (
        <div key={i}>
          <h4>{item.description.title}</h4>
          <p>{item.description.overview}</p>
          {console.log("MOVIE KEY", item.id)}
          <button onClick={() => props.updateData(item.id)}>watched</button>
          <button onClick={() => props.deleteData(item.id)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default MovieCard;
