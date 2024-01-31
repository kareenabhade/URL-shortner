const express = require("express");
const app = express();

const urlRoute = require("./routes/url");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/short-url").then(
    console.log("mongodb connected")
);

const PORT = 8000;
app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, ()=>{console.log(`the server is running at PORT : ${PORT}`)});