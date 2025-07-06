import Icon from "@/components/ui/Icon";
import { formatDateTimeFR } from "@/utils/formatDate";
import { icons } from "lucide-react-native";
import { Text, View } from "react-native";

type TransactionItemProps = {
  id: number;
  type: string;
  merchant?: string;
  date: string;
  amount: number;
  status: string;
  currency: string;
};

const transactionTypeIcon = {
  payment: "ShoppingBasket" as keyof typeof icons,
  withdrawal: "BanknoteArrowDown" as keyof typeof icons,
  deposit: "BanknoteArrowUp" as keyof typeof icons,
  transfer: "ArrowRightLeft" as keyof typeof icons,
};

export default function TransactionItem({
  transaction,
}: {
  transaction: TransactionItemProps;
}) {
  return (
    <View className="w-full flex-row items-center justify-between mb-1">
      <View className="w-16 h-16 bg-indigo-200 dark:bg-indigo-900 rounded-2xl items-center justify-center">
        <Icon
          name={
            transactionTypeIcon[
              transaction.type as keyof typeof transactionTypeIcon
            ]
          }
          size={24}
          color="#fff"
        />
      </View>
      <View className="flex-1 ml-4">
        <Text className=" dark:text-white mt-2 font-semibold">
          {transaction.type === "payment"
            ? "Paiement"
            : transaction.type === "withdrawal"
            ? "Retrait"
            : transaction.type === "deposit"
            ? "Depot"
            : transaction.type === "transfer"
            ? "Transfert"
            : "Autre"}{" "}
          {transaction.merchant ? `- ${transaction.merchant}` : ""}
        </Text>
        <Text className="text-slate-600 dark:text-white mt-2">
          {formatDateTimeFR(transaction.date)}
        </Text>
      </View>
      <View>
        <Text className="text-foreground dark:text-white mt-2 font-bold text-lg">
          {transaction.currency === "CDF" ? "Fc" : "$"} {transaction.amount}
        </Text>
        <Text
          className={`mt-2 text-xs p-1 px-2 rounded-lg text-center ${
            transaction.status === "success"
              ? "bg-green-300 text-green-900"
              : transaction.status === "pending"
              ? "bg-yellow-300 text-yellow-900"
              : "bg-red-300 text-red-900"
          }`}
        >
          {transaction.status === "success"
            ? "Confirmé"
            : transaction.status === "pending"
            ? "En cours"
            : "Echoué"}
        </Text>
      </View>
    </View>
  );
}
