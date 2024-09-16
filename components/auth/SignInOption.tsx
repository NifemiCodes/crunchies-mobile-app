import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Href, Link } from "expo-router";

interface SigninOptionType {
  image: any;
  text: string;
  linkTo: Href<string | object>;
}

const SignInOption = ({ image, text, linkTo: linkHref }: SigninOptionType) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  if (active) {
    return (
      <Link href={linkHref} asChild>
        <Pressable onPressOut={toggleActive} className="mb-4 flex-row items-center justify-between bg-blue rounded-md p-[10px]">
          <View className="flex-row items-center gap-x-3">
            <Image className="w-5 h-5" source={image} />
            <Text className="font-dm text-[16px] text-white">{text}</Text>
          </View>

          <Pressable onPressOut={toggleActive} className="w-[30px] h-[30px] rounded-md bg-white justify-center items-center">
            <Image className="w-[14px] h-[14px]" source={require("../../assets/images/arrow-right.png")} />
          </Pressable>
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href={linkHref} asChild>
      <Pressable onPressIn={toggleActive} className="mb-4 flex-row items-center justify-between bg-[#f5f6f6] rounded-md p-[10px]">
        <View className="flex-row items-center gap-x-3">
          <Image className="w-5 h-5" source={image} />
          <Text className="font-dm text-[16px]">{text}</Text>
        </View>

        <Pressable onPressIn={toggleActive} className="w-[30px] h-[30px] rounded-md bg-veryLightGrey justify-center items-center">
          <Image className="w-[14px] h-[14px]" source={require("../../assets/images/arrow-right.png")} />
        </Pressable>
      </Pressable>
    </Link>
  );
};
export default SignInOption;
