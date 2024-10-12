import { View, Text, TextInput, ViewStyle, KeyboardType } from "react-native";

interface CardInputType {
  labelText: string;
  placeholderText: string;
  keyboardType?: KeyboardType;
  onChangeFunction: (text: string) => void;
  inputValue: string;
  addStyles?: ViewStyle;
}

const CardInput = ({ labelText, placeholderText, keyboardType, onChangeFunction, inputValue, addStyles }: CardInputType) => {
  return (
    <View className="relative mb-6" style={addStyles}>
      <Text className="absolute z-[1] bg-white px-[10px] top-[-21%] left-[5%] font-dm text-[14px] leading-[22px]">{labelText}</Text>

      <TextInput
        className="border border-veryLightGrey rounded-md px-5 py-[10px] font-dm text-[15px] leading-[22px]"
        placeholder={placeholderText}
        placeholderTextColor={"#6b6b6b"}
        keyboardType={keyboardType}
        onChangeText={text => onChangeFunction(text)}
        value={inputValue}
      />
    </View>
  );
};
export default CardInput;
