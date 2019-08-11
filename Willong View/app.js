var  express      = require("express"),
     app          = express(),
     bodyParser   = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Methodride    = require("method-override"),
    flash         = require("connect-flash"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

//Requiring route
 var campgroundRoutes = require("./routes/campgrounds"),
        commentsRoutes   = require("./routes/comments"),
        indexRoutes      = require("./routes/index");
    
        //execute the functions which is exports
  
mongoose.connect("mongodb://localhost:27017/yelp_campfinal", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(Methodride("_method"));
app.use(flash());
//seed data base
//seedDB();  

// Passport Configuration
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

 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
 });

 app.use("/" ,indexRoutes);
 app.use("/campgrounds", campgroundRoutes);
 app.use("/campgrounds/:id/comments", commentsRoutes);


app.listen(3000, function(){
    console.log("This is yelp server started");
});