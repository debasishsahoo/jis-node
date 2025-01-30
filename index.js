const express = require("express");
const productRoute=require("./routes/product.route")
const app = express();

app.get('/check',(req,res)=>{
  res.status(200).send('Api is Running')
});
app.use('/api/product',productRoute)


app.listen(5000, () => {
  console.log("Server is Running on PORT 5000");
});


//Address of Local Server:
//1:localhost
//2:127.0.0.1

//PORT:5000

// /check =>path

