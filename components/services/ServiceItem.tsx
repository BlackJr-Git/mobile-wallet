import Icon from "@/components/ui/Icon";
import { Link } from "expo-router";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

type ServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
  routeName: string;
};

export default function ServiceItem({
  icon,
  title,
  iconColor,
  routeName,
}: ServiceItemProps) {
  return (
    <Link href={`/${routeName}` as any}>
      <View className="flex-1 items-center justify-between">
        <View className="items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
          <Icon name={icon} size={28} color={iconColor} />
        </View>
        <Text className="text-slate-500 mt-2 dark:text-white">{title}</Text>
      </View>
    </Link>
  );
}
