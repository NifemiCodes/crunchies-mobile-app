import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { incrementCartCount, decrementCartCount, updateItemCount, addToCart, removeFromCart } from "@/features/cartSlice";

const AddButton = ({ productId, moreStyles }: { productId: string; moreStyles?: string }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const increment = () => {
    setCount((prev) => prev + 1);
    const newCount = count + 1;
    if (count === 0) {
      dispatch(addToCart({ id: productId, productCount: newCount }));
      dispatch(incrementCartCount());
    } else {
      dispatch(updateItemCount({ id: productId, productCount: newCount }));
    }
  };

  const decrement = () => {
    const newCount = count - 1;
    if (newCount === 0) {
      dispatch(removeFromCart({ id: productId }));
      dispatch(decrementCartCount());
    } else {
      dispatch(updateItemCount({ id: productId, productCount: newCount }));
    }
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return count > 0 ? (
    <View className={`flex-row justify-between items-center h-7 bg-red rounded-[6px] ${moreStyles}`}>
      <TouchableOpacity className="flex-1 h-7 justify-center items-center border-r border-r-whiteT border-solid" onPress={decrement}>
        <Image className="w-2" source={require("../assets/images/minus-icon.png")} />
      </TouchableOpacity>

      <Text className="flex-[2] text-lightGrey text-center">{count} in bag</Text>

      <TouchableOpacity className="flex-1 h-7 justify-center items-center border-l border-l-whiteT border-solid" onPress={increment}>
        <Image className="w-2 h-2" source={require("../assets/images/plus-icon.png")} />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity className={`border border-solid border-red rounded-[6px] h-7 justify-center items-center ${moreStyles}`} onPress={increment}>
      <Text className="font-dm text-red">Add to bag</Text>
    </TouchableOpacity>
  );
};
export default AddButton;
