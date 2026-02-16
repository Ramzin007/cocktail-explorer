import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index");
})

app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
})