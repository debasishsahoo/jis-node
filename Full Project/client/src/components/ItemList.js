import React from 'react';
import Item from './Item';

const ItemList = ({ items, onUpdate, onDelete }) => {
  return (
    <div className="item-list">
      <h2>Items</h2>
      {items.length > 0 ? (
        items.map((item) => (
          <Item
            key={item._id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No items found. Add a new item!</p>
      )}
    </div>
  );
};

export default ItemList;
