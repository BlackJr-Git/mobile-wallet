import Icon from "@/components/ui/Icon";
import { icons } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

interface PressableIconProps {
  onPress: () => void;
  name: keyof typeof icons;
  color?: string;
  iconSize?: number;
}

export default function PressableIcon({
  onPress,
  name,
  color,
  iconSize = 28,
}: PressableIconProps) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        className="w-12 h-12 rounded-2xl p-6 flex border-2 border-indigo-100 dark:border-indigo-800 items-center justify-center"
      >
        <Icon name={name} size={iconSize} color={color} />
      </Pressable>
    </View>
  );
}

// const styles = StyleSheet.create({
//   icon: {
//     width: 50,
//     height: 50,
//     borderRadius: 16,
//     padding: 16,
//     backgroundColor: "#fff",
//     borderColor: "#d1d5db",
//     borderWidth: 2,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
// });
