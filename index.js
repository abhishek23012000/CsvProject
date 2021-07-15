const express = require("express");
const bodyParser = require("body-parser");
const csv = require('csv-parser')

const port = 8000;
const db = require("./config/mongoose");


const app = express();
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("./assets"));
const session = require("express-session");
//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
app.use(flash());
app.use(customMware.setFlash);
app.use("/", require("./routes/index"));


app.listen(port, function(err){
    if(err){console.log("Error in running Server", err); return;}
    console.log("Server is up and running at port", port);
});

