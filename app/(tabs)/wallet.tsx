import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import { Divider } from "@/components/ui/divider";
import Icon from "@/components/ui/Icon";
import CreditCard from "@/components/Wallets/CreditCard";
import TransactionCard from "@/components/Wallets/TransactionCard";
import { ColorValue, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    colors: ["#6366f1", "#a855f7"] as const,
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
    <SafeAreaView>
      <View className="w-full relative">
        <View className="w-full flex-row items-center justify-between absolute px-6 z-10 bg-background">
          <ProfileSheet />
          {/* <Logo variant="default" size="small" /> */}
          <Text className="text-foreground dark:text-white text-2xl">
            Wallets
          </Text>
          <NotificationsModal />
        </View>
        <ScrollView
          className="w-full mt-20 pb-64"
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="pl-6"
          >
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
          <View className="w-full flex-row items-center justify-center my-4 gap-2">
            <View className="w-16 h-2 bg-indigo-500 rounded-full items-center justify-center"></View>
            <View className="w-2 h-2 bg-indigo-500 rounded-full items-center justify-center"></View>
          </View>
          <View className="w-full px-6">
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
          </View>
          <View className="w-full border px-6 rounded-2xl p-4 mt-4">
            <View className="flex-1 flex-row items-center justify-between mb-4">
              <Text className="dark:text-white mt-2">
                Transactions recentes
              </Text>
              <Text className="dark:text-white mt-2">Voir plus</Text>
            </View>
            <Divider />
            <View className="w-full flex-col gap-2 mt-4">
              {Transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
