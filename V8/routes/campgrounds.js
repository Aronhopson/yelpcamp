var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment   = require("../models/comment");

//index show all campground

router.get("/", function(req, res){
    //Get all camp grounds fro DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
         res.render("campgrounds/index", {camp: allCampgrounds});
        }
    });
    
 });

 //create route
router.post("/", function(req, res){
    //get data from form and add o camp grounds array
     var name = req.body.name;
     var image= req.body.image;
     var desc = req.body.description;
     
     var newcamp = {name: name, image: image, description: desc}
     Campground.create(newcamp, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
//redirect to campgrounds page
res.redirect("/campgrounds");
        }
    });
});

//create route for Form
router.get("/new", function(req, res){
  res.render("campgrounds/new.ejs");
 });

 //form ID // SHOW ROUTE
 router.get("/:id", function(req, res){
     //find the camp ground with ID
     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
         if(err){
             console.log(err);
         } else {
             console.log(foundCampground)
             // render show template
            res.render("campgrounds/show", {campground: foundCampground});
         }
     });
    
 });
 function isLoggedIn(req, res, next)
    {
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect("/login");
    }
    

 module.exports = router;