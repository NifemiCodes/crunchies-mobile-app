import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";

const Header = ({ firstName }: { firstName: string }) => {
  const [meal, setMeal] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setMeal("breakfast");
    } else if (hour >= 12 && hour < 18) {
      setMeal("lunch");
    } else {
      setMeal("dinner");
    }
  }, []);

  return (
    <View className="flex-row justify-between items-center mt-5 px-5">
      <View>
        <Text className="font-dmb text-[18px]">Hi {firstName}</Text>
        <Text className="font-dm text-grey text-[14px]">{`It's ${meal} time!`}</Text>
      </View>

      <View className="rounded-full w-[40px] h-[40px] bg-redT flex justify-center items-center">
        <Image className="w-5 h-5" source={require("../../assets/images/search-icon.png")} />
      </View>
    </View>
  );
};
export default Header;
