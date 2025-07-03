import { StyleSheet, View } from "react-native";
// import { ThemedText } from '@/components/ThemedText';
import Greet from "@/components/Greet";
import { ThemedView } from "@/components/ThemedView";
import Logo from "@/components/ui/Logo";
import PressableIcon from "@/components/ui/PressableIcon";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <PressableIcon onPress={() => {}} name="LayoutGrid" color="#4A67FF" />
        <Logo variant="default" size="small" />
        <PressableIcon onPress={() => {}} name="Bell" color="#4A67FF" />
      </View>
      <Greet name="Junior" />
      <Greet name="Junior" />
      <Greet name="Junior" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: 64,
    paddingHorizontal: 24,
    position: "relative",
    backgroundColor: "#fff000",
  },
  header: {
    position: "absolute",
    zIndex: 10,
    top: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    width: "100%",
    // paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#fff",
    marginBottom: "auto",
  },
});
