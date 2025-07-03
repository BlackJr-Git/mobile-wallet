import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// import { ThemedText } from '@/components/ThemedText';
import Greet from "@/components/Greet";
import { ThemedView } from "@/components/ThemedView";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import PressableIcon from "@/components/ui/PressableIcon";
import { icons } from "lucide-react-native";

const promo1Img = require("../../assets/images/promo-1.png");
const promo2Img = require("../../assets/images/promo-2.png");

type ServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
};

const services: ServiceItemProps[] = [
  {
    icon: "Newspaper",
    title: "Factures",
    iconColor: "#ff6900",
  },
  {
    icon: "CardSim",
    title: "Achat Credit",
    iconColor: "#2b7fff",
  },
  {
    icon: "HandCoins",
    title: "Change",
    iconColor: "#00c950",
  },
];

type PromotionItemProps = {
  title: string;
  description: string;
  image: string;
};

const promotions: PromotionItemProps[] = [
  {
    title: "Promotion 1",
    description: "Description 1",
    image: "promo-1",
  },
  {
    title: "Promotion 2",
    description: "Description 2",
    image: "promo-2",
  },
  {
    title: "Promotion 3",
    description: "Description 3",
    image: "promo-1",
  },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <PressableIcon onPress={() => {}} name="LayoutGrid" color="#4A67FF" />
        <Logo variant="default" size="small" />
        <PressableIcon onPress={() => {}} name="Bell" color="#4A67FF" />
      </View>
      <View className="w-full">
        <Greet name="Junior asosa" />
        <Text className="text-slate-500">Votre solde disponible</Text>
      </View>
      <View className="w-full flex-row border border-indigo-500 rounded-2xl p-6 mt-4">
        <View className="flex-1 items-center justify-between">
          <Text className="text-indigo-950 text-2xl font-bold">1,000</Text>
          <Text className="text-indigo-950">USD</Text>
        </View>
        <View className="bg-indigo-200 w-[1px] h-full"></View>
        <View className="flex-1 items-center justify-between">
          <Text className="text-indigo-950 text-2xl font-bold">2,000,000</Text>
          <Text className="text-indigo-950">CDF</Text>
        </View>
      </View>
      <View className="w-full flex-row border border-indigo-500 bg-indigo-500 rounded-2xl p-4 mt-4">
        <View className="flex-1 items-center justify-between">
          <Icon name="ArrowRightLeft" size={32} color="#fff" />
          <Text className="text-white mt-2">Transférer</Text>
        </View>
        <View className="bg-indigo-200 w-[1px] h-full"></View>
        <View className="flex-1 items-center justify-between">
          <Icon name="BanknoteArrowUp" size={32} color="#fff" />
          <Text className="text-white mt-2">Appro</Text>
        </View>
        <View className="bg-indigo-200 w-[1px] h-full"></View>
        <View className="flex-1 items-center justify-between">
          <Icon name="History" size={32} color="#fff" />
          <Text className="text-white mt-2">Historique</Text>
        </View>
      </View>
      <View className="w-full flex-row my-6">
        {services.map((service) => (
          <ServiceItem
            key={service.title}
            icon={service.icon}
            iconColor={service.iconColor}
            title={service.title}
          />
        ))}
        <ServiceItem icon="Grid2x2Plus" iconColor="#4A67FF" title="Plus" />
      </View>

      <View>
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xl font-bold">Promotions</Text>
          <Text className="text-slate-500">Voir plus</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-1 px-6">
          {promotions.map((promotion) => (
            <PromotionItem
              key={promotion.title}
              title={promotion.title}
              description={promotion.description}
              image={promotion.image}
            />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function ServiceItem({ icon, title, iconColor }: ServiceItemProps) {
  return (
    <View className="flex-1 items-center justify-between">
      <View className="items-center bg-gray-100 p-6 rounded-3xl">
        <Icon name={icon} size={28} color={iconColor} />
      </View>
      <Text className="text-slate-500 mt-2">{title}</Text>
    </View>
  );
}

const images: { [key: string]: any } = {
  "promo-1": promo1Img,
  "promo-2": promo2Img,
};

function PromotionItem({ title, description, image }: PromotionItemProps) {
  return (
    <View className="items-center justify-between rounded-2xl mr-4">
      <Image
        source={images[image]}
        // className="w-48 h-32 rounded-lg"
        resizeMode="cover"
      />
    </View>
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
    backgroundColor: "#fff",
    paddingTop: 152,
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
