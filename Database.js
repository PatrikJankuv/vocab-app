import * as SQLite from "expo-sqlite";

export function openConnection() {
  const db = SQLite.openDatabase("database.db");
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not EXISTS Word (id integer primary key not NULL, rank Integer, word text, hint text, translate text, translate_hint text, explored integer default 0, favorite integer default 0);"
    );
  });
  return db;
}

export function initiateDatabase(db) {
  const words = require("./data/italian/data.json");

  words.map((item) =>
    db.transaction((tx) => {
      tx.executeSql("insert into Word (rank, word, hint) values (?,?,?);", [
        item.rank,
        item.word,
        item.hint,
      ]);
    })
  );

  console.log("trying to store words");
}

export const allExploredWords = (db, set_array) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Word where explored = 0",
      [],
      (_, { rows: { _array } }) => set_array(_array)
    );
  }, null);
};

export const getTopNUnexploredWords = (db, set_array, top) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * from Word WHERE explored = 0 ORDER BY rank LIMIT ?;",
      [top],
      (_, { rows: { _array } }) => set_array(_array)
    );
  }, null);
};

export const allFavoriteWords = (db, set_array) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from Word where favorite = 1",
      [],
      (_, { rows: { _array } }) => set_array(_array)
    );
  }, null);
};
export async function changeFavorite(db, id, favorite) {
  db.transaction((tx) => {
    tx.executeSql("update Word set favorite=? where id = ?", [favorite, id]);
  }, null);
  return;
}
