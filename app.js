var express= require("express")
var app = express();
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [{
    name: "camp", image: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    { name: "camp2", image: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    { name: "camp3", image: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    { name: "camp2", image: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
]

app.get("/", function(req, res){
res.render("landing");
});

app.get("/campgrounds", function(req, res){
   
    res.render("campground", {camp:campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add o camp grounds array
     var name = req.body.name;
     var image= req.body.image;
     var newcamp = {name:name, image: image}
     campground.create(newCampground, function(err, newlyCreated){
         if(err){
             console.log(err)
         } else {
 //redirect to campgrounds page
 res.redirect("/campgrounds");
         }
     })
    
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
 });


app.listen(3000, function(){
    console.log("this is yelp server started");
});