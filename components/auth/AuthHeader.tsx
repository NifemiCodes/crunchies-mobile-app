import { Text, View, Image } from "react-native";
const AuthHeader = ({ title }: { title: string }) => {
  return (
    <View className="mb-8">
      <Text className="text-[18px] font-dmMed">{title}</Text>
      <View className="items-center mt-6">
        <Image source={require("../../assets/images/Logo.png")} className="w-[176px] h-[122px]" />
      </View>
    </View>
  );
};
export default AuthHeader;
