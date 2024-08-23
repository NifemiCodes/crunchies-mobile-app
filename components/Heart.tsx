import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
const Heart = ({ emptyClassname, fullClassname }: { emptyClassname: string; fullClassname: string }) => {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return liked ? (
    <TouchableOpacity className={fullClassname} onPress={toggleLike}>
      <Image className="w-4 h-4" source={require("../assets/images/heart-full.png")} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity className={emptyClassname} onPress={toggleLike}>
      <Image className="w-5 h-5" source={require("../assets/images/heart-icon.png")} />
    </TouchableOpacity>
  );
};
export default Heart;
