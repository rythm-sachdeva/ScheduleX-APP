import { images } from "@/global/constants/images";
import { Image, ImageBackground, Text, View } from "react-native";

export function TabIcon({ focused, icon, title }: any) {
  // Common styles for both states to prevent layout jumps
  const containerClassName = "flex min-w-[114px] min-h-14 justify-center items-center";

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        // It's a row, centered, with a specific size and pill shape
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
    // It's a simple view, centered, with the *exact same size*
    <View className={containerClassName}>
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}