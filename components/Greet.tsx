import { StyleSheet, Text, View } from "react-native";

export default function Greet({ name }: { name: string }) {
  return (
    <View>
      <Text style={styles.title}>Bonjour {name} !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#181D28",
    // textAlign: "center",
    marginBottom: 8,
  },
});
