/*
This file contains all the endpoints which are accessible only to the admin.
The endpoints are
GET /users
POST /users
PUT  /users
DELETE  /users
NOTE:
The above users endpoints are not present in this file as they are all the users
endpoints this API has, they are present in a separate file, users.js
All those still come under the ADMIN endpoints

PUT /topics
DELETE /topics
DELETE /articles
*/


// Importing the topics model
var Topics = require('../models/topic.js');
var Articles = require('../models/article.js');

var db = require('../db.js'); //this file contains the knex file import. it's equal to knex=require('knex')

module.exports = function(app) {

  app.put('/topics',function(req,res){
    /*
    This is a PUT endpoint for updating a topic information.
    It takes the id of the topic to be updated and then updates it with the new object.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise

    TODO: Add updates only for columns that are in the request body. Handle exceptions.
    */
    Topics.forge({id: req.body.id})
    .save({name: req.body.name, description: req.body.description})
      .then(function(topic) {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B125',
          data: topic
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B126',
          data: {

          }
        });
      });
  });


  app.delete('/topics',function(req,res){
    /*
    This is a DELETE endpoint for delete a complete topic from the database.
    It takes the id of the topic and then delete that record from the database.
    the error key in the returning object is a boolen which is false if there is no error and true otherwise
    */

    Topics.forge({id: req.body.id})
    .destroy()
      .then(function() {
        res.json({
          error: {
            error: false,
            message: ''
          },
          code: 'B127',
          data: {

          }
        });
      })
      .catch(function (error) {
        res.status(500).json({
          error: {
            error: true,
            message: error.message
          },
          code: 'B128',
          data: {

          }
        });
      });
  });


    app.delete('/articles',function(req,res){
      /*
      This is a DELETE endpoint for delete a complete article from the database.
      It takes the id of the article and then deletes that record from the database.
      the error key in the returning object is a boolen which is false if there is no error and true otherwise
      */

      Articles.forge({id: req.body.id})
      .destroy()
        .then(function() {
          res.json({
            error: {
              error: false,
              message: ''
            },
            code: 'B109',
            data: {

            }
          });
        })
        .catch(function (error) {
          res.status(500).json({
            error: {
              error: true,
              message: error.message
            },
            code: 'B110',
            data: {

            }
          });
        });
    });

}