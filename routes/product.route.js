const express = require('express');
const router = express.Router();

router.post('/create',(req,res)=>{
    res.status(201).send('Create is Running')
});
router.get('/read',(req,res)=>{
    res.status(200).send('Read is Running')
});
router.put('/update',(req,res)=>{
    res.status(200).send('Update is Running')
});
router.delete('/delete',(req,res)=>{
    res.status(200).send('Delete is Running')
});

module.exports = router;