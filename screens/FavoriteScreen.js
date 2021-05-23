import * as React from "react";
import { openConnection } from "./../Database";
import { WordsFlatList } from "./Components/WordsFlatList";

const db = openConnection();

export function FavoriteScreen() {
  return <WordsFlatList database={db} favorite={true}></WordsFlatList>;
}
