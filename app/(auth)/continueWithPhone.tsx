import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const continueWithPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeAreaView className="p-5 flex-1 bg-white">
      <AuthHeader title="Continue with Phone" />

      <View className="mt-5">
        <AuthInput
          labelTitle="Mobile Number"
          inputIcon={require("../../assets/images/phone-icon-outlined.png")}
          placeholderText="Enter Your phone number"
          boardType="number-pad"
          onChangeFunction={(text) => setPhoneNumber(text)}
        />
      </View>

      <CustomButton text="Continue" isLoading={false} />
    </SafeAreaView>
  );
};
export default continueWithPhone;
