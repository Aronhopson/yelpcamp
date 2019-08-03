var  express      = require("express"),
     app          = express(),
     bodyParser   = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

    //execute the functions which is exports
  
mongoose.connect("mongodb://localhost:27017/yelp_camp6", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();  

// passport Configuration
app.use(require("express-session")({
    secret: "Mr hopson now your time starts",
    resave: false,
    saveUninitialized: false
}))
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


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
 app.get("/campgrounds/:id/comments/new" ,isLoggedIn,  function(req, res){
     //find campground by id 
     Campground.findById(req.params.id, function(err, campground){
         if(err){
             console.log(err);
         } else{
            res.render("comments/new", {campground: campground});
         }
     });
    
 });

 app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
//===========================
 //AUTHEN
 //===========================

 //show register form
 app.get("/register", function(req, res){
     res.render("register");
 });

 //handle sign up logic
 app.post("/register", function(req, res){
    var newUser = User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        });
    }); 
 });

 //login form
 app.get("/login", function(req, res){
     res.render("login");
 });
 //handling login logic
app.post("/login", passport.authenticate("local", 
       {successRedirect: "/campgrounds",
        failureRedirect: '/login' 
              }), function(req,res){
    res.send("login");
});

//logic logouit route
app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next)
{
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


app.listen(3000, function(){
    console.log("This is yelp server started");
});