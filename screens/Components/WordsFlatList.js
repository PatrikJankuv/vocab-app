import * as React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import { FavoriteIconStar } from "./FavoritIconStar";
import { color_primary } from "./../../util/Colors";
import { allExploredWords, allFavoriteWords } from "../../Database";

const Item = ({ item, database }) => (
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
          db={database}
        />
      </View>
    </View>
  </View>
);

export function WordsFlatList({ database, favorite }) {
  const [array, set_array] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (favorite) {
      allFavoriteWords(database, set_array);
    } else {
      allExploredWords(database, set_array);
    }
  };

  const renderItem = ({ item }) => (
    <Item item={item} database={database} set_array={set_array} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={array}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
});
