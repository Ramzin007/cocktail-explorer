import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/search", async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res.redirect("/");
    }

    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    );

    const drinks = response.data.drinks;

    if (!drinks) {
      return res.render("result", { drink: null });
    }

    res.render("result", { drink: drinks[0] });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/random", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    const drink = response.data.drinks[0];

    res.render("result", { drink });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
    console.log(`This server is running on port ${port}`);
})