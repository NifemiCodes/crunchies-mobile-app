import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBack from "@/components/HeaderWithBack";
import Cart from "@/components/cartScreen/Cart";

const shopping = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <HeaderWithBack headerText="Cart" />
      <Cart />
    </SafeAreaView>
  );
};
export default shopping;
