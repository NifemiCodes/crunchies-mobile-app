import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementCartCount, decrementCartCount, updateItemCount, addToCart, removeFromCart } from "@/features/cartSlice";
import { CartProduct, Product, RootState } from "@/app/_layout";

const AddButton = ({ product, moreStyles }: { product: Product; moreStyles?: string }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const cartProduct = useSelector((state: RootState) => state.cart.value.cartItems).find((item: CartProduct) => item.id === product.id);

  // watch for whenever the product list is updated
  // and set count to the updated product's count
  useEffect(() => {
    if (cartProduct) {
      const cp = cartProduct as unknown as CartProduct;
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
      dispatch(addToCart({ ...product, productCount: newCount }));
      dispatch(incrementCartCount());
    } else {
      dispatch(updateItemCount({ ...product, productCount: newCount }));
    }
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    if (newCount === 0) {
      // final remove from cart
      dispatch(removeFromCart({ id: product.id }));
      dispatch(decrementCartCount());
    } else {
      dispatch(updateItemCount({ id: product.id, productCount: newCount }));
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
