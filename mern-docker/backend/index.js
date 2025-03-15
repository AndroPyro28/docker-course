const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();
colors.enable();

const Anim = require("./database/anim.model");
const connect = require("./database/connect");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World!".rainbow);

  res.send("Hello World!");
});

app.get("/api/anime", async (req, res) => {
  const anime = await Anim.find();
  res.json(anime);
});

app.post("/api/anime", async (req, res) => {
  const anime = new Anim(req.body);
  await anime.save();
  res.json(anime);
});

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
  console.log("server listening on port ",PORT);

  // connect to the database
  connect();
});
