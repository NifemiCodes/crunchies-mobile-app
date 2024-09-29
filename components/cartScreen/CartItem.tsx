import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { cartProduct } from "@/app/_layout";
import { products } from "@/products";
import { useDispatch } from "react-redux";
import { decrementCartCount, removeFromCart, updateItemCount } from "@/features/cartSlice";

const CartItem = ({ product }: { product: cartProduct }) => {
  const foundProduct = products.find((_product) => _product.id === product.id);
  const [count, setCount] = useState(product.productCount);
  const dispatch = useDispatch();

  // watch for when the product is changed or updated (on any screen)
  // and sync the initital value of count to the updated product Count
  useEffect(() => {
    setCount(product.productCount);
  }, [product]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    dispatch(updateItemCount({ id: product.id, productCount: newCount }));
  };

  const decrement = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    if (newCount === 0) {
      dispatch(removeFromCart({ id: product.id }));
      dispatch(decrementCartCount());
    } else {
      dispatch(updateItemCount({ id: product.id, productCount: newCount }));
    }
  };

  return (
    <View className="flex-row items-center rounded-[10px] p-3 h-[90px] border border-veryLightGrey border-solid">
      {/* image */}
      <Image className="flex-1 h-[100%] rounded-md" resizeMode="cover" source={{ uri: foundProduct?.image }} />

      {/* info */}
      <View className="flex-[2] gap-y-2 ml-2">
        <Text className="font-dmMed text-[14px] leading-6">{foundProduct?.name}</Text>

        <View className="flex-row justify-between items-center">
          <Text className="font-dmMed text-[13px] text-grey">{foundProduct?.price}</Text>

          {/* controls */}
          <View className="flex-row gap-x-4">
            <TouchableOpacity hitSlop={2} onPress={decrement}>
              <Image source={require("../../assets/images/cart-minus.png")} className="w-6 h-6" />
            </TouchableOpacity>

            <Text>{product.productCount}</Text>

            <TouchableOpacity hitSlop={2} onPress={increment}>
              <Image source={require("../../assets/images/cart-plus.png")} className="w-6 h-6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartItem;
