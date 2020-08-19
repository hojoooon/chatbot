const os = require('os');

const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("Send OK!");
});

app.listen(process.env.PORT , function(){
    console.log("Node Started!");
});