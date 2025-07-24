import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  icon: string;
  title: string;
  availableAmount: string;
  currency: string;
  onPress: () => void;
  isSelected?: boolean;
}

export default function PaymentMethodeItem({
  icon,
  title,
  availableAmount,
  currency,
  onPress,
  isSelected,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-4 w-full bg-gray-200 dark:bg-gray-800 px-2 py-2 rounded-2xl ${
        isSelected ? "border-2 border-indigo-500" : ""
      }`}
    >
      <Image source={{ uri: icon }} className="w-16 h-16 rounded-2xl" />
      <View>
        <Text className="text-lg font-semibold dark:text-white">{title}</Text>
        <Text className="text-lg text-gray-500 dark:text-white">
          {availableAmount} {currency}
        </Text>
      </View>
    </Pressable>
  );
}
