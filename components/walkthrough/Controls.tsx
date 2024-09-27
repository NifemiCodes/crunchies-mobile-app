import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { router } from "expo-router";

interface ControlsType {
  arrayLength: number;
  currentIndex: number;
  nextFunction: () => void;
  addContainerStyles?: ViewStyle;
}

const Controls = ({ arrayLength, currentIndex, nextFunction, addContainerStyles }: ControlsType) => {
  const stepsArray = Array.from({ length: arrayLength });

  return (
    <View className="w-full self-center px-10 mb-10 flex-row items-center justify-between" style={addContainerStyles}>
      {/* skip button */}
      <TouchableOpacity className="px-[10px]" onPress={() => router.replace("/(auth)/welcome")} hitSlop={5}>
        <Text className="font-dmb text-[15.27px] text-[#636366] leading-5 tracking-[-0.31px]">Skip</Text>
      </TouchableOpacity>

      {/* pagination */}
      <View className="flex-row gap-x-1 items-center">
        {stepsArray.map((_, index) => (
          <View key={index} className={`w-[11.45px] h-[11.45px] rounded-full ${index + 1 === currentIndex ? "bg-red" : "bg-veryTRed"}`}></View>
        ))}
      </View>

      {/* next button */}
      <TouchableOpacity className="px-[10px]" onPress={nextFunction} hitSlop={5}>
        <Text className="font-dmb text-[15.27px] text-red leading-5 tracking-[-0.31px]">{currentIndex === arrayLength ? "Finish" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Controls;
