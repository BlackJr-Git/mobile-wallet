import React, { useState, useMemo } from "react";
import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import { Divider } from "@/components/ui/divider";
import PressableIcon from "@/components/ui/PressableIcon";
import TransactionCard from "@/components/Wallets/TransactionCard";
import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

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



const filterOptions = [
  { label: "Tout", value: "all" },
  { label: "Payement", value: "payment" },
  { label: "Retrait", value: "withdrawal" },
  { label: "Depot", value: "deposit" },
  { label: "Transfert", value: "transfer" },
];

export default function WalletScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return Transactions.filter((tx) => {
      const matchType = activeFilter === "all" || tx.type === activeFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        (tx.merchant && tx.merchant.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tx.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <SafeAreaView>
      <View className="w-full relative">
        <View className="w-full flex-row items-center justify-between px-6 z-10 bg-background">
          <ProfileSheet />
          {/* <Logo variant="default" size="small" /> */}
          <Text className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
            Factures
          </Text>
          <NotificationsModal />
        </View>
        <Animatable.View
          animation="fadeInDown"
          delay={100}
          className="w-full px-6 mb-2 mt-6"
        >
          {/* Search Bar */}
          <View className="flex-row items-center bg-white dark:bg-gray-900 rounded-2xl px-4 py-2 border border-gray-200 dark:border-gray-800 mb-3">
            <PressableIcon
              onPress={() => {}}
              name="Search"
              color="gray"
              iconSize={20}
            />
            <TextInput
              placeholder="Rechercher une facture, un marchand..."
              placeholderTextColor="#a3a3a3"
              className="flex-1 ml-2 text-base text-gray-800 dark:text-white"
              value={searchQuery}
              onChangeText={setSearchQuery}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {/* Filter Tabs */}
          <View className="flex-row gap-2 mt-1">
            {filterOptions.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => setActiveFilter(opt.value)}
                className={`px-4 py-2 rounded-full border 
                  ${activeFilter === opt.value
                    ? 'bg-indigo-500 border-indigo-500'
                    : 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-800'}
                `}
              >
                <Text
                  className={`text-sm font-semibold 
                    ${activeFilter === opt.value
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-200'}
                  `}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animatable.View>
        <Divider />
        <ScrollView
          className="w-full px-6"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 450 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full">
            
            <View className="w-full flex-col gap-2 mt-4">
              {filteredTransactions.length === 0 ? (
                <Text className="text-center text-gray-400 dark:text-gray-500 mt-8">
                  Aucune facture trouvée.
                </Text>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
