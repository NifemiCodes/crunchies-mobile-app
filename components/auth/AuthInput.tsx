import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardTypeOptions, Pressable } from "react-native";

type AuthInputType = {
  labelTitle: string;
  inputIcon: any;
  placeholderText?: string;
  errorText?: string;
  onChangeFunction?: (text: string) => void;
  value?: string;
  type?: "name" | "email" | "password" | "birthday" | "phone";
  boardType?: KeyboardTypeOptions;
};

const AuthInput = ({ labelTitle, inputIcon, placeholderText, type, boardType, onChangeFunction, value, errorText }: AuthInputType) => {
  const [isSecure, setIsSecure] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [dateInput, setDateInput] = useState("");

  const toggleSecure = () => {
    setIsSecure(prev => !prev);
  };

  const togglePicker = () => {
    setShowPicker(prev => !prev);
  };

  return (
    <Pressable className="mb-[10px]">
      <Text className="font-dmMed text-[14px]">{labelTitle}</Text>

      <View className="flex-row gap-x-2 items-center border-b border-veryLightGrey border-solid">
        <Image className="w-4 h-[18px]" source={inputIcon} />
        <TextInput
          className="flex-[2] font-dm text-[18px] p-[10px]"
          placeholderTextColor={Colors.grey}
          placeholder={placeholderText}
          autoCapitalize={type === "name" ? "sentences" : "none"}
          secureTextEntry={type === "password" ? isSecure : false}
          keyboardType={boardType}
          onChangeText={onChangeFunction}
          value={value}
        />
        {type === "password" ? (
          <TouchableOpacity onPress={toggleSecure} hitSlop={5}>
            <Image className="w-[22px] h-4" source={require("../../assets/images/eye-icon.png")} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text className="font-dm text-red text-[13px] mt-1">{errorText}</Text>
    </Pressable>
  );
};
export default AuthInput;
