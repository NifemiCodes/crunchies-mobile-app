import { ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import SectionHeading from "@/components/checkout/SectionHeading";
import HeaderWithBack from "@/components/HeaderWithBack";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import TotalTable, { priceToNumber } from "@/components/TotalTable";
import { baseURL, CartProduct, OrderProduct, RootState, wsURL } from "./_layout";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "@/features/cartSlice";
import { router } from "expo-router";
import { addOrder } from "@/features/ordersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkout = () => {
  const [method, setMethod] = useState("paystack");
  const [paymentURL, setPaymentURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [paymentStatus, setPaymentStatus] = useState("");
  const user = useSelector((state: RootState) => state.user.value);
  const checkoutInfo = useSelector((state: RootState) => state.checkout.value);
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const chooseMethod = (methodName: "paystack" | "flutterwave" | "POD") => {
    setMethod(methodName);
  };

  const callbackUrl = "myapp://orders";
  const cancelUrl = "myapp://cart";

  useEffect(() => {
    const websocket = new WebSocket(wsURL || "");
    setWebsocket(websocket);
    return () => websocket.close();
  }, []);

  if (websocket) {
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPaymentStatus(data.paymentStatus);
    };
  }

  const initialzePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/payment/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, amount: priceToNumber(checkoutInfo.price), callbackUrl: callbackUrl, cancelUrl: cancelUrl }),
      });
      const data = await res.json();
      if (data.status) {
        setPaymentURL(data.data.authorization_url);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Error initializing payment", error.message);
    }
    setLoading(false);
  };

  const updateOrders = async (ordersList: OrderProduct[]) => {
    try {
      // local storage
      const storedOrders = await AsyncStorage.getItem("orders");
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        await AsyncStorage.setItem("orders", JSON.stringify([...parsedOrders, ...ordersList]));
      } else {
        await AsyncStorage.setItem("orders", JSON.stringify(ordersList));
      }

      // db storage
      const res = await fetch(`${baseURL}/orders/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.id, orders: [...ordersList] }),
      });
    } catch (error: any) {
      console.warn("error updating orders: ", error.message);
    }
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      const orders = cart.cartItems.map((item: CartProduct) => ({
        ...item,
        date: new Date().toDateString(),
        time: `${new Date().toLocaleTimeString()}${new Date().getHours() >= 12 ? "PM" : "AM"}`,
      }));
      dispatch(addOrder(orders));
      updateOrders(orders);
      dispatch(resetCart());
      router.navigate("/(tabs)/orders");
    }
  }, [paymentStatus]);

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
