import React from "react";
import SearchedMoviesList from "./SearchedMoviesList";
import { database } from "../firebase-config";
import { ref, push, set } from "firebase/database";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedMovies: [],
      error: null,
      loading: null,
      input: "",
      open: false,
    };
    this.SearchAllMovies = this.SearchAllMovies.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.pushMovie = this.pushMovie.bind(this);
    this.submitOnEnter = this.submitOnEnter.bind(this);
  }

  SearchAllMovies(keyword) {
    if (!keyword) {
      return null;
    }
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c29d13a24d8fc2be9bf34aa8c04f45b2&language=en-US&query=${keyword}&include_adult=false`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            loading: false,
            searchedMovies: [data.results],
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
  }

  updateInput(e) {
    const value = e.target.value;
    this.setState({
      input: value,
    });
  }

  pushMovie(movie) {
    this.setState({
      open: true,
    });
    const postMovieRef = ref(database, "movies");
    const newPostRef = push(postMovieRef);
    set(newPostRef, {
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      watched: false,
    });
  }

  // submit the form on enter
  submitOnEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.SearchAllMovies(this.state.input);
    }
  }

  render() {
    const { error, loading, searchedMovies } = this.state;
    if (error) {
      return <p>Error loading data :(</p>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h3>Search all movies</h3>
          <input
            type="search"
            placeholder="search..."
            value={this.state.input}
            onChange={this.updateInput}
            onKeyDown={this.submitOnEnter}
          />
          <input
            type="submit"
            onClick={() => this.SearchAllMovies(this.state.input)}
          />
          <Snackbar
            open={this.state.open}
            autoHideDuration={3000}
            onClose={() => this.setState({ open: false })}
            message="Note archived"
            // action={action}
          >
            <MuiAlert
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </MuiAlert>
          </Snackbar>
          <SearchedMoviesList
            movies={searchedMovies}
            handlePushMovie={this.pushMovie}
          />
        </div>
      );
    }
  }
}

export default AddMovie;
