import React from "react";

function MovieCard(props) {
  const { movies } = props;
  return (
    <div>
      {movies.map((item, i) => (
        <div item key={i}>
          <div>
            <img
              component="img"
              style={{ maxHeight: 400 }}
              src={`http://image.tmdb.org/t/p/w500/${item.description.poster_path}`}
            />
            <div style={{ height: 50 }}>
              <p>{item.description.title}</p>
              {/* <Typography
                  sx={{
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                    overflow: "hidden",
                  }}
                  variant="body2"
                  color="text.secondary"
                  //noWrap
                >
                  {item.description.overview}
                </Typography> */}
            </div>
            <div>
              {
                // if,else to show different button if the movie was watched
                item.description.watched === false ? (
                  <button
                    color="primary"
                    onClick={() => props.updateData(item.id)}
                  >
                    watched
                  </button>
                ) : (
                  <button onClick={() => props.updateData(item.id)}>
                    watch
                  </button>
                )
              }
              <button onClick={() => props.deleteData(item.id)}>delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
