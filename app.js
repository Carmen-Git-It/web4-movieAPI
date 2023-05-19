const express = require('express');
const cors = require('cors');
require('dotenv').config();
  
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({'result:' : 'success'});
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);