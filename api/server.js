const express = require("express");

const gamesRouter = require("../games/gamesRouter.js");
const games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.use("/api/games", gamesRouter);

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Code me, Disney" });
});

module.exports = server;
