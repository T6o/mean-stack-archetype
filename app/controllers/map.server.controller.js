// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {

    // Grab all of the query parameters from the body.
      var lat             = req.body.latitude;
      var long            = req.body.longitude;
      var distance        = req.body.distance;
      console.log("############## "+lat+" "+long+" "+distance);

      // Opens a generic Mongoose Query. Depending on the post body we will...
      var query = Article.find({});
      // ...include filter by Max Distance (converting miles to meters)
      if(distance){


          // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
          query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

              // Converting meters to miles. Specifying spherical geometry (for globe)
              maxDistance: distance * 1609.34, spherical: true});

      }


      // Execute Query and Return the Query Results
      query.exec(function(err, users){
          if(err)
              res.send(err);
          else
              // If no errors, respond with a JSON of all users that meet the criteria
              res.json(users);
      });

      // Call the next middlewar

};
