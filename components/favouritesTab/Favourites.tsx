import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "@/app/_layout";
import { products } from "@/products";
import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
  const [favouritesList, setFavouritesList] = useState<(Product | undefined)[]>([]);
  const favIds = useSelector((state: RootState) => state.favourites.value);

  useEffect(() => {
    (async () => {
      // get all favourited products out of products list
      const favouriteProducts = favIds.map((id) => products.find((product) => product.id === id));
      setFavouritesList(favouriteProducts);
    })();
  }, [favIds]);

  return favouritesList.length === 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text className="font-dm text-[17px]">No Items Added</Text>
    </View>
  ) : (
    <View className="flex-[1] mt-8">
      <FlatList
        data={favouritesList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <FavouriteItem product={item} key={index} />}
        contentContainerStyle={{ paddingBottom: "32%" }}
      />
    </View>
  );
};

export default Favourites;
