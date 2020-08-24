const os = require('os');
const request = require('request');

const token = 'AECBNHUIOS2R'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.disable('x-powered-by');
app.get('/', function(req, res){
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.challenge']){
        res.status(200).send(req.query['hub.challenge']);
    }else{
        res.status(403).send("잘못된 경로");
    }
});

app.post('/', function(req, res){
    for(let i = 0; i < req.body.entry.length; i++){
        for(let j = 0; j < req.body.entry[i].messaging.length; j++){
            let messaging = req.body.entry[i].messaging[j];

            if(messaging.message && messaging.message.text){
                console.log(messaging.sender.id);
                console.log(messaging.message.text);

                sendMessage(messaging.sender.id, messaging.message.text);
            }
        }
    }
    res.send('OK!');
});

const Keyword = (sender_id, message) => {
    const Keyword_list = [{
        Keyword: "안녕",
        text: "나도 안녕"
    }, {
        Keyword: "반가워",
        text: "나도 반가워"
    }];

    let sendText = "무슨말인지 잘 모르겠어";
    for(let i = 0; i < Keyword_list.length; i++){
        if(message.indexOf(Keyword_list[i].Keyword) > -1){
            sendText = Keyword_list[i].text;
            break;
        }
    }

    sendMessage(sender_id, sendText);
};

const sendMessage = (sender_id, message) => {
    const messageData = {
        recipient: {
            id: sender_id,
        },
        message: {
            text: message
        }
    };

    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: messageData
    }, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            console.log("Send OK!");
        }else{
            console.log("Error", body);
        }
    });
}

app.listen(process.env.PORT , function(){
    console.log("Node Started!");
});

