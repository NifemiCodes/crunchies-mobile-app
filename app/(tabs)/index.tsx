import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView } from "react-native";
import Header from "@/components/homeTab/Header";
import Location from "@/components/homeTab/Location";
import Promotions from "@/components/homeTab/Promotions";
import Categories from "@/components/homeTab/Categories";
import Menu from "@/components/homeTab/Menu";
import HotDeals from "@/components/homeTab/HotDeals";
import Trending from "@/components/homeTab/Trending";
import Recommended from "@/components/homeTab/Recommended";
import Crunchies from "@/components/homeTab/Crunchies";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/userSlice";
import { setFavourites } from "@/features/favouritesSlice";
import { baseURL, RootState, UserLocation } from "../_layout";
import NetInfo from "@react-native-community/netinfo";
import * as ExpoLocation from "expo-location";

// backdrop blur -- X
// drop shadow -- X
// categories focus styles -- X
// scroll view height issues -- done-ish
// tab bar marker animation -- done-ish(a bit slow, check that out)

const homeTab = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [userPermission, setUserPermission] = useState(false);
  const [location, setLocation] = useState<UserLocation | string>("");
  const dispatch = useDispatch();

  const syncDbFavouritesList = async (uid: string, favs: string[]) => {
    await fetch(`${baseURL}/setFavourites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: uid, favourites: favs }),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const favs = await AsyncStorage.getItem("favourites");
        const parsedUser = user && JSON.parse(user);
        const parsedFavs = favs && JSON.parse(favs);

        // set global state
        if (user) {
          dispatch(setUser(parsedUser));
          dispatch(setFavourites(parsedFavs));
        }

        // get user's location permission
        const permission = await ExpoLocation.getForegroundPermissionsAsync();
        if (permission.status === "granted") {
          setUserPermission(permission.granted);
        } else {
          const response = await ExpoLocation.requestForegroundPermissionsAsync();
          setUserPermission(response.granted);
        }

        // perform network essential tasks if available
        const networkState = await NetInfo.fetch();
        if (networkState.isConnected) {
          await syncDbFavouritesList(parsedUser.id, parsedFavs);
        }
      } catch (error: any) {
        console.log("error in index home tab", error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (userPermission) {
      (async () => {
        setLocation("getting user location...");
        try {
          const { coords } = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Balanced });
          const { longitude, latitude } = coords;
          const place = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
          setLocation({ city: place[0].city, region: place[0].region, name: place[0].name });
        } catch (error: any) {
          console.log(error.message);
          setLocation("");
          Alert.alert("Error fetching user location", "Please make sure you have network connection");
        }
      })();
    }
  }, [userPermission]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ rowGap: 16, paddingBottom: "25%" }}>
        <Header firstName={user.name.split(" ")[0]} />
        <Location location={location} />
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
