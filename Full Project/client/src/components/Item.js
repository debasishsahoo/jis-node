import React, { useState } from 'react';

const Item = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item._id);
    }
  };

  const handleUpdate = (updatedItem) => {
    onUpdate(item._id, updatedItem);
    setIsEditing(false);
  };

  return (
    <div className="item">
      {!isEditing ? (
        <>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="item-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <form
          className="item-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate({
              name: e.target.name.value,
              description: e.target.description.value,
            });
          }}
        >
          <input
            type="text"
            name="name"
            defaultValue={item.name}
            required
          />
          <textarea
            name="description"
            defaultValue={item.description}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Item;
