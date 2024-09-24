import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Header from "@/components/homeTab/Header";
import Location from "@/components/homeTab/Location";
import Promotions from "@/components/homeTab/Promotions";
import Categories from "@/components/homeTab/Categories";
import Menu from "@/components/homeTab/Menu";
import HotDeals from "@/components/homeTab/HotDeals";
import Trending from "@/components/homeTab/Trending";
import Recommended from "@/components/homeTab/Recommended";
import Crunchies from "@/components/homeTab/Crunchies";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/userSlice";
import { setFavourites } from "@/features/favouritesSlice";

// backdrop blur -- X
// drop shadow -- X
// categories focus styles -- X
// scroll view height issues -- done-ish
// tab bar marker animation -- done-ish(a bit slow, check that out)

const homeTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const favs = await AsyncStorage.getItem("favourites");
        const userObj = user && JSON.parse(user);
        const parsedFavs = favs && JSON.parse(favs);
        console.log("user: ", userObj, "favs: ", parsedFavs);

        // set global state values
        dispatch(setUser(userObj));
        dispatch(setFavourites(parsedFavs));
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ rowGap: 16, paddingBottom: "25%" }}>
        <Header />
        <Location />
        <Promotions />
        <Categories />
        <Menu />
        <HotDeals />
        <Trending />
        <Recommended />
        <Crunchies />
      </ScrollView>
    </SafeAreaView>
  );
};
export default homeTab;
