import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import Orders from "@/components/ordersTab/Orders";

const orders = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <HeaderWithBack headerText="My Orders" />
      <Orders />
    </SafeAreaView>
  );
};
export default orders;
