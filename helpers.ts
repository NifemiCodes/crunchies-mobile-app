import AsyncStorage from "@react-native-async-storage/async-storage";

// check user authentication state (signed in or signed out)
export const checkAuthState = async () => {
  try {
    const token = await AsyncStorage.getItem("user-token");
    return token ? true : false;
  } catch (error: any) {
    console.warn(error.message);
  }
};

// store data to local storage
export const storeData = async (token: string, userData: object, favs: string, orders: string) => {
  try {
    await AsyncStorage.setItem("user-token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("favourites", JSON.stringify(favs));
    await AsyncStorage.setItem("orders", JSON.stringify(orders));
  } catch (error: any) {
    console.warn("error storing to local storage: ", error.message);
  }
};
