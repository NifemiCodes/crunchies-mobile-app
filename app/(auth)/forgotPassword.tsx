import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";
import * as yup from "yup";
import CustomButton from "@/components/CustomButton";
import { baseURL } from "../_layout";
import { router } from "expo-router";
import HeaderWithBack from "@/components/HeaderWithBack";

const forgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const validate = async () => {
    const result = await schema.isValid({ email: userEmail });
    if (result) {
      setErrorText("");
      sendOTP();
    } else {
      setErrorText("please enter a valid email");
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: userEmail }),
      });

      const data = await res.json();
      if (data.status === "OK") {
        router.replace("/(auth)/continueWithPhone");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      Alert.alert("Error sending OTP", error.message);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView className="bg-white px-5 pt-5">
      <HeaderWithBack headerText="Forgot Password" />
      <View className="mt-5">
        <AuthInput
          labelTitle="Email Address"
          placeholderText="Enter your email"
          inputIcon={require("../../assets/images/input-email-image.png")}
          type="email"
          boardType="email-address"
          onChangeFunction={(text) => setUserEmail(text)}
          errorText={errorText}
        />
        <CustomButton text="Send OTP" isLoading={loading} btnFunction={validate} />
      </View>
    </SafeAreaView>
  );
};
export default forgotPassword;
