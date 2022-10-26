import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "./firebase-config";
<<<<<<< HEAD
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Paper } from "@mui/material";
=======
>>>>>>> parent of 1fe0232... install MUI

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
      open: false,
    };
    this.updateData = this.updateData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {
    const moviesRef = ref(database, "movies");
    onValue(moviesRef, (snapshot) => {
      // snapshot.forEach((childSnapshot) => {
      //   const movieId = childSnapshot.key;
      //   const databaseMovies = childSnapshot.val();
      //   this.setState((currentState) => {
      //     return {
      //       // data: currentState.data.concat([
      //       //   {
      //       //     id: movieId,
      //       //     items: databaseMovies,
      //       //   },
      //       // ]),
      //       data:
      //     };
      //   });
      // });

      // console.log(snapshot.val());
      // console.log(snapshot.hasChildren());
      // const result = snapshot.map((item) => {
      //   return { title: item.title };
      //   console.log(item);
      // });

      //console.log("result");

      const returnList = [];

      snapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        const description = childSnapshot.val();

        // console.log(movieId, databaseMovies);
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
    this.setState({
      open: true,
    });
    const movieRef = ref(database, `/movies/${key}`);
    remove(movieRef);
  }

  //Change watched to watch, and vice versa
  updateData(key) {
    const watchedMoviesRef = ref(database, `/movies/${key}`);
    let movieData;
    onValue(watchedMoviesRef, (snapshot) => {
      // when snapshot was null error was thrown
      if (snapshot.exists() === false) {
        return null;
      }
      const newData = snapshot.val().watched;
      movieData = { watched: !newData };
    });
    update(watchedMoviesRef, movieData);
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
<<<<<<< HEAD
        <Paper elevation={3}>
          <Typography variant="h3" gutterBottom>
            Movie List App
          </Typography>
          <Menu />
        </Paper>
=======
        <h1>Movie List App</h1>
        <Menu />
>>>>>>> parent of 1fe0232... install MUI
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

        {/* Alert button on delete */}
        <Snackbar
          open={this.state.open}
          autoHideDuration={1000}
          onClose={() => this.setState({ open: false })}
          message="Note archived"
        >
          <MuiAlert severity="warning" variant="filled" sx={{ width: "100%" }}>
            This is a success message!
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default App;
