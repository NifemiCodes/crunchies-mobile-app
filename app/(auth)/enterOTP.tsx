import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import OTPInput from "@/components/otp/OTPInput";
import CustomButton from "@/components/CustomButton";
import { baseURL } from "../_layout";
import { router } from "expo-router";

const enterOTP = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [digits, setDigits] = useState<string[]>([]);
  const inputs = ["input1", "input2", "input3", "input4", "input5", "input6"];
  const [currentInput, setCurrentInput] = useState(inputs[0]);
  const [loading, setLoading] = useState(false);

  const handleChange = (inputText: string) => {
    if (inputText) {
      setDigits((prev) => [...prev, inputText]);
      const newIndex = currentIndex < 5 ? currentIndex + 1 : currentIndex;
      setCurrentIndex(newIndex);
      setCurrentInput(inputs[newIndex]);
    } else {
      const newDigits = digits.filter((digit) => digits.indexOf(digit) !== currentIndex);
      const newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
      setDigits(newDigits);
      setCurrentIndex(newIndex);
      setCurrentInput(inputs[newIndex]);
    }
  };

  const verifyOTP = async () => {
    console.log(digits);
    const code = digits.join("");
    if (code.length !== 6) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/otp/verify/${digits.join("")}`);
      const data = await res.json();
      console.log(data);
      if (data.status === "OK") {
        router.replace("/(auth)/setNewPassword");
        console.log("approved");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      Alert.alert("Error verifying OTP", error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
      <HeaderWithBack headerText="Verification" />
      <Text className="mt-5 mb-[30px] font-dm text-[16px] opacity-60 leading-6">Enter the 6 digit code sent to your email address</Text>

      <View className="flex-row items-center gap-x-2">
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input1"} onChange={handleChange} />
        </View>
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input2"} onChange={handleChange} />
        </View>
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input3"} onChange={handleChange} />
        </View>
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input4"} onChange={handleChange} />
        </View>
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input5"} onChange={handleChange} />
        </View>
        <View className="flex-[1]">
          <OTPInput isFocused={currentInput === "input6"} onChange={handleChange} />
        </View>
      </View>

      <View className="flex-row my-5 items-center justify-center">
        <Text className="mr-1 font-dm text-[14px] opacity-60">I didn't receive code</Text>
        <TouchableOpacity>
          <Text className="font-dm text-red text-[14px]">Resend code</Text>
        </TouchableOpacity>
      </View>

      <CustomButton text="verify OTP" btnFunction={verifyOTP} isLoading={loading} />
    </SafeAreaView>
  );
};
export default enterOTP;
