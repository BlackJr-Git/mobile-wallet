import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import Icon from "@/components/ui/Icon";
import PressableIcon from "@/components/ui/PressableIcon";
import Button from "@/components/ui/Button";
import { formatDateTimeFR } from "@/utils/formatDate";

// Types
interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  merchant: string;
  merchantLogo?: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "overdue" | "cancelled";
  type: "payment" | "withdrawal" | "deposit" | "transfer";
  items: InvoiceItem[];
  taxes: number;
  fees: number;
  subtotal: number;
  paymentMethod?: string;
  transactionId?: string;
  merchantAddress?: string;
  merchantPhone?: string;
  merchantEmail?: string;
  notes?: string;
}

// Mock invoice data
const mockInvoices: Record<string, Invoice> = {
  "1": {
    id: "1",
    invoiceNumber: "INV-2025-001",
    merchant: "PME.CD",
    date: "2025-01-25T14:32:00Z",
    dueDate: "2025-02-25T23:59:59Z",
    amount: 25000,
    currency: "USD",
    status: "paid",
    type: "payment",
    subtotal: 22500,
    taxes: 2250,
    fees: 250,
    paymentMethod: "F-Pay Wallet",
    transactionId: "TXN-789456123",
    merchantAddress: "123 Avenue de la Paix, Kinshasa, RDC",
    merchantPhone: "+243 81 234 5678",
    merchantEmail: "contact@pme.cd",
    notes: "Merci pour votre confiance. Paiement effectué avec succès.",
    items: [
      {
        id: "1",
        description: "Service de consultation",
        quantity: 2,
        unitPrice: 10000,
        total: 20000,
      },
      {
        id: "2",
        description: "Frais de dossier",
        quantity: 1,
        unitPrice: 2500,
        total: 2500,
      },
    ],
  },
  "2": {
    id: "2",
    invoiceNumber: "INV-2025-002",
    merchant: "Rawbank",
    date: "2025-01-24T09:15:43Z",
    dueDate: "2025-02-24T23:59:59Z",
    amount: 15000,
    currency: "USD",
    status: "pending",
    type: "withdrawal",
    subtotal: 15000,
    taxes: 0,
    fees: 0,
    paymentMethod: "Retrait ATM",
    transactionId: "TXN-456789012",
    merchantAddress: "456 Boulevard du 30 Juin, Kinshasa, RDC",
    merchantPhone: "+243 81 987 6543",
    merchantEmail: "support@rawbank.cd",
    notes: "Retrait en cours de traitement.",
    items: [
      {
        id: "1",
        description: "Retrait d'espèces",
        quantity: 1,
        unitPrice: 15000,
        total: 15000,
      },
    ],
  },
};

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const invoice = mockInvoices[id || "1"];

  if (!invoice) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Icon name="FileX" size={64} color="#9CA3AF" />
          <Text className="text-xl font-semibold text-foreground dark:text-white mb-2">
            Facture introuvable
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            La facture demandée n&apos;existe pas ou a été supprimée.
          </Text>
          <Button
            title="Retour"
            onPress={() => router.back()}
            className="bg-indigo-600"
          />
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "overdue":
        return "text-red-600";
      case "cancelled":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "Payée";
      case "pending":
        return "En attente";
      case "overdue":
        return "En retard";
      case "cancelled":
        return "Annulée";
      default:
        return "Inconnue";
    }
  };

  const getTypeIcon = (type: Invoice["type"]) => {
    switch (type) {
      case "payment":
        return "ShoppingBasket";
      case "withdrawal":
        return "BanknoteArrowDown";
      case "deposit":
        return "BanknoteArrowUp";
      case "transfer":
        return "ArrowRightLeft";
      default:
        return "Receipt";
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Facture ${invoice.invoiceNumber}\nMontant: ${invoice.amount} ${invoice.currency}\nMarchand: ${invoice.merchant}\nDate: ${formatDateTimeFR(invoice.date)}`,
        title: `Facture ${invoice.invoiceNumber}`,
      });
    } catch {
      Alert.alert("Erreur", "Impossible de partager la facture");
    }
  };

  const handleDownload = () => {
    Alert.alert(
      "Téléchargement",
      "Fonctionnalité de téléchargement en cours de développement"
    );
  };

  const handlePayment = () => {
    if (invoice.status === "pending" || invoice.status === "overdue") {
      Alert.alert(
        "Paiement",
        "Redirection vers la page de paiement...",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Continuer", onPress: () => {} },
        ]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <Animatable.View
        animation="fadeInDown"
        className="flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
      >
        <Pressable
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        >
          <Icon name="ArrowLeft" size={20} color="#374151" />
        </Pressable>
        <Text className="text-lg font-semibold text-foreground dark:text-white">
          Détails de la facture
        </Text>
        <View className="flex-row gap-2">
          <PressableIcon
            onPress={handleShare}
            name="Share"
            color="#6366f1"
            iconSize={20}
          />
          <PressableIcon
            onPress={handleDownload}
            name="Download"
            color="#6366f1"
            iconSize={20}
          />
        </View>
      </Animatable.View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Invoice Header */}
        <Animatable.View animation="fadeInUp" delay={200} className="px-6 py-6">
          <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl items-center justify-center mr-3">
                  <Icon
                    name={getTypeIcon(invoice.type)}
                    size={24}
                    color="#6366f1"
                  />
                </View>
                <View>
                  <Text className="text-lg font-bold text-foreground dark:text-white">
                    {invoice.invoiceNumber}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {invoice.merchant}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-foreground dark:text-white">
                  {invoice.amount.toLocaleString()} {invoice.currency}
                </Text>
                <Text className={`text-sm font-medium ${getStatusColor(invoice.status)}`}>
                  {getStatusText(invoice.status)}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <View>
                <Text className="text-xs text-gray-500 mb-1">Date d&apos;émission</Text>
                <Text className="text-sm font-medium text-foreground dark:text-white">
                  {formatDateTimeFR(invoice.date)}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-gray-500 mb-1">Date d&apos;échéance</Text>
                <Text className="text-sm font-medium text-foreground dark:text-white">
                  {formatDateTimeFR(invoice.dueDate)}
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Invoice Items */}
        <Animatable.View animation="fadeInUp" delay={400} className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground dark:text-white mb-4">
            Détails des articles
          </Text>
          <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            {invoice.items.map((item, index) => (
              <Animatable.View
                key={item.id}
                animation="fadeInLeft"
                delay={600 + index * 100}
                className={`p-4 ${index < invoice.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 mr-4">
                    <Text className="font-medium text-foreground dark:text-white mb-1">
                      {item.description}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {item.quantity} × {item.unitPrice.toLocaleString()} {invoice.currency}
                    </Text>
                  </View>
                  <Text className="font-semibold text-foreground dark:text-white">
                    {item.total.toLocaleString()} {invoice.currency}
                  </Text>
                </View>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>

        {/* Invoice Summary */}
        <Animatable.View animation="fadeInUp" delay={800} className="px-6 mb-6">
          <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <Text className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Résumé
            </Text>
            
            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Sous-total</Text>
                <Text className="font-medium text-foreground dark:text-white">
                  {invoice.subtotal.toLocaleString()} {invoice.currency}
                </Text>
              </View>
              
              {invoice.taxes > 0 && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-600 dark:text-gray-400">Taxes</Text>
                  <Text className="font-medium text-foreground dark:text-white">
                    {invoice.taxes.toLocaleString()} {invoice.currency}
                  </Text>
                </View>
              )}
              
              {invoice.fees > 0 && (
                <View className="flex-row justify-between">
                  <Text className="text-gray-600 dark:text-gray-400">Frais</Text>
                  <Text className="font-medium text-foreground dark:text-white">
                    {invoice.fees.toLocaleString()} {invoice.currency}
                  </Text>
                </View>
              )}
              
              <View className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold text-foreground dark:text-white">
                    Total
                  </Text>
                  <Text className="text-lg font-bold text-foreground dark:text-white">
                    {invoice.amount.toLocaleString()} {invoice.currency}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Payment Information */}
        <Animatable.View animation="fadeInUp" delay={1000} className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground dark:text-white mb-4">
            Informations de paiement
          </Text>
          <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <View className="space-y-4">
              {invoice.paymentMethod && (
                <View>
                  <Text className="text-sm text-gray-500 mb-1">Méthode de paiement</Text>
                  <Text className="font-medium text-foreground dark:text-white">
                    {invoice.paymentMethod}
                  </Text>
                </View>
              )}
              
              {invoice.transactionId && (
                <View>
                  <Text className="text-sm text-gray-500 mb-1">ID de transaction</Text>
                  <Text className="font-mono text-sm text-foreground dark:text-white">
                    {invoice.transactionId}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animatable.View>

        {/* Merchant Information */}
        <Animatable.View animation="fadeInUp" delay={1200} className="px-6 mb-6">
          <Text className="text-lg font-semibold text-foreground dark:text-white mb-4">
            Informations du marchand
          </Text>
          <View className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <View className="space-y-4">
              <View>
                <Text className="text-sm text-gray-500 mb-1">Nom</Text>
                <Text className="font-medium text-foreground dark:text-white">
                  {invoice.merchant}
                </Text>
              </View>
              
              {invoice.merchantAddress && (
                <View>
                  <Text className="text-sm text-gray-500 mb-1">Adresse</Text>
                  <Text className="text-foreground dark:text-white">
                    {invoice.merchantAddress}
                  </Text>
                </View>
              )}
              
              <View className="flex-row justify-between">
                {invoice.merchantPhone && (
                  <View className="flex-1 mr-4">
                    <Text className="text-sm text-gray-500 mb-1">Téléphone</Text>
                    <Text className="text-foreground dark:text-white">
                      {invoice.merchantPhone}
                    </Text>
                  </View>
                )}
                
                {invoice.merchantEmail && (
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500 mb-1">Email</Text>
                    <Text className="text-foreground dark:text-white">
                      {invoice.merchantEmail}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Notes */}
        {invoice.notes && (
          <Animatable.View animation="fadeInUp" delay={1400} className="px-6 mb-6">
            <Text className="text-lg font-semibold text-foreground dark:text-white mb-4">
              Notes
            </Text>
            <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
              <Text className="text-foreground dark:text-white leading-6">
                {invoice.notes}
              </Text>
            </View>
          </Animatable.View>
        )}

        {/* Action Buttons */}
        <Animatable.View animation="fadeInUp" delay={1600} className="px-6 pb-8">
          {(invoice.status === "pending" || invoice.status === "overdue") && (
            <Button
              title="Payer maintenant"
              onPress={handlePayment}
              className="bg-indigo-600 mb-4"
            />
          )}
          
          <View className="flex-row gap-4">
            <Pressable
              onPress={handleShare}
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl py-4 items-center"
            >
              <Icon name="Share" size={20} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 font-medium">
                Partager
              </Text>
            </Pressable>
            
            <Pressable
              onPress={handleDownload}
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl py-4 items-center"
            >
              <Icon name="Download" size={20} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 font-medium">
                Télécharger
              </Text>
            </Pressable>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}