import React from 'react';
import MovieCard from './MovieCard'

function MovieList(props) {
    return (
        <div>
            <h2>Movies to watch</h2>
            <MovieCard movies={props.movies} deleteData={props.deleteData}/>
        </div>
    )
}

export default MovieList;