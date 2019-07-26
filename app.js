var express= require("express")
var app = express();
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var campgrounds = [{
    name: "camp", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOFdG-s5swRW6HE4toKFV6ZhF7UpGvpoIuL-FjVcXzgUFeDPJ"},
    { name: "camp2", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOFdG-s5swRW6HE4toKFV6ZhF7UpGvpoIuL-FjVcXzgUFeDPJ"},
    { name: "camp3", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOFdG-s5swRW6HE4toKFV6ZhF7UpGvpoIuL-FjVcXzgUFeDPJ"},
    { name: "camp2", image: "image/will.jpg"}
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
     campgrounds.push(newcamp);
     //redirect to campgrounds page
     res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new");
 });


app.listen(3000, function(){
    console.log("this is yelp server started");
});