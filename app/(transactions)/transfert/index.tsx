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
  ScrollView,
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

export default function TransfertScreen() {
  const paymentMethodModalRef = useRef<PaymentMethodModalRef>(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<PaymentMethodType>(paymentMethods[0]);

  const handleSubmit = () => {
    // TODO: implement submit logic
  };

  return (
    <>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background mt-16">
          <ProfileSheet />
          {/* <Logo variant="default" size="small" /> */}
          <Text className="text-2xl font-bold dark:text-white">
            Transfert d&apos;argent
          </Text>
          <NotificationsModal />
        </View>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <View className="flex-1 w-full px-6">
            <View className="my-6 flex-row items-center justify-center gap-2">
              <View className="flex-row items-center border border-gray-300 p-2 rounded-2xl h-16">
                <Text className="text-xl font-bold text-gray-400">
                  🇨🇩 +243
                </Text>
              </View>
              <TextInput
                placeholder="Numéro de téléphone"
                className="flex-1 h-16 rounded-2xl border text-xl text-indigo-500 border-gray-300 p-2"
                maxLength={10}
                keyboardType="numeric"
                value={recipient}
                onChangeText={setRecipient}
              />
            </View>
            <OpenPaymentMethodItem
              icon={selectedPaymentMethod.image}
              title={selectedPaymentMethod.name}
              availableAmount={selectedPaymentMethod.availableAmount}
              currency={selectedPaymentMethod.currency}
              onPress={() => paymentMethodModalRef.current?.expand()}
            />
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
            <View className="my-6">
              <TextInput
                placeholder="Raison du transfert"
                className="w-full h-16 rounded-2xl border text-xl text-indigo-500 border-gray-300 p-2 mt-3"
                maxLength={10}
                value={reason}
                onChangeText={setReason}
              />
            </View>

            {/* <View className="bg-geen-500">
          <Button title="Continuer" onPress={handleSubmit} />
        </View> */}
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
