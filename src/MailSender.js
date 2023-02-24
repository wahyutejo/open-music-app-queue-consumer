const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.nodemailer.host,
      port: config.nodemailer.port,

      auth: {
        user: config.nodemailer.email,
        pass: config.nodemailer.password,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Music App',
      to: targetEmail,
      subject: 'Ekspor Palylist',
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
