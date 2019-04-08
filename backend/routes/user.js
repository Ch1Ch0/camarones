const express = require('express');


var fs = require('fs');

const User = require('../models/user');

const router = express.Router();



router.post("/submitUserInfo",(req, res, next) => {
	
	const user = new User({
		nombre: req.body.nombre,
		correo: req.body.correo,
		celular: req.body.celular
	});
	user.save()
		.then(result => {
			res.status(201).json({
				message: 'User Created'
			});
		})
		.catch(err => {
			res.status(201).json({
				message: 'Error',
				error: err
			});
		});

});


router.get("/generateExcel",(req, res, next) => {
	

	User.find({}, function(err, users) {
    	if (!users.length){
	      return res.status(201).json({
	        message: 'no users found'
	      });
	    }else{
	    	// Require library
			var xl = require('excel4node');
			 
			// Create a new instance of a Workbook class
			var wb = new xl.Workbook();
			 
			// Add Worksheets to the workbook
			var ws = wb.addWorksheet('Usuarios Viajelo');
			 
			// Create a reusable style
			var styleTitle = wb.createStyle({
			  font: {
			    color: '#000000',
			    size: 12,
			    bold: true,
			  }
			});

			// Create a reusable style
			var style = wb.createStyle({
			  font: {
			    color: '#000000',
			    size: 12,
			  }
			});
			 

			// Set value of cell A2 to 'string' styled with paramaters of style
			ws.cell(1, 1)
			  .string('Nombre')
			  .style(styleTitle);

			ws.cell(1, 2)
			  .string('Correo')
			  .style(styleTitle);

			ws.cell(1, 3)
			  .string('Celular')
			  .style(styleTitle);

			//inject users
			var contLine = 3;
			users.forEach(function(user) {

				ws.cell(contLine, 1)
				  .string(user.nombre)
				  .style(style);

				ws.cell(contLine, 2)
				  .string(user.correo)
				  .style(style);

				ws.cell(contLine, 3)
				  .string(user.celular)
				  .style(style);

				contLine+=1;
		    });

			wb.write('public/downloads/viajelo-usuarios.xlsx');

			return res.status(201).json({
				message: 'Success'
			});

	    }
	    
	});


	

});


module.exports = router;