import { ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useState } from "react";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import SectionHeading from "@/components/checkout/SectionHeading";
import HeaderWithBack from "@/components/HeaderWithBack";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import TotalTable, { priceToNumber } from "@/components/TotalTable";
import { baseURL, RootState } from "./_layout";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "@/features/cartSlice";

const checkout = () => {
  const [method, setMethod] = useState("");
  const [paymentURL, setPaymentURL] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.value);
  const checkoutInfo = useSelector((state: RootState) => state.checkout.value);
  const dispatch = useDispatch();

  const chooseMethod = (methodName: "paystack" | "flutterwave" | "POD") => {
    setMethod(methodName);
  };

  const initialzePayment = async () => {
    if (!method) {
      Alert.alert("Payment gateway", "Please select a payment method.");
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/payment/initialize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, amount: priceToNumber(checkoutInfo.price) }),
        });
        const data = await res.json();
        if (data.status) {
          setPaymentURL(data.data.authorization_url);
          dispatch(resetCart());
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.log(error.message);
        Alert.alert("Error initializing payment", error.message);
      }
      setLoading(false);
    }
  };

  return paymentURL ? (
    <WebView source={{ uri: paymentURL }} style={{ flex: 1, marginTop: 30 }} />
  ) : (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWithBack headerText="Check Out" />

        {/* content */}
        <View className="mt-5">
          <View>
            <SectionHeading title="Delivery Address" />
            <CheckoutAddress />
          </View>

          <View className="mt-[29px]">
            <SectionHeading title="Payment Method" />
            <PaymentMethod
              methodIcon={require("../assets/images/paystack-icon.png")}
              methodName="PayStack"
              pressFunction={() => chooseMethod("paystack")}
              selected={method === "paystack"}
            />
            <PaymentMethod
              methodIcon={require("../assets/images/flutterwave-icon.png")}
              methodName="Flutterwave"
              pressFunction={() => chooseMethod("flutterwave")}
              selected={method === "flutterwave"}
            />
            <PaymentMethod
              methodIcon={require("../assets/images/paystack-icon.png")}
              methodName="Pay On Delivery"
              pressFunction={() => chooseMethod("POD")}
              selected={method === "POD"}
            />
          </View>

          <View className="mt-[39px] border-t border-t-veryLightGrey">
            <Text className="my-4 font-dmMed text-[16px]">Your Order</Text>
            <TotalTable screen="checkout" makePaymentFunc={initialzePayment} paymentIsLoading={loading} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default checkout;
