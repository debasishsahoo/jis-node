import React, { useState, useEffect } from 'react';
import { api } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './styles.css';
const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await api.get('/');
    setItems(response.data);
  };

  const addItem = async (item) => {
    const response = await api.post('/', item);
    setItems([...items, response.data]);
  };

  const updateItem = async (id, updatedItem) => {
    const response = await api.put(`/${id}`, updatedItem);
    setItems(items.map((item) => (item._id === id ? response.data : item)));
  };

  const deleteItem = async (id) => {
    await api.delete(`/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <ItemForm onAdd={addItem} />
      <ItemList items={items} onUpdate={updateItem} onDelete={deleteItem} />
    </div>
  );
};

export default App;
