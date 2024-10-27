import { View, Text, Alert, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Formik } from "formik";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { baseURL } from "../_layout";
import { storeData } from "@/helpers";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/userSlice";
import { setFavourites } from "@/features/favouritesSlice";
import { newUserSchema } from "./../../validations/registerForm";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { setOrders } from "@/features/ordersSlice";

const register = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState<string>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const type = event.type;
    console.log(type);
    if (type === "set") {
      setShowPicker(false);
      setDate(selectedDate?.toLocaleDateString());
    } else {
      setShowPicker(false);
    }
  };

  // register user
  const handleRegister = (inputData: { name: string; email: string; password: string }) => {
    setLoading(true);
    fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          const { token, userInfo, userFavourites, userOrders } = data;
          // store in local storage
          storeData(token, userInfo, userFavourites, userOrders);
          // update global state
          dispatch(setUser(userInfo));
          dispatch(setFavourites(userFavourites));
          dispatch(setOrders(userOrders));
          setLoading(false);
          router.replace("/(tabs)/");
        } else {
          setLoading(false);
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

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={newUserSchema}
          onSubmit={async (values) => {
            const result = await newUserSchema.isValid(values);
            result ? handleRegister(values) : Alert.alert("Wrong or missing data", "Please fill in the form correctly");
          }}>
          {(props) => (
            <View>
              {/* name */}
              <AuthInput
                labelTitle="Full Name"
                placeholderText="Enter your full name"
                type="name"
                inputIcon={require("../../assets/images/input-profile-image.png")}
                onChangeFunction={props.handleChange("name")}
                errorText={props.errors.name}
              />

              {/* email */}
              <AuthInput
                labelTitle="Email Adress"
                placeholderText="Enter your Email"
                type="email"
                boardType="email-address"
                inputIcon={require("../../assets/images/input-email-image.png")}
                onChangeFunction={props.handleChange("email")}
                errorText={props.errors.email}
              />

              {/* birthday */}
              <Pressable onPress={togglePicker}>
                {showPicker && (
                  <DateTimePicker value={new Date()} mode="date" display="calendar" onChange={handleDateChange} maximumDate={new Date()} />
                )}
                <AuthInput
                  labelTitle="Birthday"
                  placeholderText="Enter your Birthday Date"
                  type="birthday"
                  boardType="number-pad"
                  inputIcon={require("../../assets/images/input-padlock-image.png")}
                  value={date}
                  isEditable={false}
                />
              </Pressable>

              {/* password */}
              <AuthInput
                labelTitle="Password"
                placeholderText="Enter your Password"
                type="password"
                inputIcon={require("../../assets/images/input-padlock-image.png")}
                onChangeFunction={props.handleChange("password")}
                errorText={props.errors.password}
              />

              <CustomButton text="Register account" btnFunction={() => props.handleSubmit()} isLoading={loading} />
            </View>
          )}
        </Formik>

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
