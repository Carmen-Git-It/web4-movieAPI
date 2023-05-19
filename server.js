const express = require('express');
const cors = require('cors');
const MoviesDB = require('./modules/moviesDB.js');

require('dotenv').config();
const db = new MoviesDB();

const app = express();
const HTTP_PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json(({message: "API Listening"}));
});

app.post('/api/movies', async (req, res) => {
  try {
      const movie = await db.addNewMovie(req.body);
      res.status(201).json({movie});
  } catch(err) {
      res.status(500).json({error: err});
  }
});  

app.get('/api/movies', (req, res) => {
  db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
  .then((movies) => {
      res.status(201).json(movies);
  }).catch((err) => {
      res.status(500).json({error: err});
  });
});


app.get('/api/movies/:id', (req, res) => {
  db.getMovieById(req.params.id)
  .then((movie) => {
      res.status(201).json(movie);
  }).catch((err) => {
      res.status(500).json({error: err});
  });
});

app.put('/api/movies/:id', (req, res) => {
  db.updateMovieById(req.body, req.params.id)
  .then(() => {
      res.status(201).json({message: "Movie updated successfully!"});
  }).catch((err) => {
      res.status(500).json({error: err});
  });
});

app.delete('/api/movies/:id', (req, res) => {
  db.deleteMovieById(req.params.id)
  .then(() => {
      res.status(201).json({message: "Movie deleted successfully!"});
  }).catch((err) => {
      res.status(500).json({error: err});
  });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
      console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});