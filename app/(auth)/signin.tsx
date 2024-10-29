import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { baseURL } from "../_layout";
import { storeData } from "@/helpers";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/userSlice";
import { setFavourites } from "@/features/favouritesSlice";
import { realUserSchema } from "./../../validations/signInForm";
import { setOrders } from "@/features/ordersSlice";

const signIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async (signinData: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });
      const data = await res.json();

      if (data.status === "OK") {
        const { token, userInfo, userFavourites, userOrders } = data;
        // store data
        await storeData(token, userInfo, userFavourites, userOrders);

        // update global state
        dispatch(setUser(userInfo));
        dispatch(setFavourites(userFavourites));
        dispatch(setOrders(userOrders));

        setLoading(false);
        router.replace("/(tabs)/");
      } else {
        setLoading(false);
        Alert.alert("Error signing in", data.message);
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      Alert.alert("Error signing in", err.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <AuthHeader title="Sign In" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={realUserSchema}
          onSubmit={async (values) => {
            const result = await realUserSchema.isValid(values);
            result ? handleSignIn(values) : Alert.alert("wrong or missing data", "Please fill in the form correctly");
          }}>
          {(props) => (
            <View>
              <AuthInput
                labelTitle="Email Adress"
                placeholderText="Enter your Email"
                type="email"
                boardType="email-address"
                inputIcon={require("../../assets/images/input-email-image.png")}
                onChangeFunction={props.handleChange("email")}
                errorText={props.errors.email}
              />
              <AuthInput
                labelTitle="Password"
                placeholderText="Enter your Password"
                type="password"
                inputIcon={require("../../assets/images/input-padlock-image.png")}
                onChangeFunction={props.handleChange("password")}
                errorText={props.errors.password}
              />

              {/* <Link href={"/(auth)/forgotPassword"} asChild replace> */}
              <TouchableOpacity className="self-end mt-[-9px] mb-[40px]">
                <Text className="text-grey font-dm text-[14px]">Forgot Password</Text>
              </TouchableOpacity>
              {/* </Link> */}

              <CustomButton text="Sign In" btnFunction={props.handleSubmit} isLoading={loading} />
            </View>
          )}
        </Formik>

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
