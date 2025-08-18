const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let songs = [
  { id: uuidv4(), title: 'Imagine', artist: 'John Lennon', album: 'Imagine', year: 1971 },
  { id: uuidv4(), title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', year: 1975 }
];

app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.post('/api/songs', (req, res) => {
  const newSong = { id: uuidv4(), ...req.body };
  songs.push(newSong);
  res.status(201).json(newSong);
});

app.put('/api/songs/:id', (req, res) => {
  const index = songs.findIndex(song => song.id === req.params.id);
  if (index !== -1) {
    songs[index] = { ...songs[index], ...req.body };
    return res.json(songs[index]);
  }
  res.status(404).json({ message: 'Song not found' });
});

app.delete('/api/songs/:id', (req, res) => {
  const index = songs.findIndex(song => song.id === req.params.id);
  if (index !== -1) {
    const deleted = songs.splice(index, 1);
    return res.json(deleted[0]);
  }
  res.status(404).json({ message: 'Song not found' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
