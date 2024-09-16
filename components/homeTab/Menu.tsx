import { View, Text, Image } from "react-native";
import AddButton from "../AddButton";
import { Card } from "@/app/_layout";
import Heart from "../Heart";

const MenuItem = ({ image, title, price }: Card) => {
  return (
    <View className="group menu-item flex-[1] border border-lightGrey border-solid rounded-md">
      <View className="relative w-auto h-auto overflow-hidden">
        <Heart emptyClassname="absolute z-[1] top-[5px] right-[5px]" fullClassname="absolute z-[1] top-[8px] right-[8px]" />
        <Image className="w-[156px] h-[100px]" source={image} />
      </View>

      <View className="p-[10px] gap-[5px]">
        <Text className="font-dm text-[13px] min-h-[34px] group-[.menu-item]-first:w-[70%]">{title}</Text>
        <Text className="font-dmMed text-[13px] mb-[5px]">{price}</Text>
        <AddButton />
      </View>
    </View>
  );
};

const Menu = () => {
  return (
    <View className="px-5 items-center gap-[15px]">
      <View className="flex-row justify-between">
        <MenuItem image={require("../../assets/images/brown-rice.png")} title="Fried Brown Rice" price="₦5,000" />
        <MenuItem image={require("../../assets/images/veggie-delight.png")} title="Veggie Delight CheeseSteak" price="₦3,200" />
      </View>
      <View className="flex-row justify-between">
        <MenuItem image={require("../../assets/images/chicken-burger.png")} title="Chicken burger first delivery" price="₦5,000" />
        <MenuItem image={require("../../assets/images/chicken-wrap.png")} title="Crunchies's Chicken wrap" price="₦5,000" />
      </View>
    </View>
  );
};
export default Menu;
