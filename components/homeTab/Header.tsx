import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_layout";
import { useEffect, useState } from "react";

const Header = () => {
  const [firstName, setFirstName] = useState("");
  const user = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    setFirstName(user.name.split(" ")[0]);
  });

  return (
    <View className="flex-row justify-between items-center mt-5 px-5">
      <View>
        <Text className="font-dmb text-[18px]">Hi {firstName}</Text>
        <Text className="font-dm text-grey text-[14px]">It's lunch time!</Text>
      </View>

      <View className="rounded-full w-[40px] h-[40px] bg-redT flex justify-center items-center">
        <Image className="w-5 h-5" source={require("../../assets/images/search-icon.png")} />
      </View>
    </View>
  );
};
export default Header;
