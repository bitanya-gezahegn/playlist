import React from 'react';
import SongForm from './components/SongForm';
import SongList from './components/SongList';

const App = () => (
  <div style={{ padding: '1rem' }}>
    <h1>Song Manager</h1>
    <SongForm />
    <SongList />
  </div>
);

export default App;
