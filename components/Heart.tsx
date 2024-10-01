import { Image, TouchableOpacity } from "react-native";
import { baseURL, RootState } from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "@/features/favouritesSlice";
//import NetInfo from "@react-native-community/netinfo";

interface HeartType {
  productId: string;
  heartStyles: string;
}

const Heart = ({ productId, heartStyles }: HeartType) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const favIds = useSelector((state: RootState) => state.favourites.value);

  //* store the latest version of the favIds state array locally;
  const updateLocalStorage = async (action: "ADD" | "REMOVE", payloadId: string) => {
    switch (action) {
      case "ADD":
        try {
          const currentValue = await AsyncStorage.getItem("favourites");
          currentValue
            ? await AsyncStorage.setItem("favourites", JSON.stringify([...JSON.parse(currentValue), payloadId]))
            : await AsyncStorage.setItem("favourites", JSON.stringify([payloadId]));
        } catch (error: any) {
          console.warn("Error updating local storage", error.message);
        }
        break;
      case "REMOVE":
        try {
          const currentValue = await AsyncStorage.getItem("favourites");
          if (currentValue) {
            const filteredList = JSON.parse(currentValue).filter((id: string) => id !== payloadId);
            await AsyncStorage.setItem("favourites", JSON.stringify(filteredList));
          }
        } catch (error: any) {
          console.warn("Error updating local storage", error.message);
        }
        break;
    }
  };

  //* update database favourites
  const updateFavourites = async (action: "ADD" | "REMOVE", payload: { uid: string; pid: string }) => {
    const url = `${baseURL}/favourites/${action === "ADD" ? "add" : "remove"}`;
    try {
      const res = await fetch(url, {
        method: action === "ADD" ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: payload.pid, uid: payload.uid }),
      });
      const data = await res.json();
      if (data.status === "ERROR") {
        throw new Error(data.message);
      }
      return data;
    } catch (error: any) {
      console.warn(error.message);
    }
  };

  //* like function
  const likeItem = async () => {
    dispatch(addFavourite(productId)); // add to global state
    await updateLocalStorage("ADD", productId); // add to local storage
    await updateFavourites("ADD", { pid: productId, uid: user.id }); // send request to add to the database
    // const networkState = await NetInfo.fetch();
    // if (networkState.isConnected) {
    // }
  };

  //* remove like function
  const unLikeItem = async () => {
    dispatch(removeFavourite(productId)); // remove from global state
    await updateLocalStorage("REMOVE", productId); // remove from local storage
    await updateFavourites("REMOVE", { pid: productId, uid: user.id }); // send request to delete from the database
    // const networkState = await NetInfo.fetch();
    // if (networkState.isConnected) {
    // }
  };

  return favIds.includes(productId) ? (
    <TouchableOpacity className={`bg-white rounded-full items-center justify-center ${heartStyles}`} onPress={productId ? unLikeItem : () => null}>
      <Image className="w-[51%] h-[50%] justify-self-center" source={require("../assets/images/heart-liked.png")} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity className={heartStyles} onPress={productId ? likeItem : () => null}>
      <Image className="w-full h-full" source={require("../assets/images/heart-icon.png")} />
    </TouchableOpacity>
  );
};
export default Heart;
