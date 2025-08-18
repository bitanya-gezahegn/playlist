import axios from 'axios';

const baseUrl = 'http://localhost:4000/api';

export const getSongs = () => axios.get(`${baseUrl}/songs`);
export const addSong = (data) => axios.post(`${baseUrl}/songs`, data);
// etc.
export const updateSong = (id, data) => axios.put(`${baseUrl}/songs/${id}`, data);
export const deleteSong = (id) => axios.delete(`${baseUrl}/songs/${id}`);