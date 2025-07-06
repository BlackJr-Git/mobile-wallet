import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import { Divider } from "@/components/ui/divider";
import PressableIcon from "@/components/ui/PressableIcon";
import SelectInput from "@/components/ui/SelectInput";
import TransactionCard from "@/components/Wallets/TransactionCard";
import { ScrollView, Text, View } from "react-native";

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
  {
    id: 6,
    type: "payment",
    merchant: "FOGEC",
    date: "2025-07-01T11:05:20Z",
    amount: 32000,
    status: "success",
    currency: "USD",
  },
  {
    id: 7,
    type: "payment",
    merchant: "FOGEC",
    date: "2025-07-01T11:05:20Z",
    amount: 32000,
    status: "success",
    currency: "USD",
  },
  {
    id: 8,
    type: "payment",
    merchant: "FOGEC",
    date: "2025-07-01T11:05:20Z",
    amount: 32000,
    status: "success",
    currency: "USD",
  },
  {
    id: 9,
    type: "payment",
    merchant: "FOGEC",
    date: "2025-07-01T11:05:20Z",
    amount: 32000,
    status: "success",
    currency: "USD",
  },
];

const options = [
  { label: "Tout", value: "all" },
  { label: "Payement", value: "payment" },
  { label: "Retrait", value: "withdrawal" },
  { label: "Depot", value: "deposit" },
  { label: "Transfert", value: "transfer" },
];

export default function WalletScreen() {
  return (
    <View className="w-full relative mt-24">
      <View className="w-full flex-row items-center justify-between absolute px-6 z-10 bg-background">
        <ProfileSheet />
        {/* <Logo variant="default" size="small" /> */}
        <Text className="text-foreground dark:text-white text-2xl">
          Factures
        </Text>
        <NotificationsModal />
      </View>
      <ScrollView className="w-full px-6 mt-20 mb-32">
        <View className="w-full">
          <View className="flex-1 flex-row items-center justify-between mb-4 gap-4">
            <SelectInput
              className="flex-1 rounded-2xl"
              placeholder="Tout"
              options={options}
            />
            <PressableIcon
              onPress={() => {}}
              name="Search"
              color="gray"
              iconSize={20}
            />
            <PressableIcon
              onPress={() => {}}
              name="SlidersHorizontal"
              color="gray"
              iconSize={20}
            />
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
