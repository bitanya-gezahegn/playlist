
import { css } from '@emotion/react';

const title = css`
  font-size: 24px;
  color: hotpink;
`;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSongsRequest,
  deleteSongRequest,
  updateSongRequest
} from '../features/songs/songsSlice';

const SongList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

   const handleUpdate = (id) => {
    dispatch(updateSongRequest(id));
  };

  console.log('SongList render:', { list, loading, error });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <title>Song List</ title>
      {list.length === 0 ? (
        <p>No songs found. Make sure the backend server is running on port 4000.</p>
      ) : (
        <ul>
          {list.map(song => (
            <li key={song.id}>
              {song.title} - {song.artist} ({song.year})
              <button onClick={() => handleDelete(song.id)}>Delete</button>
              <button onClick={() => handleUpdate(song.id)}>Update</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;