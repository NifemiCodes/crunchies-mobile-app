import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import Order from "./Order";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_layout";

const Orders = () => {
  const ordersList = useSelector((state: RootState) => state.orders.value);
  const [currentIndex, setCurrentIndex] = useState(0);
  const headers = ["All Orders", "Oncoming", "Delivered"];

  return (
    <View className="flex-1">
      <View className="flex-row my-4">
        {headers.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setCurrentIndex(index)}
            className={`flex-1 py-3 items-center justify-center border-b border-b-solid ${
              index === currentIndex ? "border-b-red" : "border-b-veryLightGrey"
            }`}>
            <Text className={`font-dm text-[14px] ${index === currentIndex ? "text-red" : "text-grey"}`}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {ordersList.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="font-dmMed text-[15px] mt-[-20%]">No Orders Yet</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: 16, paddingBottom: "32%" }}>
          {ordersList.map((item, index) => (
            <Order
              key={index}
              image={item.image}
              title={item.name}
              price={item.price}
              itemCount={item.productCount}
              date={item.date}
              time={item.time}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default Orders;
