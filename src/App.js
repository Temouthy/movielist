import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "./firebase-config";
import Typography from "@mui/material/Typography";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const moviesRef = ref(database, "movies");
    onValue(moviesRef, (snapshot) => {
      const returnList = [];
      snapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        const description = childSnapshot.val();
        returnList.push({ id, description });
      });

      // set loading to false and set data to state
      this.setState({
        loading: false,
        data: returnList,
      });
      if (!snapshot.exists()) {
        return <h1>error loading data</h1>;
      }
    });
  }

  deleteData(key) {
    let movieRef = ref(database, `/movies/${key}`);
    remove(movieRef);
  }

  updateData(key) {
    const watchedMoviesRef = ref(database, `/movies/${key}`);
    //const moviesRef = ref(database, `/movies/${key}`);
    let movieData;
    onValue(watchedMoviesRef, (snapshot) => {
      const newData = snapshot.val().watched;
      movieData = { watched: !newData };
    });
    update(watchedMoviesRef, movieData);

    //update(moviesRef, movieData);
  }

  render() {
    if (this.state.error) {
      return <div>Error fetching data :(</div>;
    } else if (this.state.loading === true) {
      return <div>loading...</div>;
    }
    return (
      <div className="App">
        <Typography variant="h3" gutterBottom>
          Movie List App
        </Typography>
        <Menu />
        <Routes>
          <Route
            index
            element={
              <MovieList
                movies={this.state.data}
                deleteData={this.deleteData}
                updateData={this.updateData}
              />
            }
          />
          <Route
            path="/movieList"
            element={
              <MovieList
                movies={this.state.data}
                deleteData={this.deleteData}
                updateData={this.updateData}
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
