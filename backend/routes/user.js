const express = require('express');


var fs = require('fs');

const User = require('../models/user');

const router = express.Router();


var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key7BJK80usPvd3Sg'
});
var base = Airtable.base('appsv2vwWLP8Qnkm4');







router.post('/getcmscontent', (req, res, next) => {

  
  var page = req.body.page;
  var elements = [];

  base(page).select({
    // Selecting the first 3 records in Main View:
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record, index) {

          elements[index] = {
            campo: record.get('Campo'),
            valor: record.get('Valor'),	
			      url: (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url
          };

      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }


      res.status(201).json({
        message: 'Records loaded successfully',
        elements: elements
      });
  });


});





router.post('/sendFormToPatient', (req, res, next) => {

  var nodemailer = require('nodemailer');
  var handlebars = require('handlebars');
  var fs = require('fs');


  var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
              throw err;
              callback(err);
          }
          else {
              callback(null, html);
          }
      });
  };

  
  var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailer@arcader.life',
      pass: 'qtuujieqywldakon'
    }
  });

  
  readHTMLFile('/opt/bitnami/apache2/htdocs/public/mail/sendForm.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
           	nombre: req.body.nombre,
			apellidos: req.body.apellidos,
			telefono: req.body.telefono,
			email: req.body.email,
			lugar: req.body.lugar,
			metros: req.body.metros,
			mensaje: req.body.mensaje
      };
      
      var htmlToSend = template(replacements);
      var mailOptions = {
          from: 'mailer@arcader.life',
          to: 'ventas@piscinasyspasjireh.com',
          subject: 'Usuario requiere información',
          html : htmlToSend
       };
       
      smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log("Daily quota exceeded: "+error);
              res.status(201).json({ message: "Daily quota exceeded"});
          } else {
            console.log('Email sent: ' + response);
            console.log(response);
            res.status(201).json({ message: "Email sent"});
          }
      });
  });
  
});



module.exports = router;