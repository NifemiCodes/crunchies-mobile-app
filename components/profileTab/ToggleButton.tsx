import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ToggleButton = () => {
  const [toggle, setToggle] = useState(false);
  const newStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: toggle ? withTiming("#e90c31", { duration: 200 }) : withTiming("#d4d4d4", { duration: 200 }),
      alignItems: toggle ? "flex-end" : "flex-start",
    };
  });

  return (
    <AnimatedPressable onPress={() => setToggle((prev) => !prev)} className="w-[37px] h-5 justify-center rounded-[18px] px-[3px]" style={newStyles}>
      <Image source={require("../../assets/images/toggle-bead.png")} className="w-[14px] h-[14px]" />
    </AnimatedPressable>
  );
};
export default ToggleButton;
