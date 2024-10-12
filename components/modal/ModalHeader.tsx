import { View, Text, Image, TouchableOpacity } from "react-native";

const ModalHeader = ({ title, closeFunction }: { title: string; closeFunction: () => void }) => {
  return (
    <View className="w-full py-3 flex-row items-center justify-between border-b border-b-veryLightGrey">
      <Text className="font-dmMed text-[18px]">{title}</Text>

      <TouchableOpacity onPress={closeFunction}>
        <Image className="w-6 h-6" source={require("../../assets/images/x-icon.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeader;
