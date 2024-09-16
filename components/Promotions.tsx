import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

const Promotions = () => {
  const [banner, setBanner] = useState();
  const [num, setNum] = useState<number>(1);

  useEffect(() => {
    setBanner(require("../assets/images/ofada-banner.png"));
  }, []);

  useEffect(() => {
    let id = setTimeout(() => {
      if (num === 0) {
        setBanner(require("../assets/images/ofada-banner.png"));
        setNum(1);
      } else {
        setBanner(require("../assets/images/burger-banner.png"));
        setNum(0);
      }
    }, 10000);

    return () => clearTimeout(id);
  }, [banner, num]);

  return (
    <View className="gap-[7px] px-5 items-center">
      <Image className="w-[327px] h-[137px]" source={banner} />

      <View className="flex-row gap-[7px]">
        <View>
          <Image className="w-[104px] h-[104px]" source={require("../assets/images/offer-1.png")} />
        </View>

        <View>
          <Image className="w-[104px] h-[104px]" source={require("../assets/images/offer-2.png")} />
        </View>

        <View>
          <Image className="w-[104px] h-[104px]" source={require("../assets/images/offer-3.png")} />
        </View>
      </View>
    </View>
  );
};
export default Promotions;
