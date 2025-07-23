import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Props {
  placeholder: string;
  label?: string;
}

export default function Input({ placeholder, label, ...props }: Props) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container} >
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        className={colorScheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    height: 48,
    // borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 15,
    width: "100%",
    // backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#F6F6F6",
  },
  //   input: {
  //     backgroundColor: "#F6F6F6",
  //     borderRadius: 8,
  //     paddingHorizontal: 14,
  //     paddingVertical: 10,
  //     fontSize: 15,
  //     marginBottom: 12,
  //     borderWidth: 1,
  //     borderColor: "#ECECEC",
  //   },
  label: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 4,
  },
});
