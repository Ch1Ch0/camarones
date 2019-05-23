const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

var path = require("path");

token = express();
email = express();

token = "";
email = "";
user_id = "";

const app = express();

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key7BJK80usPvd3Sg'
});
var base = Airtable.base('appsv2vwWLP8Qnkm4');

// set the view engine to ejs
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://simple:veXaYrLo7KCTE7nw@cluster0-5fncu.mongodb.net/viajelo?retryWrites=true')
.then(() => {
  console.log('Connected to DataBase');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});


app.set('views', path.join(__dirname, '../public'));

app.get('/', function(req, res, next) {
  
  var fs = require('fs');
  let rawdata = fs.readFileSync(__dirname +"/../public/CMSContent_Inicio.json");  
  let arr = JSON.parse(rawdata);

  res.render('index', arr);
  app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));  

});

app.get('/index', function(req, res, next) {
  
  var fs = require('fs');
  let rawdata = fs.readFileSync(__dirname +"/../public/CMSContent_Inicio.json");  
  let arr = JSON.parse(rawdata);

  res.render('index', arr);
  app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));

});

app.get('/servicios-construccion', function(req, res, next) {
  var img_bg1 = "", img_bg2 = "";

  base("Servicios").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Construccion_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
        else if(record.get("Campo") === 'Construccion_fondo_2'){
            img_bg2 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }

      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('servicios-construccion', {
          img_bg1: img_bg1,
          img_bg2: img_bg2
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/servicios-remodelacion', function(req, res, next) {
  var img_bg1 = "";

  base("Servicios").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Remodelacion_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }

      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('servicios-remodelacion', {
          img_bg1: img_bg1
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/servicios-mantenimiento', function(req, res, next) {
  var img_bg1 = "", img_bg2 = "";

  base("Servicios").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Mantenimiento_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
        if(record.get("Campo") === 'Mantenimiento_fondo_2'){
            img_bg2 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }

      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('servicios-mantenimiento', {
          img_bg1: img_bg1,
          img_bg2: img_bg2
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/contactar', function(req, res, next) {
  var img_bg1 = "";

  base("Contactar").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'fondo_contactar_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('contactar', {
          img_bg1: img_bg1
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/nosotros', function(req, res, next) {
  var img_bg1 = "", img_b2 = "";

  base("Nosotros").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
        else if(record.get("Campo") === 'fondo_2'){
            img_bg2 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }

      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('nosotros', {
          img_bg1: img_bg1,
          img_bg2: img_bg2
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/productos', function(req, res, next) {
  var img_bg1 = "";
  var marca_1 = "", marca_2 = "", marca_3 = "", marca_4 = "", marca_5 = "";

  base("Productos").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
        else if(record.get("Campo") === 'imagen_1_url'){
            marca_1 = record.get("Valor");
        }
        else if(record.get("Campo") === 'imagen_2_url'){
            marca_2 = record.get("Valor");
        }
        else if(record.get("Campo") === 'imagen_3_url'){
            marca_3 = record.get("Valor");
        }
        else if(record.get("Campo") === 'imagen_4_url'){
            marca_4 = record.get("Valor");
        }
        else if(record.get("Campo") === 'imagen_5_url'){
            marca_5 = record.get("Valor");
        }


      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('productos', {
          img_bg1: img_bg1,
          marca_1: marca_1,
          marca_2: marca_2,
          marca_3: marca_3,
          marca_4: marca_4,
          marca_5: marca_5
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/proyectos', function(req, res, next) {
  var img_bg1 = "";

  base("Proyectos").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Proyecto_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('proyectos', {
          img_bg1: img_bg1
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/proyectos-construccion', function(req, res, next) {
  var img_bg1 = "";

  base("Proyectos").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Proyecto_Construccion_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('proyectos-construccion', {
          img_bg1: img_bg1
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});

app.get('/proyectos-remodelacion', function(req, res, next) {
  var img_bg1 = "";

  base("Proyectos").select({
    view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record, index) {
        if(record.get("Campo") === 'Proyecto_Remodelacion_fondo_1'){
            img_bg1 = (typeof record.get('Imagen') === 'undefined') ? "" : record.get("Imagen")[0].url;
        }
      });
      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      res.render('proyectos-remodelacion', {
          img_bg1: img_bg1
      });
      app.use(express.static(__dirname + '/../public', {extensions: ['html', 'htm'],}));
  });
});


//app.use(express.static("public"));

app.use('/api/user', userRoutes);

const router = express.Router();

//app.get('/', (req, res) => res.send('Hello World homiiiee!'))
//app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, '../', 'index.html'));
//});

module.exports = app;
