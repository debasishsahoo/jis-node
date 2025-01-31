// controllers/itemController.js
const ProductModel = require('../models/product.model');

const productController = {
  createItem: async (req, res) => {
    const { name, description } = req.body;
    try {
      const newItem = new ProductModel({ name, description, createdBy: req.user.id });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getItems: async (req, res) => {
    try {
      const items = await ProductModel.find({ createdBy: req.user.id });
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateItem: async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const item = await ProductModel.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        { name, description },
        { new: true }
      );
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteItem: async (req, res) => {
    const { id } = req.params;
    try {
      const item = await ProductModel.findOneAndDelete({ _id: id, createdBy: req.user.id });
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = productController;
