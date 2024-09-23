import { Text, ScrollView, Image, Pressable, View } from "react-native";

interface Card {
  image: any;
  text: string;
  isFocused?: boolean;
  focusFunc?: () => void;
}

const Category = ({ image, text }: Card) => {
  // return isFocused ? (
  //   <Pressable className="flex-row gap-1 items-center justify-center rounded-[50px] p-2 bg-red">
  //     <Image className="w-6 h-6" source={image} />
  //     <Text className="text-white font-dm text-[14px]">{text}</Text>
  //   </Pressable>
  // ) :
  return (
    <Pressable className="flex-row gap-x-1 items-center justify-center rounded-[50px] p-2 bg-lightGrey">
      <Image className="m-0 w-6 h-6" source={image} />
      <Text className="font-dm text-[14px]">{text}</Text>
    </Pressable>
  );
};

const Categories = () => {
  return (
    <View className="h-fit">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 8, paddingHorizontal: 20 }}>
        <Category image={require("../../assets/images/burger-icon.png")} text={"All Food"} />
        <Category image={require("../../assets/images/pizza-icon.png")} text={"Pizza"} />
        <Category image={require("../../assets/images/cookie-icon.png")} text={"Cookies"} />
        <Category image={require("../../assets/images/pastry-icon.png")} text={"pastry"} />
        <Category image={require("../../assets/images/burger-icon.png")} text={"Italian"} />
        <Category image={require("../../assets/images/pizza-icon.png")} text={"French Cuisine"} />
        <Category image={require("../../assets/images/cookie-icon.png")} text={"Cakes"} />
        <Category image={require("../../assets/images/pastry-icon.png")} text={"Sweets"} />
        <Category image={require("../../assets/images/burger-icon.png")} text={"Mexican"} />
      </ScrollView>
    </View>
  );
};
export default Categories;
