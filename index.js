var express = require('express');
var app = express();
const twilio = require('twilio');
const client = twilio('ACab0f72ab2a1ef8b20809ab2a2e255fc6', '96fb11afddc994548a281f97f1148930');
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
            body: 'Modificación Detectada ⚠'
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
        var phone = ["573183027649", "573123845845", "573206873075", "573206939387"];
        //var phone = ["573123845845", "573124939218"];
        //var phone = ["573052350862", "573123845845", "573124939218"];
        for (let i = 0; i < phone.length; i++) {
            var mns = await message(phone[i]);
        }
        //  var mns = await message();
        res.send('Twilio ');
    } catch (error) {
        console.log(error);
    }
}