var  express      = require("express"),
     app          = express(),
     bodyParser   = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds");

    //execute the functions which is exports
  
mongoose.connect("mongodb://localhost:27017/yelp_camp4", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();  


app.get("/", function(req, res){
res.render("landing");
});
 
//index show all campground

app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
  res.render("campgrounds/new.ejs");
 });

 //form ID // SHOW ROUTE
 app.get("/campgrounds/:id", function(req, res){
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

 //==========================================
 //COMMENTS ROUTS
 //==========================================
 app.get("/campgrounds/:id/comments/new" , function(req, res){
     //find campground by id 
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         } else{
            res.render("comments/new", {campground: campground});
         }
     });
    
 });

 app.post("/campgrounds/:id/comments", function(req, res){
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

//connect new comment to campground
//redirect camground to show page
 });

app.listen(3000, function(){
    console.log("This is yelp server started");
});