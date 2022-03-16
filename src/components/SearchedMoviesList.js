import React from "react";

function SearchedMoviesList(props) {
    return (
        <>
            {props.movies.map((movie) => (
                movie.map((item, i) => (
                <div key={i}>
                    <h3>{item.title}</h3>
                    <p>{item.overview}</p>
                    <button onClick={() => props.handlePushMovie(item)}>Add movie</button>
                </div>
                ))                
            ))}
        </>
    )
}

export default SearchedMoviesList;