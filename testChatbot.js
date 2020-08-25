const os = require('os');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.challenge']){
        res.status(200).send(req.query['hub.challenge']);
    }else{
        res.status(403).send("잘못된 경로");
    }
});

app.listen(process.env.PORT , function(){
    console.log("Node Started!");
});

app.post('/', function (req, res) {
    console.log("MESSAGE RESPONSE");
    console.log(JSON.stringify(req.body, null, "    "));

    res.send('OK!');
})