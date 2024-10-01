import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInOption from "@/components/auth/SignInOption";
import { useEffect } from "react";
import { checkAuthState } from "@/helpers";
import { router } from "expo-router";

const welcome = () => {
  useEffect(() => {
    (async () => {
      const status = await checkAuthState();
      status ? router.replace("/(tabs)/") : null;
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="items-center pt-8 mb-5">
        <Image source={require("../../assets/images/Logo.png")} className="w-[176px] h-[122px]" />
        <Text className="font-dmb text-[28px] text-center mt-10">Sign in & Register to Crunchies</Text>
      </View>
      <View>
        <SignInOption image={require("../../assets/images/google-icon.png")} text="Continue with Google" linkTo={"/(auth)/register"} />
        <SignInOption image={require("../../assets/images/facebook-icon.png")} text="Continue with Facebook" linkTo={"/(auth)/register"} />
        <SignInOption image={require("../../assets/images/phone-icon.png")} text="Continue with Phone" linkTo={"/(auth)/continueWithPhone"} />
        <SignInOption image={require("../../assets/images/email-icon.png")} text="Continue with Email" linkTo={"/(auth)/register"} />
      </View>
      <Text className="font-dm text-[13px] text-grey text-center mx-5 mt-5">
        By continuing, you agree to our <Text className="font-dmMed text-dullYellow">Terms & Conditions and privacy policy</Text>
      </Text>
    </SafeAreaView>
  );
};
export default welcome;
