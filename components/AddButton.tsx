import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementCartCount, decrementCartCount, updateItemCount, addToCart, removeFromCart } from "@/features/cartSlice";
import { cartProduct, RootState } from "@/app/_layout";

const AddButton = ({ productId, moreStyles }: { productId: string; moreStyles?: string }) => {
  const cartProduct = useSelector((state: RootState) => state.cart.value.cartItems).find((item: cartProduct) => item.id === productId);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartProduct) {
      const cp = cartProduct as unknown as cartProduct;
      setCount(cp.productCount);
    } else {
      setCount(0);
    }
  }, [cartProduct]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (count === 0) {
      // initial add to cart
      dispatch(addToCart({ id: productId, productCount: newCount }));
      dispatch(incrementCartCount());
    } else {
      dispatch(updateItemCount({ id: productId, productCount: newCount }));
    }
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    if (newCount === 0) {
      // final remove from cart
      dispatch(removeFromCart({ id: productId }));
      dispatch(decrementCartCount());
    } else {
      dispatch(updateItemCount({ id: productId, productCount: newCount }));
    }
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
