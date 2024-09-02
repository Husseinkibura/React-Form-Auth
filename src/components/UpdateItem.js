import React, { useState } from 'react';
import axios from 'axios';

const UpdateItem = ({ itemId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-item/${itemId}`, {
        name,
        description,
      });
      alert('Item updated successfully');
    } catch (error) {
      console.error('There was an error updating the item!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="New Item Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;
