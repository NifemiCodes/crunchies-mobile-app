import { View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import { router } from "expo-router";
import Step from "@/components/walkthrough/Step";
import Controls from "@/components/walkthrough/Controls";

export interface walkthroughDataType {
  image: any;
  subtitle: string;
  title: string;
  text: string;
}

const data: walkthroughDataType[] = [
  {
    image: require("../assets/images/walkthrough-image-1.png"),
    subtitle: "Create an Account",
    title: "Order Healthy Food",
    text: "Food that is healthy, tasty, produced in a nature-friendly way by farmers, fishers folks or food producers",
  },
  {
    image: require("../assets/images/walkthrough-image-2.png"),
    subtitle: "Easy Payment",
    title: "Safe Online Payment",
    text: "As part of a secure payment, your credit/Dabit card number, expiry date and cryptogram are encrypted",
  },
  {
    image: require("../assets/images/walkthrough-image-3.png"),
    subtitle: "Fast Delivery",
    title: "30 Minutes Delivery",
    text: "Since every consumer values the importance of time, delivery within 30 Minutes brings added value",
  },
  {
    image: require("../assets/images/walkthrough-image-4.png"),
    subtitle: "Feedback",
    title: "Test & Rate Restaurant",
    text: `Food critics and "restaurant critic" are synonyms, in practice, although there is still a distinction to be made`,
  },
];

const walkthrough = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get("window").width;
  const numOfSteps = 4;

  const nextPage = () => {
    scrollViewRef.current?.scrollTo({ x: screenWidth * currentStep });
    if (currentStep < numOfSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.replace("/(auth)/welcome");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 w-full">
        <ScrollView
          style={{ width: "100%" }}
          ref={scrollViewRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          snapToAlignment="start"
          decelerationRate={0.85}
          scrollEnabled={false}>
          {data.map((item, index) => {
            return <Step key={index} image={item.image} subtitle={item.subtitle} title={item.title} text={item.text} />;
          })}
        </ScrollView>
      </View>

      <Controls arrayLength={numOfSteps} currentIndex={currentStep} nextFunction={nextPage} />
    </SafeAreaView>
  );
};
export default walkthrough;
