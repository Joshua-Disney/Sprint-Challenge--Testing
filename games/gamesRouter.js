const express = require("express");

const Games = require("./gamesModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await Games.find();
    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The games list could not be retrieved."
    });
  }
});

router.post("/", async (req, res) => {
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

module.exports = router;
