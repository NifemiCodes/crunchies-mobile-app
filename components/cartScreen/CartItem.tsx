import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useState, useEffect } from "react";
import { CartProduct, RootState } from "@/app/_layout";
import { useDispatch, useSelector } from "react-redux";
import { decrementCartCount, removeFromCart, updateItemCount } from "@/features/cartSlice";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const CartItem = ({ product }: { product: CartProduct }) => {
  const cartitem = useSelector((state: RootState) => state.cart.value.cartItems).find((item: CartProduct) => item.id === product.id);
  const [count, setCount] = useState(product.productCount);
  const dispatch = useDispatch();

  // watch for when the product is changed or updated (on any screen)
  // and sync the initital value of count to the updated product Count
  useEffect(() => {
    setCount(product.productCount);
  }, [product]);

  // increment count
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    dispatch(updateItemCount({ id: product.id, productCount: newCount }));
  };

  // decrement count
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

  // animations
  const screenWidth = Dimensions.get("window").width;
  const minSlideDist = screenWidth * 0.1;
  const openDist = screenWidth * 0.3;

  const offset = useSharedValue<number>(0);
  const visible = useSharedValue<boolean>(false);

  const slide = Gesture.Pan()
    .hitSlop(-34)
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize((event) => {
      if (event.translationX <= -minSlideDist) {
        offset.value = -openDist;
        visible.value = true;
      } else {
        offset.value = 0;
        visible.value = false;
      }
    });
  const animatedItemStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(offset.value) }],
  }));
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: visible.value ? withTiming(1) : withTiming(0),
    transform: [{ scale: visible.value ? withTiming(1) : withTiming(0.3) }],
  }));

  const deleteItem = async () => {
    //offset.value = withTiming(-screenWidth);
    //setTimeout(() => {
    setCount(0);
    dispatch(removeFromCart({ id: product.id }));
    dispatch(decrementCartCount());
    offset.value = 0;
    //}, 300);
  };

  return (
    <View className="w-full relative">
      <GestureDetector gesture={slide}>
        <Animated.View
          className="w-full bg-white flex-row items-center rounded-[10px] p-3 h-[90px] border border-veryLightGrey border-solid"
          style={animatedItemStyles}>
          {/* image */}
          <Image className="flex-1 h-[100%] rounded-md" resizeMode="cover" source={{ uri: product.image }} />

          {/* info */}
          <View className="flex-[2] gap-y-2 ml-2">
            <Text className="font-dmMed text-[14px] leading-6">{product.name}</Text>

            <View className="flex-row justify-between items-center">
              <Text className="font-dmMed text-[13px] text-grey">{product.price}</Text>

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
        </Animated.View>
      </GestureDetector>

      {cartitem ? (
        <Animated.View className="absolute z-[-1] flex-row gap-x-3 right-[10px] top-[25%]" style={animatedStyles}>
          <TouchableOpacity>
            <Image className="w-10 h-10" source={require("../../assets/images/cart-heart.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteItem}>
            <Image className="w-10 h-10" source={require("../../assets/images/cart-delete.png")} />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};
export default CartItem;
