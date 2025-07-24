import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import PaymentMethodModal, {
  PaymentMethodModalRef,
} from "@/components/payment/PaymentMethod";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface PaymentMethodType {
  id: number;
  name: string;
  slug: string;
  image: string;
  availableAmount: string;
  currency: string;
}

const paymentMethods: PaymentMethodType[] = [
  {
    id: 1,
    name: "Portmonnaie USD",
    slug: "fpay-usd",
    availableAmount: "10240",
    currency: "USD",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753284537/logo_2_uryiq5.jpg",
  },
  {
    id: 2,
    name: "Portmonnaie CDF",
    slug: "fpay-cdf",
    availableAmount: "10000",
    currency: "CDF",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753284537/logo_2_uryiq5.jpg",
  },
];

const rechargeMethods = [
  {
    id: 1,
    name: "Carte de crédit",
    slug: "card",
  },
  {
    id: 2,
    name: "Mobile Money",
    slug: "mobile-money",
  },
];

export default function TransfertScreen() {
  const paymentMethodModalRef = useRef<PaymentMethodModalRef>(null);
  const [amount, setAmount] = useState("");
  const [rechargeMethod, setRechargeMethod] = useState<string>("mobile-money");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<PaymentMethodType>(paymentMethods[0]);

  const handleSubmit = () => {
    // TODO: implement submit logic
    console.log(amount, rechargeMethod, selectedPaymentMethod);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
            <ProfileSheet />
            {/* <Logo variant="default" size="small" /> */}
            <Text className="text-2xl font-bold dark:text-white">Recharge</Text>
            <NotificationsModal />
          </View>
          <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
            <View className="flex-1 w-full px-6">
              <View className="my-6">
                <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
                  Selectionnez le portmonnaie a recharger
                </Text>
                <OpenPaymentMethodItem
                  icon={selectedPaymentMethod.image}
                  title={selectedPaymentMethod.name}
                  availableAmount={selectedPaymentMethod.availableAmount}
                  currency={selectedPaymentMethod.currency}
                  onPress={() => paymentMethodModalRef.current?.expand()}
                />
              </View>
              <View className="w-full my-6">
                <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
                  Saisissez le montant
                </Text>
                <TextInput
                  maxLength={6}
                  className="flex focus-within:border-indigo-500 focus-within:border-2 w-full h-20 rounded-2xl border text-2xl text-indigo-500 font-bold text-center border-gray-300 p-2 items-center justify-center"
                  placeholder="Montant"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>

              <View className="w-full my-6">
                <View className="flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 rounded-2xl  p-2">
                  <Pressable
                    onPress={() => setRechargeMethod("mobile-money")}
                    className={
                      "flex-row items-center gap-2 rounded-2xl p-3 " +
                      (rechargeMethod === "mobile-money"
                        ? "bg-indigo-300"
                        : "bg-gray-200 dark:bg-gray-800")
                    }
                  >
                    <Icon name="Smartphone" size={24} color="#4A67FF" />
                    <Text className="text-foreground dark:text-white font-semibold text-xl">
                      Mobile Money
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setRechargeMethod("card")}
                    className={
                      "flex-row items-center gap-2 rounded-2xl p-3 " +
                      (rechargeMethod === "card"
                        ? "bg-indigo-300"
                        : "bg-gray-200 dark:bg-gray-800")
                    }
                  >
                    <Icon name="CreditCard" size={24} color="#4A67FF" />
                    <Text className="text-foreground dark:text-white font-semibold text-xl">
                      Carte de crédit
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="flex-1 flex-col">
                <View className="flex-1"></View>
                <Button
                  className="mb-6"
                  title="Continuer"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <PaymentMethodModal
        ref={paymentMethodModalRef}
        onSelectMethod={setSelectedPaymentMethod}
        selectedMethod={selectedPaymentMethod}
      />
    </>
  );
}

export type OpenPaymentMethodItemProps = {
  icon: string;
  title: string;
  availableAmount: string;
  onPress: () => void;
  currency: string;
};

export function OpenPaymentMethodItem({
  icon,
  title,
  availableAmount,
  onPress,
  currency,
}: OpenPaymentMethodItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-4 rounded-2xl"
    >
      <View className="flex-row items-center gap-2">
        <Image
          source={{ uri: icon }}
          className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800"
        />
        <View className="flex flex-col items-left gap-1">
          <Text className="text-foreground dark:text-white font-bold text-lg">
            {title}
          </Text>
          <Text className="text-slate-500 dark:text-white">
            {availableAmount} {currency}
          </Text>
        </View>
      </View>
      <Icon name="ChevronDown" size={24} color="gray" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
});
