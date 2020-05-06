var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'gcleiderman@gmail.com',
            pass: 'loroloroloro'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: 'gcleiderman@gmail.com',
        to: 'duvan.ramos@structum-co.com',
        subject: 'Prueba Email',
        text: 'Prueba Widgets'
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send(500, { titulo: "Error al enviar Email" });
        } else {
            console.log("Email sent");
            res.status(200).jsonp('Email sent');
        }
    });
};