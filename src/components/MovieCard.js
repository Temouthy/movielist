import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function MovieCard(props) {
  const { movies } = props;
  return (
    <>
      {movies.map((item, i) => (
        <div key={i}>
          <Typography variant="h6">{item.description.title}</Typography>
          <Typography variant="body2">{item.description.overview}</Typography>
          {
            // if,else to show different button if the movie was watched
            item.description.watched === false ? (
              <Button color="primary" onClick={() => props.updateData(item.id)}>
                watched
              </Button>
            ) : (
              <Button onClick={() => props.updateData(item.id)}>watch</Button>
            )
          }
          <Button color="error" onClick={() => props.deleteData(item.id)}>
            delete
          </Button>
        </div>
      ))}
    </>
  );
}

export default MovieCard;
