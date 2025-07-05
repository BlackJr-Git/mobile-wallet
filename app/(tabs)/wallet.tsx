import ProfileSheet from "@/components/home/ProfileSheet";
import { Divider } from "@/components/ui/divider";
import Icon from "@/components/ui/Icon";
import PressableIcon from "@/components/ui/PressableIcon";
import CreditCard from "@/components/Wallets/CreditCard";
import TransactionCard from "@/components/Wallets/TransactionCard";
import { ColorValue, ScrollView, Text, View } from "react-native";

type CreditCardItemProps = {
  id: number;
  accountNumber: string;
  balance: string;
  currency: string;
  userName: string;
  image: string;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

const creditCards: CreditCardItemProps[] = [
  {
    id: 1,
    accountNumber: "1234567890123127",
    balance: "1,000,000",
    currency: "USD",
    userName: "Junior Asosa",
    image: "promo-1",
    colors: ["#a855f7", "#6366f1"] as const,
  },
  {
    id: 2,
    accountNumber: "1234567890",
    balance: "1,000,000",
    currency: "CDF",
    userName: "Junior Asosa",
    image: "promo-2",
    colors: ["#4A67FF", "#00FF94"] as const,
  },
];

const Transactions = [
  {
    id: 1,
    type: "payment",
    merchant: "PME.CD",
    date: "2025-07-05T14:32:00Z",
    amount: 25000,
    status: "success",
    currency: "USD",
  },
  {
    id: 2,
    type: "withdrawal",
    merchant: "Rawbank",
    date: "2025-07-04T09:15:43Z",
    amount: 15000,
    status: "pending",
    currency: "USD",
  },
  {
    id: 3,
    type: "deposit",
    // merchant: "Merchant 3",
    date: "2025-07-03T18:22:10Z",
    amount: 50000,
    status: "success",
    currency: "USD",
  },
  {
    id: 4,
    type: "transfer",
    date: "2025-07-02T22:45:00Z",
    amount: 10000,
    status: "failed",
    currency: "USD",
  },
  {
    id: 5,
    type: "payment",
    merchant: "FOGEC",
    date: "2025-07-01T11:05:20Z",
    amount: 32000,
    status: "success",
    currency: "USD",
  },
];

export default function WalletScreen() {
  return (
    <View className="w-full relative mt-24">
      <View className="w-full flex-row items-center justify-between absolute px-6 z-10 bg-background">
        <ProfileSheet />
        {/* <Logo variant="default" size="small" /> */}
        <Text className="text-foreground dark:text-white text-2xl">
          Wallets
        </Text>
        <PressableIcon onPress={() => {}} name="Bell" color="#4A67FF" />
      </View>
      <ScrollView className="w-full px-6 mt-20 mb-32">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-1 mt-4">
            {creditCards.map((creditCard) => (
              <CreditCard
                key={creditCard.id}
                id={creditCard.id}
                accountNumber={creditCard.accountNumber}
                balance={creditCard.balance}
                currency={creditCard.currency}
                userName={creditCard.userName}
                image={creditCard.image}
                colors={creditCard.colors}
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
        <View className="w-full border border-indigo-50 dark:border-indigo-800 rounded-2xl p-4 mt-4">
          <View className="flex-1 flex-row items-center justify-between mb-4">
            <Text className="text-white mt-2">Transactions recentes</Text>
            <Text className="text-white mt-2">Voir plus</Text>
          </View>
          <Divider />
          <View className="w-full flex-col gap-2 mt-4">
            {Transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
