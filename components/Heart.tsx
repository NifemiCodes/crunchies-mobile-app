import { Image, TouchableOpacity } from "react-native";
import { baseURL, RootState } from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "@/features/favouritesSlice";

interface HeartType {
  productId: string;
  heartStyles: string;
}

const Heart = ({ productId, heartStyles }: HeartType) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const favIds = useSelector((state: RootState) => state.favourites.value);

  //* store the latest version of the favIds state array locally whenever there is a change to it;
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

  //* like function
  const likeItem = async () => {
    // add to global state
    dispatch(addFavourite(productId));

    // add to local storage
    updateLocalStorage("ADD", productId);

    // send request to add to the database
    try {
      const res = await fetch(`${baseURL}/favourites/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: productId, uid: user.id }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "ERROR") {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.warn(error.message);
    }
  };

  //* remove like function
  const unLikeItem = async () => {
    // remove from global state
    dispatch(removeFavourite(productId));

    // remove from local storage
    updateLocalStorage("REMOVE", productId);

    // send request to delete from the database
    try {
      const res = await fetch(`${baseURL}/favourites/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, pid: productId }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "ERROR") {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.warn(error.message);
    }
  };

  return favIds.includes(productId) ? (
    <TouchableOpacity
      className={`bg-white h-5 w-5 rounded-full items-center justify-center ${heartStyles}`}
      onPress={productId ? unLikeItem : () => null}>
      <Image className="w-[51%] h-[50%] justify-self-center" source={require("../assets/images/heart-liked.png")} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity className={heartStyles} onPress={productId ? likeItem : () => null}>
      <Image className="w-5 h-5" source={require("../assets/images/heart-icon.png")} />
    </TouchableOpacity>
  );
};
export default Heart;
