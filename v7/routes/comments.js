var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment   = require("../models/comment");
 
 //Comments New
 router.get("/new" ,isLoggedIn,  function(req, res){
    //find campground by id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
           res.render("comments/new", {campground: campground});
        }
    });
   
});

//Comment Create
router.post("/", isLoggedIn, function(req, res){
//lookup camppground uisng id
Campground.findById(req.params.id, function(err, campground){
if(err){
   console.log(err)
   res.redirect("/campgrounds");
} else{
   //create new comment
   Comment.create(req.body.comment, function(err, comment){
       if(err){
           console.log(err);
       } else {
           campground.comments.push(comment);
           campground.save();
           res.redirect("/campgrounds/" + campground._id);  
       }
   });  
}
});
});

 //Middleware
function isLoggedIn(req, res, next)
    {
      if(req.isAuthenticated()){
          return next();
      }
      res.redirect("/login");
    }
    

module.exports = router;