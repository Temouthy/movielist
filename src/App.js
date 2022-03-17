import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MovieList from "./components/MovieList";
import AddMovie from "./components/AddMovie";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "./firebase-config";

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

      console.log(snapshot.val());
      console.log(snapshot.hasChildren());
      // const result = snapshot.map((item) => {
      //   return { title: item.title };
      //   console.log(item);
      // });

      console.log("result");

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
    let movieRef = ref(database, `/movies/${key}`);
    remove(movieRef);
  }

  updateData(key) {
    const moviesRef = ref(database, `/movies/${key}`);
    const movieData = {
      watched: true,
    };
    update(moviesRef, movieData);
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
