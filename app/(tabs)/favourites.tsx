import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import Favourites from "@/components/favouritesTab/Favourites";

const favourites = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <HeaderWithBack headerText="Favourites" />
      <Favourites />
    </SafeAreaView>
  );
};
export default favourites;
