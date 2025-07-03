import Icon from "@/components/ui/Icon";
import { icons } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface PressableIconProps {
  onPress: () => void;
  name: keyof typeof icons;
  color?: string;
}

export default function PressableIcon({
  onPress,
  name,
  color,
}: PressableIconProps) {
  return (
    <View style={styles.button}>
      <Pressable onPress={onPress} style={styles.icon}>
        <Icon name={name} size={32} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-start",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
