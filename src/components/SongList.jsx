
import { css } from '@emotion/react';

const title = css`
  font-size: 24px;
  color: hotpink;
`;
import React, { useEffect, useState } from 'react';
import SongForm from './SongForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSongsRequest,
  deleteSongRequest,
  updateSongRequest,
  addSongRequest
} from '../features/songs/songsSlice';

const SongList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.songs);
  const [editingSong, setEditingSong] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

  const handleEditClick = (song) => {
    setEditingSong(song);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingSong(null);
  };

  const handleCloseForm = () => {
    setEditingSong(null);
    setShowAddForm(false);
  };

  console.log('SongList render:', { list, loading, error });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Song List</h1>
       <button onClick={handleAddClick}>
          Add New Song
        </button>
      {list.length === 0 ? (
        <p>No songs found. Make sure the backend server is running on port 4000.</p>
      ) : (
        <ul>
          {list.map(song => (
            <li key={song.id}>
              {song.title} - {song.artist} - {song.album}({song.year})
              <button onClick={() => handleDelete(song.id)}>Delete</button>
              <button onClick={() => handleEditClick(song)}>Update</button>
            </li>
          ))}
        </ul>
      )}

       {/* Edit Form */}
      {editingSong && (
        <SongForm 
          song={editingSong} 
          onClose={handleCloseForm}
          isEditing={true}
        />
      )}
      
      {/* Add Form */}
      {showAddForm && (
        <SongForm 
          song={null} 
          onClose={handleCloseForm}
          isEditing={false}
        />
      )}
    </div>
  );
};

export default SongList;