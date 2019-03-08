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
      expect(games).toHaveLength(games.length);
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

  describe("getAll", () => {
    it("should find all games in the database", async () => {
      const game = await Games.insert({
        title: "Skyrim",
        genre: "action role-playing game",
        releaseYear: 2011
      });
      expect(game.title).toBe("Skyrim");
      try {
        const games = await Games.getAll();
        expect(games).toHaveLength(1);
        await db("games").truncate();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
