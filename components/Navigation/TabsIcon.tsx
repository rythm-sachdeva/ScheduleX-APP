import { images } from "@/global/constants/images";
import { Image, ImageBackground, Text, View } from "react-native";

export function TabIcon({ focused, icon, title }: any) {
  const containerClassName = "flex min-w-[114px] min-h-14 justify-center items-center";

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className={`${containerClassName} flex-row rounded-full overflow-hidden`}
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className={containerClassName}>
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}