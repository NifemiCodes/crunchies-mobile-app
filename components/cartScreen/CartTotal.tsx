import { View, ScrollView } from "react-native";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import Coupon from "./Coupon";
import TotalTable from "../TotalTable";

const CartTotal = () => {
  return (
    <View className="flex-1 border-t border-t-solid border-t-veryLightGrey mt-[18px]">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "5%" }}>
        <Coupon />
        <TotalTable />
        <CustomButton text="Check Out" btnFunction={() => router.push("/checkout")} />
      </ScrollView>
    </View>
  );
};
export default CartTotal;
