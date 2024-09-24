import { View, Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { baseURL, storeData } from "../_layout";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-z0-9]+@[a-z]+\.com$/;

  // validate user input
  const validateInput = () => {
    if (name && emailRegex.test(email) && birthDay && password) {
      handleRegister();
    } else {
      //router.replace("/(auth)/register");
      Alert.alert("Wrong or missing data", "Please fill in the form appropriately");
    }
  };

  // register user
  const handleRegister = () => {
    setLoading(true);
    const userData = {
      name: name,
      email: email,
      birthday: birthDay,
      password: password,
    };
    fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          const { token, userInfo, userFavourites } = data;
          console.log("user favs: ", userFavourites);
          // store in local storage
          storeData(token, userInfo, userFavourites);
          setLoading(false);
          router.replace("/");
        } else {
          setLoading(false);
          //router.replace("/(auth)/register");
          Alert.alert("Registration failed", data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Alert.alert("Error registering user", err.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 mt-3">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <AuthHeader title="Register New Account" />

        {/* name */}
        <AuthInput
          labelTitle="Full Name"
          placeholderText="Enter your full name"
          type="name"
          inputIcon={require("../../assets/images/input-profile-image.png")}
          onChangeFunction={(text) => setName(text)}
        />

        {/* email */}
        <AuthInput
          labelTitle="Email Adress"
          placeholderText="Enter your Email"
          type="email"
          boardType="email-address"
          inputIcon={require("../../assets/images/input-email-image.png")}
          onChangeFunction={(text) => setEmail(text)}
        />

        {/* birthday */}
        <AuthInput
          labelTitle="Birthday"
          placeholderText="Enter your Birthday Date"
          type="birthday"
          boardType="number-pad"
          inputIcon={require("../../assets/images/input-padlock-image.png")}
          onChangeFunction={(text) => setBirthDay(text)}
        />

        {/* password */}
        <AuthInput
          labelTitle="Password"
          placeholderText="Enter your Password"
          type="password"
          inputIcon={require("../../assets/images/input-padlock-image.png")}
          onChangeFunction={(text) => setPassword(text)}
        />

        <CustomButton text="Register account" btnFunction={validateInput} isLoading={loading} />

        <View className="flex-row gap-x-1 self-center mt-[18px]">
          <Text className="font-dm text-[13px] text-grey">or</Text>
          <Link href={"/(auth)/signin"} asChild replace>
            <Text className="font-dmMed text-red">Sign in</Text>
          </Link>
          <Text className="font-dm text-[13px] text-grey">with your account</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default register;
