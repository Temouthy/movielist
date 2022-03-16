import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import { ref, onValue, remove } from "firebase/database";
import { database } from "./firebase-config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: Number,
        items: [],
      },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    /*fetch("https://api.themoviedb.org/3/movie/550?api_key=c29d13a24d8fc2be9bf34aa8c04f45b2&language=en-US")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            data: [result],
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );*/

    const moviesRef = ref(database, "movies");
    onValue(moviesRef, (snapshot) => {
      this.setState({
        data: [],
      });
      snapshot.forEach((childSnapshot) => {
        const movieId = childSnapshot.key;
        const databaseMovies = childSnapshot.val();
        this.setState((currentState) => {
          return {
            data: currentState.data.concat([
              {
                id: movieId,
                items: [databaseMovies],
              },
            ]),
          };
        });
      });
      // after all the data is loaded set loading to false
      this.setState({
        loading: false,
      });
      if (!snapshot.exists()) {
        return <h1>error loading data</h1>;
      }
    });
  }

  deleteData(key) {
    let movieRef = ref(database, `movies-${key}`);
    console.log("PATH REFERENCE", movieRef);
  }

  render() {
    console.log("THIS APP STATE DATA", this.state);
    if (this.state.error) {
      return <div>Error fetching data :(</div>;
    } else if (this.state.loading === true) {
      return <div>loading...</div>;
    }
    return (
      <div className="App">
        <h1>Movie List App</h1>
        <Menu />
        <Routes>
          <Route
            index
            element={
              <MovieList
                movies={this.state.data}
                deleteData={this.deleteData}
              />
            }
          />
          <Route
            path="/movieList"
            element={
              <MovieList
                movies={this.state.data}
                deleteData={this.deleteData}
              />
            }
          />
          <Route path="addMovie" element={<AddMovie />} />
        </Routes>
      </div>
    );
  }
}

export default App;
