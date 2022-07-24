const express = require("express");
const app = express();
const arg1= process.argv[2];
const arg2= process.argv[3];
 app.get("/", (req, res) => {
     res.send("{\"Username\" => " + arg1 +" , \"Password\" => "+ arg2 + "}");
   });

app.listen(3000,() => {
    console.log('My app is running');
})