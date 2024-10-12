import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CheckoutAddress from "@/components/checkout/CheckoutAddress";
import SectionHeading from "@/components/checkout/SectionHeading";
import HeaderWithBack from "@/components/HeaderWithBack";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import TotalTable from "@/components/TotalTable";
import CardDetailsModal from "./../components/checkout/CardDetailsModal";

const checkout = () => {
  const [method, setMethod] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const chooseMethod = (methodName: "paystack" | "flutterwave" | "POD") => {
    setMethod(methodName);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {modalVisible && <View className="absolute z-[1] top-0 right-0 bottom-0 left-0 bg-blackT"></View>}
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
            <TotalTable screen="checkout" makePaymentFunc={() => setModalVisible(true)} />
          </View>
        </View>

        <CardDetailsModal isVisible={modalVisible} dismissFunction={() => setModalVisible(false)} paymentMethod={method} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default checkout;
