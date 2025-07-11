import Greet from "@/components/Greet";
import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import { Link } from "expo-router";
import { icons } from "lucide-react-native";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const promo1Img = require("../../assets/images/promo-1.png");
const promo2Img = require("../../assets/images/promo-2.png");

type ServiceItemProps = {
  icon: keyof typeof icons;
  title: string;
  iconColor?: string;
  routeName: string;
};

const services: ServiceItemProps[] = [
  {
    icon: "Newspaper",
    title: "Factures",
    routeName: "factures",
    iconColor: "#ff6900",
  },
  {
    icon: "CardSim",
    title: "Achat Credit",
    routeName: "achat-credit",
    iconColor: "#2b7fff",
  },
  {
    icon: "HandCoins",
    title: "Change",
    routeName: "change",
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
    <SafeAreaView className="w-full relative">
      <View className="w-full relative">
        <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
          <ProfileSheet />
          <Logo variant="default" size="small" />
          <NotificationsModal />
        </View>
        <ScrollView className="w-full px-6 mt-4">
          <View className="w-full">
            <Greet name="Junior" />
            <Text className="text-foreground dark:text-white">
              Votre solde disponible
            </Text>
          </View>
          <View className="w-full flex-row border border-indigo-500 rounded-2xl p-6 mt-4">
            <View className="flex-1 items-center justify-between">
              <Text className="text-foreground dark:text-white text-2xl font-bold">
                1,035,000
              </Text>
              <Text className="text-foreground dark:text-white">USD</Text>
            </View>
            <View className="bg-indigo-200 w-[1px] h-full"></View>
            <View className="flex-1 items-center justify-between">
              <Text className="text-foreground dark:text-white text-2xl font-bold">
                2,000,000
              </Text>
              <Text className="text-foreground dark:text-white">CDF</Text>
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
          <View className="w-full flex-row justify-between my-6">
            {services.map((service) => (
              <ServiceItem
                key={service.title}
                icon={service.icon}
                iconColor={service.iconColor}
                title={service.title}
                routeName={service.routeName}
              />
            ))}
            <ServiceItem
              icon="Grid2x2Plus"
              iconColor="#4A67FF"
              title="Plus"
              routeName="plus"
            />
          </View>

          <View className="w-full">
            <View className="flex-row items-center justify-between w-full">
              <Text className="text-xl font-bold dark:text-white">
                Promotions
              </Text>
              <Text className="text-slate-500 dark:text-white">Voir plus</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-1">
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function ServiceItem({ icon, title, iconColor, routeName }: ServiceItemProps) {
  return (
    <Link href={`/${routeName}`}>
      <View className="flex-1 items-center justify-between">
        <View className="items-center bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl">
          <Icon name={icon} size={28} color={iconColor} />
        </View>
        <Text className="text-slate-500 mt-2 dark:text-white">{title}</Text>
      </View>
    </Link>
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

// const styles = StyleSheet.create({
//   link: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     // backgroundColor: "#fff",
//   },
// });
