import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import CheckoutValue from "./cartScreen/CheckoutValue";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import type { CartProduct, RootState } from "@/app/_layout";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutCount, setCheckoutPrice } from "@/features/checkoutSlice";

// convert price string to number
export const priceToNumber = (price: string) => {
  const numberPrice = price.replace(price[0], "").replaceAll(",", "");
  return Number(numberPrice);
};

const TotalTable = ({ screen, makePaymentFunc }: { screen: "cart" | "checkout"; makePaymentFunc: () => void }) => {
  const cartList = useSelector((state: RootState) => state.cart.value.cartItems);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState<string>();
  const dispatch = useDispatch();

  const numberToPrice = (value: number) => {
    const valueStr = value.toString();
    const length = valueStr.length;

    if (length <= 3) {
      return `₦${value}`;
    } else if (length === 4) {
      const endDigits = valueStr.substring(1);
      return `₦${valueStr[0]},${endDigits}`;
    } else if (length >= 5) {
      const sliceEnd = length === 5 ? 2 : length === 6 ? 3 : length >= 7 ? 1 : 0;
      const firstDigits = valueStr.slice(0, sliceEnd);
      const endDigitsArr = valueStr.slice(sliceEnd).split("");
      const sepDigits = endDigitsArr.map((digit, index) => (index + (1 % 3) === 0 && index + 1 < length ? digit.concat(",") : digit));
      return `₦${firstDigits},${sepDigits.join("")}`;
    }
  };

  // calculate total values
  const calcTotal = (list: CartProduct[]) => {
    // calculate the total number of items in the cart
    const countsArray = list.map(item => item.productCount);
    const totalCount = countsArray.reduce((acc, curr) => acc + curr);
    setTotalItems(totalCount);

    // calculate the total cost of items in the cart
    const pricesArray = list.map(item => priceToNumber(item.price) * item.productCount);
    const priceTotal = pricesArray.reduce((acc, curr) => acc + curr);
    setTotalPrice(numberToPrice(priceTotal));
  };

  useEffect(() => {
    calcTotal(cartList);
  }, [cartList]);

  const handleCheckout = () => {
    dispatch(setCheckoutCount(totalItems));
    dispatch(setCheckoutPrice(totalPrice));
    router.push("/checkout");
  };

  return (
    <View>
      <View className="gap-y-4 border-b border-b-solid border-b-veryLightGrey pb-4 mb-4">
        <View>
          <CheckoutValue name="Total Items" value={`${totalItems === 0 ? "00" : totalItems}`} />
        </View>
        <View>
          <CheckoutValue name="Subtotal" value={totalPrice || "₦0.00"} />
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
        <Text className="font-dmMed text-[16px] leading-5">{totalPrice}</Text>
      </View>

      {screen === "cart" ? (
        <CustomButton text="Check Out" btnFunction={handleCheckout} />
      ) : (
        <CustomButton text="Make Payment" btnFunction={makePaymentFunc} />
      )}
    </View>
  );
};
export default TotalTable;
