import { View, Text } from "react-native";
const ProfileInfo = ({ userName, userEmail }: { userName: string; userEmail: string }) => {
  return (
    <View className="py-5">
      {/* profile picture */}
      <View className="gap-y-2">
        <Text className="font-dmb text-[24px]">{userName}</Text>
        <Text className="font-dm text-[16px] text-grey">{userEmail}</Text>
      </View>
    </View>
  );
};
export default ProfileInfo;
