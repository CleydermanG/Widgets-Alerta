var express = require('express');
var app = express();
const twilio = require('twilio');
const client = twilio('AC31aab9b247731061b04e29819003c2ae', 'd7754956a7e09e30c4ee46ab2472bebb');
app.use('/static', express.static(__dirname + '/public/google'));
app.use('/static', express.static(__dirname + '/others/helpSAP'));
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

app.get('/twilioDemo', function(req, res) {
    console.log(req.query);
    actividad(req, res);

});


function message(phone) {
    return new Promise((resolve, reject) => {

        client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+' + phone,
            body: 'Alerta SAC ⚠'
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
        // var phone = ["573183027649", "573123845845", "573206873075"];
        var phone = ["573123845845"];
        for (let i = 0; i < phone.length; i++) {
            var mns = await message(phone[i]);
        }
        //  var mns = await message();
        res.send('Twilio ');
    } catch (error) {
        console.log(error);
    }
}