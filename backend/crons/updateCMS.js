
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key7BJK80usPvd3Sg'
});
var base = Airtable.base('appsv2vwWLP8Qnkm4');

const fs = require('fs');

var fullRecords_Inicio = {};
var fullRecords_Servicios = {};
var fullRecords_Productos = {};
var fullRecords_Nosotros = {};
var fullRecords_Proyectos = {};
var fullRecords_Contactar = {};

setInterval(function() {
    
    base("Inicio").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Inicio[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Inicio = JSON.stringify(fullRecords_Inicio);
    fs.writeFile('public/CMSContent_Inicio.json', data_Inicio, function(err, result) {
      if(err) console.log('error', err);
    });


    base("Servicios").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Servicios[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Servicios = JSON.stringify(fullRecords_Servicios);
    fs.writeFile('public/CMSContent_Servicios.json', data_Servicios, function(err, result) {
      if(err) console.log('error', err);
    });


    base("Productos").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Productos[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Productos = JSON.stringify(fullRecords_Productos);
    fs.writeFile('public/CMSContent_Productos.json', data_Productos, function(err, result) {
      if(err) console.log('error', err);
    });


    base("Nosotros").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Nosotros[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Nosotros = JSON.stringify(fullRecords_Nosotros);
    fs.writeFile('public/CMSContent_Nosotros.json', data_Nosotros, function(err, result) {
      if(err) console.log('error', err);
    });


    base("Proyectos").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Proyectos[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Proyectos = JSON.stringify(fullRecords_Proyectos);
    fs.writeFile('public/CMSContent_Proyectos.json', data_Proyectos, function(err, result) {
      if(err) console.log('error', err);
    });


    base("Contactar").select({
      view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function(record, index) {
        var imgorvalue = (typeof record.get('Imagen') === 'undefined') ? record.get('Valor') : record.get("Imagen")[0].url;
        fullRecords_Contactar[record.get('Campo')]=imgorvalue;
      });
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });

    var data_Contactar = JSON.stringify(fullRecords_Contactar);
    fs.writeFile('public/CMSContent_Contactar.json', data_Contactar, function(err, result) {
      if(err) console.log('error', err);
    });


}, 2000)




