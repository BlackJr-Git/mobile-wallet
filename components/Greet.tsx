import { Text, View } from "react-native";

export default function Greet({ name }: { name: string }) {
  return (
    <View>
      <Text className="text-foreground dark:text-white text-xl font-semibold mb-2">
        Bonjour {name} !
      </Text>
    </View>
  );
}
