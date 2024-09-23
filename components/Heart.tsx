import { Image, TouchableOpacity } from "react-native";
import { useEffect } from "react";
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
  const favourites = useSelector((state: RootState) => state.favourites.value);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    })();
  }, [favourites]);

  const likeItem = async () => {
    dispatch(addFavourite(productId));
    try {
      const res = await fetch(`${baseURL}/favourites/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: productId, uid: user._id }),
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

  const unLikeItem = async () => {
    dispatch(removeFavourite(productId));
    try {
      const res = await fetch(`${baseURL}/favourites/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user._id, pid: productId }),
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

  return favourites.includes(productId) ? (
    <TouchableOpacity className={`bg-white h-5 w-5 rounded-full items-center justify-center ${heartStyles}`} onPress={unLikeItem}>
      <Image className="w-[51%] h-[50%] justify-self-center" source={require("../assets/images/heart-liked.png")} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity className={heartStyles} onPress={likeItem}>
      <Image className="w-5 h-5" source={require("../assets/images/heart-icon.png")} />
    </TouchableOpacity>
  );
};
export default Heart;
