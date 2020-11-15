'use strict'

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : '192.168.1.128', // tietokantapalvelimen osoite
  port : 3306, // jos oletusportti ei toimi
  user : 'late', // kehitysatarkoituksessa voidaan käyttää root-käyttäjää. Tuotannossa ei saa käyttää root-käyttäjää
  password : 'salasana', // voi olla tyhjäkin, käyttäkää sitä mikä teillä on
  database : 'asiakas' // tai asiakas_wojak
});

module.exports = 
{
    fetchTypes: function (req, res) {
      var sql = 'SELECT avain, lyhenne, selite FROM asiakastyyppi';  
      connection.query(sql, function(error, results, fields){
        if ( error ){
            console.log("Virhe haettaessa dataa Asiakastyyppi-taulusta: " + error);
            res.status(500); // Tämä lähtee selaimelle
            res.json({"status" : "ei toiminut"}); // Ja tämä lähtee selaimelle
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json(results); // onnistunut data lähetetään selaimelle (tai muulle)
        }
    });

    },

    fetchCustomers: function(req, res){
      console.log(req.query.asty_avain);
      var sql = 'SELECT avain, nimi, osoite, postinro, postitmp, luontipvm, asty_avain from asiakas where 1 = 1;';
      if (req.query.nimi != null)
        sql = sql + " and nimi like '" + req.query.nimi + "%'";
      if (req.query.osoite != null)
        sql = sql + " and osoite like '" + req.query.osoite + "%'";     
      if (req.query.asty_avain != null && req.query.asty_avain != "")
        sql += " and asty_avain=" + req.query.asty_avain;
        
        connection.query(sql, function(error, results, fields){
          if ( error ){
              console.log("Virhe haettaessa dataa Asiakas-taulusta: " + error);
              res.status(500); // Tämä lähtee selaimelle
              res.json({"status" : "ei toiminut"}); // Ja tämä lähtee selaimelle
          }
          else
          {
            console.log("Data = " + JSON.stringify(results));
            res.json(results);
          }
      });
        
        
      },

    create: function(req, res){
      var sql = "INSERT INTO asiakas (avain, nimi, osoite, postinro, postitmp, luontipvm, asty_avain)";
                
      connection.query(sql, function (error, results, fields){
        if ( error ){
          console.log("Virhe lisätessä tietokantaan " + error);
          res.status(500); // Tämä lähtee selaimelle
          res.json({"status" : "Lisäys ei toiminut"}); // Ja tämä lähtee selaimelle
        }
        else
        {
          res.status("Kutsuttiin crate")
          console.log("Lisättiin" + JSON.stringify(results));
        }
      });
      },


    update: function(req, res){

    },

    delete : function (req, res) {
      // connection.query...
      // DELETE FROM asiakas WHERE avain=13;

      var sql = "DELETE FROM asiakas WHERE avain = 1";
      connection.query(sql, function(error, results, fields){
        if(error){
          console.log("Virhe poistaessa titokannasta" + error);
          res.status(500);
          resizeBy.json({"status" : "Poisto on epäonnistunut"});
          
        }
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.params)); // Tänne tulee id: req.params.id
        console.log("Poisto onnistui!")
        res.send("Kutsuttiin delete");
      });
        

      }
}
