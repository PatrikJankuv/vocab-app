import * as React from "react";
import { openConnection } from "./../Database";
import { WordsFlatList } from "./Components/WordsFlatList";

const db = openConnection();

export function HomeScreen() {
  return <WordsFlatList database={db}></WordsFlatList>;
}
