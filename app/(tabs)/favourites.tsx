import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
const favourites = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <HeaderWithBack headerText="Favourites" />
    </SafeAreaView>
  );
};
export default favourites;
const styles = StyleSheet.create({});
