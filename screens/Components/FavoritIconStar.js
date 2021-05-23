import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { changeFavorite } from "../../Database";

export function FavoriteIconStar({ size, id, favorite_prop, db }) {
  const [favorite, setFavorite] = React.useState(favorite_prop);

  const changeFavoriteState = () => {
    if (favorite === 0) {
      setFavorite(1);
      changeFavorite(db, id, 1);
    } else {
      setFavorite(0);
      changeFavorite(db, id, 0);
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={changeFavoriteState} style={{ padding: 10 }}>
        {favorite === 1 ? (
          <Ionicons name={"ios-star-sharp"} size={size} />
        ) : (
          <Ionicons name={"ios-star-outline"} size={size} />
        )}
      </TouchableOpacity>
    </View>
  );
}
