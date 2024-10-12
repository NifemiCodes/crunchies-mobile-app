import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { CartProduct, RootState } from "@/app/_layout";
import CartItem from "./CartItem";
import Coupon from "./Coupon";
import TotalTable from "../TotalTable";
import CustomButton from "../CustomButton";
import { router } from "expo-router";

const Cart = () => {
  const cartList: CartProduct[] = useSelector((state: RootState) => state.cart.value.cartItems);

  return cartList.length == 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text className="font-dmMed text-[15px] mt-[-20%]">No items in Cart</Text>
    </View>
  ) : (
    <View className="mt-5 flex-1">
      {/* list */}
      <View className="flex-1">
        <ScrollView contentContainerStyle={{ rowGap: 18 }}>
          {cartList.map((item, index) => (
            <CartItem key={index} product={item} />
          ))}
        </ScrollView>
      </View>

      {/* total */}
      <View className="flex-1 border-t border-t-solid border-t-veryLightGrey mt-[18px]">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "5%" }}>
          <Coupon />
          <TotalTable screen="cart" />
        </ScrollView>
      </View>
    </View>
  );
};
export default Cart;
