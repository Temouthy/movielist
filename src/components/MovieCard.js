import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardMedia, IconButton } from "@mui/material";

function MovieCard(props) {
  const { movies } = props;
  return (
    <Container>
      <Grid container spacing={2}>
        {movies.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
            <Card>
              <CardMedia
                component="img"
                style={{ maxHeight: 400 }}
                src={`http://image.tmdb.org/t/p/w500/${item.description.poster_path}`}
              />
              <CardContent style={{ height: 50 }}>
                <Typography variant="h5" component="h2">
                  {item.description.title}
                </Typography>
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
              </CardContent>
              <CardActions>
                {
                  // if,else to show different button if the movie was watched
                  item.description.watched === false ? (
                    <Button
                      color="primary"
                      onClick={() => props.updateData(item.id)}
                    >
                      watched
                    </Button>
                  ) : (
                    <Button onClick={() => props.updateData(item.id)}>
                      watch
                    </Button>
                  )
                }
                <IconButton onClick={() => props.deleteData(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MovieCard;
