
import { css } from '@emotion/react';
import {theme} from "../styles/theme";

const titleStyle = css`
  font-size: 24px;
  color: hotpink;
`;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSongRequest } from '../features/songs/songsSlice';
import { fetchSongsRequest, deleteSongRequest } from '../features/songs/songsSlice';
const SongForm = () => {
  const [form, setForm] = useState({ title: '', artist: '', album: '', year: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSongRequest(form));
    setForm({ title: '', artist: '', album: '', year: '' });
  };

  return (
    <form  onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="artist" value={form.artist} onChange={handleChange} placeholder="Artist" required />
      <input name="album" value={form.album} onChange={handleChange} placeholder="Album" />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default SongForm;