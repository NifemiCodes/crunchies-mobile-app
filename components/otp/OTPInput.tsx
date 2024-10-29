import { TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";

interface OTPInput {
  isFocused: boolean;
  onChange: (text: string) => void;
}

const OTPInput = ({ isFocused, onChange }: OTPInput) => {
  const [value, setValue] = useState("");
  const input = useRef<TextInput>(null);

  useEffect(() => {
    if (isFocused) {
      input.current?.focus();
    }
  }, [isFocused]);

  return (
    //<View pointerEvents="none">
    <TextInput
      ref={input}
      className={`h-[56px] border border-solid rounded-[10px] text-center font-manMed text-[24px] ${
        isFocused ? "border-red text-red" : "border-veryLightGrey text-black"
      }`}
      keyboardType="number-pad"
      maxLength={1}
      value={value}
      onChangeText={(text) => {
        onChange(text);
        setValue(text);
      }}
    />
    //</View>
  );
};
export default OTPInput;
