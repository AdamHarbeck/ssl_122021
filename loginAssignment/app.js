"use strict"

let express = require('express')
let ejs = require('ejs')
let bodyParser = require("body-parser")
let request = require('request')

let session = require('express-session')

let router = express.Router()
let app = express()

app.use(session({secret: "secret", saveUninitialized: true, resave: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.engine("ejs", require("ejs").__express)

let currentSession;

// Routes
router.get("/", (req,res)=>{
    currentSession = req.session
    res.render("index", {
        pagename:"index",
        currentSession: currentSession
    })
})
router.get("/about", (req,res)=>{
    currentSession = req.session
    res.render("about", {
        pagename:"about",
        currentSession: currentSession
    })
})
router.get("/services", (req,res)=>{
    currentSession = req.session
    res.render("services", {
        pagename:"services",
        currentSession: currentSession
    })
})
// Added a profile route
router.get("/profile", (req,res)=>{
    currentSession = req.session;
    if(typeof(currentSession)== "undefined" || currentSession.loggedin != true){
        let errors = ["Not authenticated user"];
        res.render('index', {pagename: "index", errs: errors,})
    }else{
        res.render('profile', {pagename: 'profile', currentSession: currentSession,})
    }

})
// Added a logout route
router.get("/logout", (req,res)=>{
    currentSession = req.session;
    currentSession.destroy((err)=>{
        res.redirect("/")
    })
})
router.post("/login", (req,res)=>{
    console.log(req.body);
    let errors = [];
    // validate the email not blank
    if(req.body.email.trim() == "" ){
        errors.push("email cannot be blank")
    }
    // Validate password
    if(req.body.password.trim() == "" ){
        errors.push("password cannot be blank")
    }
    // validate email incorrect format
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-z0-9-]+\.[a-zA-Z0-9-.]+$/.test(req.body.email) ){
        errors.push("Invalid email address")
    }
    if(!/^[a-z0-9]{6,}$/.test(req.body.password) ){
        errors.push("Invalid password format")
    }
    console.log(errors)

    if(req.body.email == "Mike@aol.com" && req.body.password == "abc123" || req.body.email == 'mike@aol.com' && req.body.password == 'abc123'){
        currentSession = req.session;
        currentSession.loggedin=true;
        res.render('profile', {pagename: 'profile', currentSession: currentSession})
    }else{
        errors.push("invalid user")
        res.render('index', {pagename:'index', errs: errors})
    }


})
router.post("/register", (req,res)=>{
    console.log(req.body)

    // Validate the user inputs for the registration form.
    let errors = [];
    // Blank or no value
    if(req.body.firstname.trim()== ""){
        errors.push("First name cannot be blank")
    }
    if(req.body.lastname.trim()== ""){
        errors.push("Last name cannot be blank")
    }
    if(req.body.city.trim()== ""){
        errors.push("The city cannot be blank")
    }
    if(req.body.state.trim()== ""){
        errors.push("The state cannot be blank")
    }
    if(req.body.zip.trim()== ""){
        errors.push("The zip code cannot be blank")
    }
    if(req.body.age.value == 0){
        errors.push("Age cannot be 0")
    }
    if(req.body.gender == undefined){
        errors.push("Choose a gender")
    }
    if(req.body.consent == undefined){
        errors.push("Check the consent box")
    }
    if(req.body.bio.trim()== ""){
        errors.push("Bio cannot be blank")
    }

    // Wrong characters - applies to names, cities, state, and zip
    if(!/^[a-zA-Z]+$/.test(req.body.firstname)){
        errors.push("First name can only be letters")
    }
    if(!/^[a-zA-Z]+$/.test(req.body.lastname)){
        errors.push("Last name can only be letters")
    }
    if(!/^[a-zA-Z]+$/.test(req.body.city)){
        errors.push("The city can only be letters")
    }
    if(!/^[a-zA-Z]+$/.test(req.body.state)){
        errors.push("The state can only be letters")
    }
    if(!/^\d+$/.test(req.body.zip)){
        errors.push("The zip can only be numbers")
    }

    // Too many or too little characters
    if(req.body.zip.length >5 || req.body.zip.length < 5){
        errors.push("The zip is 5 numbers")
    }
    if(errors.length != 0){
        res.render("index",{pagename: "index", errs: errors,})
    }else{
        res.render("index",{pagename: "index", pass: ["You successfully registered"]})
    }
})


// Declare static files locations
app.use(express.static("views"))
app.use(express.static("public"))
app.use("/", router)

// Start server
let server = app.listen("8080", ()=>{
    console.log("Server running on port 8080!")
})