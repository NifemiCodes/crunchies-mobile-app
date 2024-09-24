import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import ProfileInfo from "@/components/profileTab/ProfileInfo";
import Account from "@/components/profileTab/Account";
import Notifications from "@/components/profileTab/Notifications";
import More from "@/components/profileTab/More";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";

const profile = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <HeaderWithBack headerText="Profile" />
        <ProfileInfo userName={user.name} userEmail={user.email} />
        <Account />
        <Notifications />
        <More />
      </ScrollView>
    </SafeAreaView>
  );
};
export default profile;
const styles = StyleSheet.create({});
