const request = require("supertest");

const db = require("../data/dbConfig.js");
const Games = require("./gamesModel.js");

describe("gameModel.js", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("insert", () => {
    afterEach(async () => {
      await db("games").truncate();
    });

    it("should insert the amount of games provided", async () => {
      await Games.insert({
        title: "Donkey Kong",
        genre: "platformer",
        releaseYear: 1994
      });
      await Games.insert({
        title: "Star Fox",
        genre: "shoot 'em up",
        releaseYear: 1993
      });

      const games = await db("games");
      expect(games).toHaveLength(2);
    });

    it("should insert the provided game into the database", async () => {
      let game = await Games.insert({
        title: "Minecraft",
        genre: "sandbox",
        releaseYear: 2009
      });
      expect(game.title).toBe("Minecraft");

      game = await Games.insert({
        title: "Skyrim",
        genre: "action role-playing game",
        releaseYear: 2011
      });
      expect(game.title).toBe("Skyrim");
    });
  });
});
