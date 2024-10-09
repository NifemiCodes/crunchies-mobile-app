import { View, Text, TouchableOpacity } from 'react-native'
const SectionHeading = ({title}: {title: string}) => {
  return (
    <View className="w-full flex-row items-center justify-between mb-4">
            <Text className="font-dmMed text-[16px]">{title}</Text>

            <TouchableOpacity hitSlop={5}>
              <Text className="font-dm text-[13px] text-grey">Change</Text>
            </TouchableOpacity>
          </View>
  )
}
export default SectionHeading