import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import CheckoutValue from "./checkoutValue";
import CustomButton from "../CustomButton";
import { CartProduct } from "@/app/_layout";

const CartTotal = ({ cartList }: { cartList: CartProduct[] }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // convert price string to number
  const priceToNumber = (price: string) => {
    const numberPrice = price.replace(price[0], "").replaceAll(",", "");
    return Number(numberPrice);
  };

  // calculate total values
  const calcTotal = (list: CartProduct[]) => {
    // calculate the total number of items in the cart
    const countsArray = list.map((item) => item.productCount);
    const totalCount = countsArray.reduce((acc, curr) => acc + curr);
    setTotalItems(totalCount);

    // calculate the total cost of items in the cart
    const pricesArray = list.map((item) => priceToNumber(item.price) * item.productCount);
    const priceTotal = pricesArray.reduce((acc, curr) => acc + curr);
    setTotalPrice(priceTotal);
  };

  useEffect(() => {
    calcTotal(cartList);
  }, [cartList]);

  return (
    <View className="flex-1 border-t border-t-solid border-t-veryLightGrey mt-[18px]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "40%" }}>
        {/* coupon */}
        <View className="w-full h-[45px] my-5 flex-row items-center justify-between border border-solid border-veryLightGrey rounded-md overflow-hidden">
          <View className="flex-[2] flex-row items-center gap-x-2">
            <View className="border-r border-r-veryLightGrey border-r-solid px-2 py-1">
              <Image className="w-8 h-[18px]" source={require("../../assets/images/cart-coupon.png")} />
            </View>
            <Text className="font-dm text-[13px] text-grey">Coupon code</Text>
          </View>

          <TouchableOpacity className="bg-darkGreen items-center justify-center flex-[0.68] h-full">
            <Text className="text-white font-dmMed text-[13px]">Apply</Text>
          </TouchableOpacity>
        </View>

        {/* table */}
        <View>
          <View className="gap-y-4 border-b border-b-solid border-b-veryLightGrey pb-4 mb-4">
            <View>
              <CheckoutValue name="Total Items" value={`${totalItems === 0 ? "00" : totalItems}`} />
            </View>
            <View>
              <CheckoutValue name="Subtotal" value={`₦${totalPrice === 0 ? "0.00" : totalPrice}`} />
            </View>
            <View>
              <CheckoutValue name="Delivery Fee" value="Free" />
            </View>
            <View>
              <CheckoutValue name="VAT" value="₦0.00" />
            </View>
          </View>

          <View className="w-full mb-5 flex-row items-center justify-between">
            <Text className={"font-dmMed text-[16px] leading-5"}>Total Amount</Text>
            <Text className="font-dmMed text-[16px] leading-5">{`₦${totalPrice}`}</Text>
          </View>
        </View>
        <CustomButton text="Check Out" />
      </ScrollView>
    </View>
  );
};
export default CartTotal;
