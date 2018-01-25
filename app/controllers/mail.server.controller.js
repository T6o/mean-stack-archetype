// Invoke 'strict' JavaScript mode
'use strict';

var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
var config = require('../../config/config')
//sgMail.setApiKey("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");
sgMail.setApiKey(config.sgMail);

// Create a new 'render' controller method
exports.sendMail = function(req, res) {
  var data = req.body;
  //console.log("mail "+req.body.mail+ "message "+ req.body.message + "subject" + req.body.subject);
  const msg = {
    to: req.body.mail,
    from: 'test@email.com',
    subject: req.body.subject,
    text: req.body.message,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail.send(msg);
  res.json(data);
};
