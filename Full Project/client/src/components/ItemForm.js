import React, { useState } from 'react';

const ItemForm = ({ onAdd, onUpdate, currentItem }) => {
  const [name, setName] = useState(currentItem?.name || '');
  const [description, setDescription] = useState(currentItem?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      onUpdate(currentItem._id, { name, description });
    } else {
      onAdd({ name, description });
    }
    setName('');
    setDescription('');
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{currentItem ? 'Edit Item' : 'Add Item'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{currentItem ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ItemForm;
