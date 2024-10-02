import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import HeaderWithBack from "@/components/HeaderWithBack";
import ProfileInfo from "@/components/profileTab/ProfileInfo";
import AuthInput from "@/components/auth/AuthInput";
import CustomButton from "@/components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/features/userSlice";
import { baseURL, RootState } from "./_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const editProfile = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setNewUserName(user.name);
    setNewUserEmail(user.email);
  }, []);

  const editUserProfile = async () => {
    console.log(newUserName, newUserEmail);
    try {
      // check for network connection
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        Alert.alert("User Connection", "Please connect to the internet to complete this action");
      } else {
        // send request to update db;
        const res = await fetch(`${baseURL}/profile/edit/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newUserName, email: newUserEmail }),
        });
        const data = await res.json();

        // update global state & local storage;
        if (data.status === "OK") {
          const { newUser } = data;
          console.log("new user:", newUser);
          dispatch(setUser(newUser));
          await AsyncStorage.setItem("user", JSON.stringify(newUser));
          Alert.alert("Update Successful!", "Profile was updated successfully!");
        } else {
          console.log(data.message);
          Alert.alert("Error updating user Information", data.message);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <HeaderWithBack headerText="My Profile" />

      <View className="flex-1">
        <View>
          <View className="mb-2">
            <ProfileInfo userName={user.name} userEmail={user.email} />
          </View>

          <AuthInput
            labelTitle="Full Name"
            type="name"
            inputIcon={require("../assets/images/input-profile-image.png")}
            value={newUserName}
            onChangeFunction={(text) => setNewUserName(text)}
          />
          {/* <AuthInput labelTitle="Mobile Number" boardType="phone-pad" inputIcon={require("../assets/images/phone-icon-outlined.png")} /> */}
          <AuthInput
            labelTitle="Email Address"
            boardType="email-address"
            inputIcon={require("../assets/images/input-email-image.png")}
            value={newUserEmail}
            onChangeFunction={(text) => setNewUserEmail(text)}
          />
        </View>

        <View className="mt-5">
          <CustomButton text="Edit Profile" btnFunction={editUserProfile} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default editProfile;
