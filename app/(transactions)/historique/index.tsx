import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Icon from "@/components/ui/Icon";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

// Types
interface Transaction {
  id: string;
  type: "recharge" | "transfert" | "achat-credit" | "received";
  amount: string;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
  recipient?: string;
  sender?: string;
  operator?: string;
}

// Mock data for transactions
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "recharge",
    amount: "50.00",
    currency: "USD",
    date: "2025-01-25T10:30:00Z",
    status: "completed",
    description: "Recharge de portefeuille",
  },
  {
    id: "2",
    type: "transfert",
    amount: "25.00",
    currency: "USD",
    date: "2025-01-24T15:45:00Z",
    status: "completed",
    description: "Transfert vers John Doe",
    recipient: "John Doe",
  },
  {
    id: "3",
    type: "achat-credit",
    amount: "10.00",
    currency: "USD",
    date: "2025-01-24T09:20:00Z",
    status: "completed",
    description: "Achat crédit Orange",
    operator: "Orange",
  },
  {
    id: "4",
    type: "received",
    amount: "100.00",
    currency: "USD",
    date: "2025-01-23T14:10:00Z",
    status: "completed",
    description: "Reçu de Marie Dupont",
    sender: "Marie Dupont",
  },
  {
    id: "5",
    type: "transfert",
    amount: "15.50",
    currency: "USD",
    date: "2025-01-23T11:30:00Z",
    status: "pending",
    description: "Transfert vers Alice Martin",
    recipient: "Alice Martin",
  },
];

export default function HistoriqueScreen() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "completed" | "pending" | "failed"
  >("all");

  const filteredTransactions = mockTransactions.filter((transaction) => {
    if (selectedFilter === "all") return true;
    return transaction.status === selectedFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-background-0">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
        <ProfileSheet />
        {/* <Logo variant="default" size="small" /> */}
        <Text className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
          Historique
        </Text>
        <NotificationsModal />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <FilterTabs
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </Animatable.View>
        {/* Transaction List */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <View className="px-5">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  formatDate={formatDate}
                  delay={600 + index * 100}
                />
              ))
            ) : (
              <EmptyState filter={selectedFilter} />
            )}
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Header Component
// interface TransactionHeaderProps {
//   onProfilePress: () => void;
//   onNotificationsPress: () => void;
// }

// function TransactionHeader({
//   onProfilePress,
//   onNotificationsPress,
// }: TransactionHeaderProps) {
//   return (
//     <Animatable.View animation="fadeInDown" style={styles.header}>
//       <Pressable onPress={onProfilePress} style={styles.headerButton}>
//         <Icon name="User" size={32} color="#4A67FF" />
//       </Pressable>
//       <Pressable onPress={onNotificationsPress} style={styles.headerButton}>
//         <Icon name="Bell" size={28} color="#4A67FF" />
//       </Pressable>
//     </Animatable.View>
//   );
// }

// Filter Tabs Component
interface FilterTabsProps {
  selectedFilter: "all" | "completed" | "pending" | "failed";
  onFilterChange: (filter: "all" | "completed" | "pending" | "failed") => void;
}

function FilterTabs({ selectedFilter, onFilterChange }: FilterTabsProps) {
  const filters = [
    { key: "all" as const, label: "Toutes" },
    { key: "completed" as const, label: "Terminées" },
    { key: "pending" as const, label: "En cours" },
    { key: "failed" as const, label: "Échouées" },
  ];

  return (
    <View className="px-5 mb-5">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <Pressable
            key={filter.key}
            className={`px-4 py-2 mr-3 rounded-full ${
              selectedFilter === filter.key
                ? "bg-indigo-500"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text
              className={`text-sm font-medium ${
                selectedFilter === filter.key
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// Transaction Summary Component
// interface TransactionSummaryProps {
//   transactions: Transaction[];
// }

// function TransactionSummary({ transactions }: TransactionSummaryProps) {
//   const totalAmount = transactions
//     .filter((t) => t.status === "completed")
//     .reduce((sum, t) => {
//       const amount = parseFloat(t.amount);
//       return t.type === "received" ? sum + amount : sum - amount;
//     }, 0);

//   const completedCount = transactions.filter(
//     (t) => t.status === "completed"
//   ).length;
//   const pendingCount = transactions.filter(
//     (t) => t.status === "pending"
//   ).length;

//   return (
//     <View style={styles.summaryContainer}>
//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryLabel}>Solde net</Text>
//         <Text
//           style={[
//             styles.summaryValue,
//             { color: totalAmount >= 0 ? "#10B981" : "#EF4444" },
//           ]}
//         >
//           {totalAmount >= 0 ? "+" : ""}
//           {totalAmount.toFixed(2)} USD
//         </Text>
//       </View>
//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryLabel}>Terminées</Text>
//         <Text style={styles.summaryValue}>{completedCount}</Text>
//       </View>
//       <View style={styles.summaryCard}>
//         <Text style={styles.summaryLabel}>En cours</Text>
//         <Text style={[styles.summaryValue, { color: "#F59E0B" }]}>
//           {pendingCount}
//         </Text>
//       </View>
//     </View>
//   );
// }

// Transaction Item Component
interface TransactionItemProps {
  transaction: Transaction;
  formatDate: (date: string) => string;
  delay: number;
}

function TransactionItem({
  transaction,
  formatDate,
  delay,
}: TransactionItemProps) {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "recharge":
        return "Plus";
      case "transfert":
        return "ArrowRight";
      case "achat-credit":
        return "Smartphone";
      case "received":
        return "ArrowDown";
      default:
        return "Circle";
    }
  };

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "recharge":
        return "#10B981";
      case "transfert":
        return "#EF4444";
      case "achat-credit":
        return "#F59E0B";
      case "received":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  // const getStatusColor = (status: Transaction["status"]) => {
  //   switch (status) {
  //     case "completed":
  //       return "#10B981";
  //     case "pending":
  //       return "#F59E0B";
  //     case "failed":
  //       return "#EF4444";
  //     default:
  //       return "#6B7280";
  //   }
  // };

  const getStatusText = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "Terminée";
      case "pending":
        return "En cours";
      case "failed":
        return "Échouée";
      default:
        return "Inconnue";
    }
  };

  return (
    <Animatable.View animation="fadeInUp" delay={delay}>
      <View className="flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-2xl mb-3 shadow-sm">
        <View className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 items-center justify-center mr-3">
          <Icon
            name={getTransactionIcon(transaction.type)}
            size={24}
            color={getTransactionColor(transaction.type)}
          />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground dark:text-white mb-0.5">
            {transaction.description}
          </Text>
          {(transaction.recipient ||
            transaction.sender ||
            transaction.operator) && (
            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">
              {transaction.recipient && `Vers: ${transaction.recipient}`}
              {transaction.sender && `De: ${transaction.sender}`}
              {transaction.operator && `Opérateur: ${transaction.operator}`}
            </Text>
          )}
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(transaction.date)}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className={`text-base font-bold mb-0.5 ${
              transaction.type === "received"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {transaction.type === "received" ? "+" : "-"}
            {transaction.amount} {transaction.currency}
          </Text>
          <Text
            className={`text-xs font-medium ${
              transaction.status === "completed"
                ? "text-green-600"
                : transaction.status === "pending"
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            {getStatusText(transaction.status)}
          </Text>
        </View>
      </View>
    </Animatable.View>
  );
}

// Empty State Component
interface EmptyStateProps {
  filter: "all" | "completed" | "pending" | "failed";
}

function EmptyState({ filter }: EmptyStateProps) {
  let message = "Aucune transaction trouvée.";
  let subtext = "Il n'y a pas de transactions pour ce filtre.";
  if (filter === "completed") {
    message = "Aucune transaction terminée.";
    subtext = "Vous n'avez pas encore de transactions terminées.";
  } else if (filter === "pending") {
    message = "Aucune transaction en cours.";
    subtext = "Vous n'avez pas encore de transactions en attente.";
  } else if (filter === "failed") {
    message = "Aucune transaction échouée.";
    subtext = "Vous n'avez pas encore de transactions échouées.";
  }

  return (
    <View className="items-center py-16">
      <Icon name="Inbox" size={48} color="#6366f1" />
      <Text className="text-lg font-semibold text-indigo-500 mt-4 mb-2 text-center">
        {message}
      </Text>
      <Text className="text-sm text-gray-400 dark:text-gray-500 text-center px-6">
        {subtext}
      </Text>
    </View>
  );
}
