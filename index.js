var express = require('express');
var app = express();
const twilio = require('twilio');
const client = twilio('ACab0f72ab2a1ef8b20809ab2a2e255fc6', '3a01366cac56a8c70d290a3d6de0a830');

var EmailCtrl = require('./mailCtrl');

app.use('/static', express.static(__dirname + '/public/google'));
app.use('/static', express.static(__dirname + '/public/box'));
app.use('/static', express.static(__dirname + '/others/helpSAP'));
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.get('/twilioDemo', function(req, res) {
    console.log(req.query.name);
    actividad(req, res);
});

app.post('/email', function(req, res) {
    EmailCtrl.sendEmail(req, res);
});

function message(phone, name) {
    return new Promise((resolve, reject) => {
        client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+' + phone,
            body: 'Nueva tarea creada por ' + name
        }).then(mensaje => {
            resolve(mensaje.sid);
        }).catch(err => {
            reject(err);
            console.log(err);
        });
    });
}

async function actividad(req, res) {
    try {

        var phone = ["573123845845"];
        // , "573123845845", "573206873075", "573206939387"
        //var phone = ["573123845845", "573124939218"];
        //var phone = ["573052350862", "573123845845", "573124939218"];
        for (let i = 0; i < phone.length; i++) {
            var mns = await message(phone[i], req.query.name);
            //console.log(mns);
        }
        //  var mns = await message();
        res.send('Twilio ');
        //EmailCtrl.sendEmail(req, res);
    } catch (error) {
        console.log(error);
    }
}