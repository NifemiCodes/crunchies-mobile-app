import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Header from "@/components/Header";
import Location from "@/components/Location";
import Promotions from "@/components/Promotions";
import Categories from "@/components/Categories";
import Menu from "@/components/Menu";
import HotDeals from "@/components/HotDeals";
import Trending from "@/components/Trending";
import Recommended from "@/components/Recommended";
import Crunchies from "@/components/Crunchies";

// backdrop blur -- X
// drop shadow -- X
// categories focus styles -- X
// scroll view height issues -- done-ish
// tab bar marker animation -- done-ish(a bit slow, check that out)

const homeTab = () => {
  return (
    <SafeAreaView className="flex-[1] bg-white">
      <ScrollView contentContainerStyle={{ rowGap: 16, paddingBottom: "25%" }}>
        <Header />
        <Location />
        <Promotions />
        <Categories />
        <Menu />
        <HotDeals />
        <Trending />
        <Recommended />
        <Crunchies />
      </ScrollView>
    </SafeAreaView>
  );
};
export default homeTab;
