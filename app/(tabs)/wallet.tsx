import { Image, ScrollView, Text, View } from "react-native";
// import { ThemedText } from '@/components/ThemedText';
import ProfileSheet from "@/components/home/ProfileSheet";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import PressableIcon from "@/components/ui/PressableIcon";

const promo1Img = require("../../assets/images/promo-1.png");
const promo2Img = require("../../assets/images/promo-2.png");
const simImg = require("../../assets/images/sim.png");

type CreditCardItemProps = {
  id: number;
  accountNumber: string;
  balance: string;
  currency: string;
  userName: string;
  image: string;
};

const creditCards: CreditCardItemProps[] = [
  {
    id: 1,
    accountNumber: "1234567890123127",
    balance: "1,000,000",
    currency: "USD",
    userName: "Junior Asosa",
    image: "promo-1",
  },
  {
    id: 2,
    accountNumber: "1234567890",
    balance: "1,000,000",
    currency: "CDF",
    userName: "Junior Asosa",
    image: "promo-2",
  },
];

export default function HomeScreen() {
  return (
    <View className="w-full relative mt-24">
      <View className="w-full flex-row items-center justify-between absolute px-6 z-10 bg-background-0">
        <ProfileSheet />
        {/* <Logo variant="default" size="small" /> */}
        <Text className="text-foreground dark:text-white text-2xl">
          Wallets
        </Text>
        <PressableIcon onPress={() => {}} name="Bell" color="#4A67FF" />
      </View>
      <ScrollView className="h-full w-full px-6 mt-20">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-1 mt-4">
            {creditCards.map((creditCard) => (
              <CreditCardItem
                key={creditCard.id}
                id={creditCard.id}
                accountNumber={creditCard.accountNumber}
                balance={creditCard.balance}
                currency={creditCard.currency}
                userName={creditCard.userName}
                image={creditCard.image}
              />
            ))}
          </View>
        </ScrollView>
        <View className="w-full flex-row border border-indigo-500 bg-indigo-500 rounded-2xl p-4 mt-4">
          <View className="flex-1 items-center justify-between">
            <Icon name="ArrowRightLeft" size={32} color="#fff" />
            <Text className="text-white mt-2">Transférer</Text>
          </View>
          <View className="bg-indigo-200 w-[1px] h-full"></View>
          <View className="flex-1 items-center justify-between">
            <Icon name="BanknoteArrowUp" size={32} color="#fff" />
            <Text className="text-white mt-2">Approvisionner</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const images: { [key: string]: any } = {
  "promo-1": promo1Img,
  "promo-2": promo2Img,
};

function CreditCardItem({
  id,
  accountNumber,
  balance,
  currency,
  userName,
  image,
}: CreditCardItemProps) {
  return (
    <View className="items-center justify-between rounded-2xl mr-4 w-[320px] h-[192px] bg-red-500 p-4">
      <View className="flex-row items-center justify-between w-full">
        <Logo variant="default" size="small" withText />
        <Image source={simImg} className="w-12 h-12" />
      </View>
      <View className="flex-row items-center gap-2 w-full justify-between">
        <Text className="text-foreground dark:text-white text-lg font-bold">
          {accountNumber.slice(0, 4) +
            " " +
            accountNumber.slice(4, 8) +
            " " +
            accountNumber.slice(8, 12) +
            " " +
            accountNumber.slice(12, 16)}
        </Text>
        <Text className="text-foreground dark:text-white text-lg font-bold">
          {balance} {currency === "CDF" ? "fc" : "$"}
        </Text>
      </View>
      <View className="w-full flex-row justify-between">
        <View className="flex-col gap-1">
          <Text className="text-foreground dark:text-white text-sm">
            Nom du titulaire
          </Text>
          <Text className="text-foreground dark:text-white text-base font-bold">
            {userName}
          </Text>
        </View>
        <View className="flex-col gap-1">
          <Text className="text-foreground dark:text-white text-sm">
            Portmonnaie
          </Text>
          <Text className="text-foreground dark:text-white text-base font-bold">
            {currency === "CDF" ? "Francs Congolais" : "Dollars"}
          </Text>
        </View>
      </View>
    </View>
  );
}
