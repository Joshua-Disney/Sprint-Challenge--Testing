exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("games")
    .truncate()
    .then(function() {
      return knex("games").insert([
        { title: "Kingdom Hearts", genre: "platformer", releaseYear: 2002 },
        {
          title: "Legend of Zelda",
          genre: "action-adventure",
          releaseYear: 1986
        },
        { title: "Mario Party", genre: "party game", releaseYear: 1998 },
        { title: "Silent Hill", genre: "horror-survival", releaseYear: 1999 }
      ]);
    });
};
