import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CustomButtonType {
  text: string;
  btnFunction?: () => void;
  isLoading: boolean;
}

const CustomButton = ({ text, btnFunction, isLoading }: CustomButtonType) => {
  return (
    <TouchableOpacity onPress={btnFunction} className="bg-red rounded-lg self-center h-[50px] w-[327px] justify-center">
      {isLoading ? <ActivityIndicator color={"white"} size={30} /> : <Text className="font-dmb text-[16px] text-white text-center">{text}</Text>}
    </TouchableOpacity>
  );
};
export default CustomButton;
