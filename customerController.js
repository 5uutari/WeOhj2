'use strict'

const { json } = require('express');
// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "192.168.1.128",
    user: "late",
    database: "asiakas",
    password: "salasana"
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa Asiakas taulusta" + error)
          res.status(500);
          res.json({"status" : "ei toiminut"});
        }
        else
        {
            console.log("Data = " + JSON.stringify(results));
            res.json(results);
        }
    });

    },

    fetchAll: function(req, res){
      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = " + JSON.stringify(req.query));
      console.log(req.query.nimi);
      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
      console.log("Data = " + JSON.stringify(req.body));
      console.log(req.body.nimi);
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete: function (req, res) {
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.params));
        res.send("Kutsuttiin delete");
    }
}
