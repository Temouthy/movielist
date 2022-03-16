import React from 'react';

function MovieCard(props) {
    return (
        <>
        {props.movies.map((movie) => (
            movie.items.map((item, i) => (
                <div key={i}>
                <h3>{item.title}</h3>
                <p>{item.overview}</p>
                {console.log('MOVIE KEY', movie.id)}
                <button>watched</button>
                <button onClick={() => props.deleteData(movie.id)}>delete</button>
            </div>
            )) 
        ))}
        </>
    )
}

export default MovieCard;