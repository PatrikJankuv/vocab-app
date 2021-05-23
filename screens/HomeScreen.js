import * as React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { openConnection, allWords, ch } from "./../Database";
import { color_primary, color_grey } from "./../util/Colors.js";
import { FavoriteIconStar } from "./Components/FavoritIconStar";

const db = openConnection();

const Item = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>
          #{item.rank} {item.word}
        </Text>
        <Text style={styles.translate}>{item.hint}</Text>
      </View>
      <View style={styles.favorite}>
        <FavoriteIconStar
          size={25}
          favorite_prop={item.favorite}
          id={item.id}
          db={db}
        />
      </View>
    </View>
  </View>
);

export function HomeScreen() {
  const [array, set_array] = React.useState([]);

  React.useEffect(() => {
    allWords(db, set_array);
  }, []);

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={array}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 3,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 21,
  },
  translate: {
    fontSize: 16,
    color: color_primary,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  favorite: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
});
