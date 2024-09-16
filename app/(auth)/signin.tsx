import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { baseURL, storeData } from "../_layout";

const signIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const signinData = {
      email: email,
      password: password,
    };
    const res = await fetch(`${baseURL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinData),
    });
    const data = await res.json();

    if (data.status === "OK") {
      const { token, userInfo } = data;
      await storeData(token, userInfo);
      setLoading(false);
      router.replace("/");
    } else {
      setLoading(false);
      Alert.alert("Error signing in", data.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <AuthHeader title="Sign In" />

        <AuthInput
          labelTitle="Email Adress"
          placeholderText="Enter your Email"
          type="email"
          boardType="email-address"
          inputIcon={require("../../assets/images/input-email-image.png")}
          onChangeFunction={(text) => setEmail(text)}
        />
        <AuthInput
          labelTitle="Password"
          placeholderText="Enter your Password"
          type="password"
          inputIcon={require("../../assets/images/input-padlock-image.png")}
          onChangeFunction={(text) => setPassword(text)}
        />

        {/* <Link> */}
        <TouchableOpacity className="self-end mt-[-9px] mb-[40px]">
          <Text className="text-grey font-dm text-[14px]">Forgot Password</Text>
        </TouchableOpacity>
        {/* </Link> */}

        <CustomButton text="Sign In" btnFunction={handleSignIn} isLoading={loading} />

        <View className="flex-row gap-x-1 justify-center mt-4">
          <Text className="font-dm text-grey text-[13px]">or</Text>
          <Link href={"/(auth)/register"} asChild replace>
            <Text className="font-dmMed text-[13px]">Register a new account</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default signIn;
