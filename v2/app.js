var  express      = require("express"),
     app          = express(),
     bodyParser   = require("body-parser"),
      mongoose    = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

//  Campground.create ({    
//       name: "Aron",   
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOFdG-s5swRW6HE4toKFV6ZhF7UpGvpoIuL-FjVcXzgUFeDPJ",
//       description: "This is such a beautiful place huh"
//     },
//       function(err, campground){
//          if(err){
            
//              console.log(err);
//          } else{              console.log("New yelp camp started");
//               console.log(campground);
//          }
//  });

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
         res.render("index", {camp: allCampgrounds});
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
  res.render("new.ejs");
 });

 //form ID
 app.get("/campgrounds/:id", function(req, res){
     //find the camp ground with ID
     Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
             console.log(err);
         } else {
            res.render("show", {campground: foundCampground});
         }
     });
    
 });


app.listen(3000, function(){
    console.log("This is yelp server started");
});