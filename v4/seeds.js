var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "rose",
        image : "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description : "love love love "
    },
    {
        name: "rose 11",
        image : "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description : "love love love "
    }
]

function seedDB() {

    //remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
            console.log("removed campgrounds");
    });

    //add campground 
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("Added campground");
                //Create comments
                Comment.create({
                    text: "amazing beautiful",
                    author :  "Hopson"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("CReated");
                    }
                });
            }
        });
    });
}

//exports the above function
module.exports = seedDB;
