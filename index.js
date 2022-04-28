const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
const path = require("path");
dotenv.config();

//allow access from anywhere middleware
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "https://ephemeral-twilight-e390d2.netlify.app/");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "token, Token, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
});

//routes
const animeRoute = require("./routes/anime");
const authRoute = require("./routes/auth");
const animeInfoRoute = require("./routes/animeInfo");


const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
    .then(() =>  console.log("DB connection ok !"))
    .catch((err) => console.log(err));


app.use(express.json());

app.use("/api/anime", animeRoute);
app.use("/api/info", animeInfoRoute);
app.use("/api/auth", authRoute);

//heroku set up
if(!process.env.LOCALHOST) {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "/client/build", "index.html"));
    });
}



app.listen(process.env.PORT || 5000, () => {
    console.log("server running...");
});
