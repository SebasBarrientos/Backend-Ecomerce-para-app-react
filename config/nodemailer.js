const nodemailer = require('nodemailer');
const { user, pass } = require("./config.json")["development"];

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user,
        pass
      },
});
module.exports = transporter;

