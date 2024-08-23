import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
const AddButton = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return count > 0 ? (
    <View className="flex-row justify-between items-center h-7 bg-red rounded-[6px]">
      <TouchableOpacity className="flex-1 h-7 justify-center items-center border-r border-r-whiteT border-solid" onPress={decrement}>
        <Image className="w-2" source={require("../assets/images/minus-icon.png")} />
      </TouchableOpacity>

      <Text className="flex-[2] text-lightGrey text-center">{count} in bag</Text>

      <TouchableOpacity className="flex-1 h-7 justify-center items-center border-l border-l-whiteT border-solid" onPress={increment}>
        <Image className="w-2 h-2" source={require("../assets/images/plus-icon.png")} />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity className="border border-solid border-red rounded-[6px] h-7 justify-center items-center" onPress={increment}>
      <Text className="font-dm text-red">Add to bag</Text>
    </TouchableOpacity>
  );
};
export default AddButton;
