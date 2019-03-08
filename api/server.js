const express = require("express");

const Games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "Code me, Disney" });
});

server.get("/api/games", async (req, res) => {
  try {
    const games = await Games.getAll();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "The games list could not be retrieved."
    });
  }
});

server.post("/", async (req, res) => {
  const game = req.body;

  if (!game.title || !game.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the game."
    });
  }

  try {
    const newGame = await Games.insert(game);
    res.status(201).json(newGame);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the game to the database"
    });
  }
});

module.exports = server;
