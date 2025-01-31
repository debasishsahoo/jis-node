// controllers/authController.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({ message: 'Password updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  user:async(req,res)=>{
    const user_id=req.user.id
    try {
      const users = await User.findById({_id:user_id}).select('-password');
      if(users) return res.json(users);;
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
module.exports = userController;
