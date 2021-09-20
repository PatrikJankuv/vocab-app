import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import * as Color from "./../../utils/Colors";

export function Primary_Button({ title }) {
  React.useEffect(() => {}, []);

  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Color.color_primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});