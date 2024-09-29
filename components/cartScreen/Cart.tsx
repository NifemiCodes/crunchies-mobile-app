import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_layout";
import CartItem from "./CartItem";

const Cart = () => {
  const cartList = useSelector((state: RootState) => state.cart.value.cartItems);

  return cartList.length == 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text className="font-dmMed text-[15px] mt-[-20%]">No items in Cart</Text>
    </View>
  ) : (
    <View className="mt-5">
      <ScrollView contentContainerStyle={{ rowGap: 18 }}>
        {cartList.map((item, index) => (
          <CartItem key={index} product={item} />
        ))}
      </ScrollView>
    </View>
  );
};
export default Cart;
