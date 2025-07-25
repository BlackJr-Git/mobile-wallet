import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import Icon from "@/components/ui/Icon";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
          <ProfileSheet />
          {/* <Logo variant="default" size="small" /> */}
          <Text className="text-2xl font-bold dark:text-white">Historique</Text>
          <NotificationsModal />
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Title */}
        {/* <Animatable.View animation="fadeInUp" delay={200}>
          <Text style={styles.title}>Historique des transactions</Text>
        </Animatable.View> */}

        {/* Filter Tabs */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <FilterTabs
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </Animatable.View>

        {/* Transaction Summary */}
        {/* <Animatable.View animation="fadeInUp" delay={400}>
          <TransactionSummary transactions={filteredTransactions} />
        </Animatable.View> */}

        {/* Transaction List */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <View style={styles.transactionList}>
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
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <Pressable
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.activeFilterTab,
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText,
              ]}
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

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "failed":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

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
      <View style={styles.transactionItem}>
        <View style={styles.transactionIcon}>
          <Icon
            name={getTransactionIcon(transaction.type)}
            size={24}
            color={getTransactionColor(transaction.type)}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionDescription}>
            {transaction.description}
          </Text>
          {(transaction.recipient ||
            transaction.sender ||
            transaction.operator) && (
            <Text style={styles.transactionSubtext}>
              {transaction.recipient && `Vers: ${transaction.recipient}`}
              {transaction.sender && `De: ${transaction.sender}`}
              {transaction.operator && `Opérateur: ${transaction.operator}`}
            </Text>
          )}
          <Text style={styles.transactionDate}>
            {formatDate(transaction.date)}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text
            style={[
              styles.amountText,
              {
                color: transaction.type === "received" ? "#10B981" : "#EF4444",
              },
            ]}
          >
            {transaction.type === "received" ? "+" : "-"}
            {transaction.amount} {transaction.currency}
          </Text>
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(transaction.status) },
            ]}
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
  const getMessage = () => {
    switch (filter) {
      case "completed":
        return "Aucune transaction terminée";
      case "pending":
        return "Aucune transaction en cours";
      case "failed":
        return "Aucune transaction échouée";
      default:
        return "Aucune transaction trouvée";
    }
  };

  return (
    <Animatable.View animation="fadeIn" style={styles.emptyState}>
      <Icon name="Receipt" size={64} color="#D1D5DB" />
      <Text style={styles.emptyStateText}>{getMessage()}</Text>
      <Text style={styles.emptyStateSubtext}>
        Vos transactions apparaîtront ici une fois effectuées
      </Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerButton: {
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  activeFilterTab: {
    backgroundColor: "#4A67FF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  transactionSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
