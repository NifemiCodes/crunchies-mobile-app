import { View, Text, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { baseURL, RootState } from "../_layout";
import { useSelector } from "react-redux";
import { router } from "expo-router";

const setNewPassword = () => {
  const userEmail = useSelector((state: RootState) => state.password.value.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const result = confirmPassword === newPassword;
    if (!result) {
      setErrorText("password must be the same as new password");
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/password/set`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, password: newPassword }),
        });

        const data = await res.json();
        if (data.status === "OK") {
          router.replace("/(auth)/signin");
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        Alert.alert("Error setting new password", error.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-5 pt-5">
      <HeaderWithBack headerText="Set New Password" />

      <View>
        <View>
          <AuthInput
            labelTitle="New Password"
            inputIcon={require("../../assets/images/input-padlock-image.png")}
            placeholderText="Enter password"
            type="password"
            onChangeFunction={(text) => setNewPassword(text)}
          />
        </View>
        <View>
          <AuthInput
            labelTitle="Confirm New Password"
            inputIcon={require("../../assets/images/input-padlock-image.png")}
            placeholderText="Enter password"
            type="password"
            errorText={errorText}
            onChangeFunction={(text) => setConfirmPassword(text)}
          />
        </View>
      </View>

      <CustomButton text="Change Password" isLoading={loading} />
    </SafeAreaView>
  );
};
export default setNewPassword;
