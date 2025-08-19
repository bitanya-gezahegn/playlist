import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongRequest, addSongRequest } from '../features/songs/songsSlice';

const SongForm = ({ song, onClose, isEditing = true }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    year: ''
  });

  // Pre-populate form when song data changes (for editing)
  useEffect(() => {
    if (song) {
      setFormData({
        title: song.title || '',
        artist: song.artist || '',
        album: song.album || '',
        year: song.year || ''
      });
    } else {
      // Reset form for new song
      setFormData({
        title: '',
        artist: '',
        album: '',
        year: ''
      });
    }
  }, [song]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing && song) {
      // Update existing song
      dispatch(updateSongRequest({
        id: song.id,
        ...formData
      }));
    } else {
      // Add new song - generate a temporary ID or let backend handle it
      dispatch(addSongRequest({
        ...formData
      }));
    }
    
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px'
      }}>
        <h2>{isEditing ? 'Edit Song' : 'Add New Song'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Title: </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Artist: </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Album: </label>
            <input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Year: </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max="2030"
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={{ padding: '8px 16px' }}>
              {isEditing ? 'Save Changes' : 'Add Song'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ padding: '8px 16px', backgroundColor: '#ccc' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SongForm;