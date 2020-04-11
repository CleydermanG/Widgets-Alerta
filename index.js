var express = require('express');
var app = express();
const twilio = require('twilio');
const client = twilio('AC31aab9b247731061b04e29819003c2ae', '5a90d4f91961762b32d1d44f6c231204');
app.use('/static', express.static(__dirname + '/public/google'));
app.use('/static', express.static(__dirname + '/others/helpSAP'));
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.get('/twilioDemo', function(req, res) {
    actividad(req, res);
});


function message() {
    return new Promise((resolve, reject) => {
        client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+573183027649',
            body: 'Hola SAC ⚠'
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
        var mns = await message();
        res.send('Twilio ' + mns);
    } catch (error) {
        console.log(error);
    }
}