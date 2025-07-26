import BackButton from "@/components/BackButton";
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
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

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

const operators = [
  {
    id: 1,
    name: "Orange",
    slug: "orange",

    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267545/Orange_logo.svg_zn2cg8.png",
  },
  {
    id: 2,
    name: "Vodacom",
    slug: "vodacom",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753268199/vodacom-logo_pvowmx.png",
  },
  {
    id: 3,
    name: "Airtel",
    slug: "airtel",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267541/Airtel_logo_gfyke6.png",
  },
  {
    id: 4,
    name: "Africell",
    slug: "africell",
    image:
      "https://res.cloudinary.com/devhqdrwl/image/upload/v1753267550/Africell_logo_tjnzbm.jpg",
  },
];

// const rechargeMethods = [
//   {
//     id: 1,
//     name: "Carte de crédit",
//     slug: "card",
//   },
//   {
//     id: 2,
//     name: "Mobile Money",
//     slug: "mobile-money",
//   },
// ];

export default function TransfertScreen() {
  const router = useRouter()
  const paymentMethodModalRef = useRef<PaymentMethodModalRef>(null);
  const [amount, setAmount] = useState("");
  const [rechargeMethod, setRechargeMethod] = useState<string>("mobile-money");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<PaymentMethodType>(paymentMethods[0]);
  const [selectedOperator, setSelectedOperator] = React.useState<string | null>(
    null
  );
  const handleSubmit = () => {
    // TODO: implement submit logic
    console.log(amount, rechargeMethod, selectedPaymentMethod);
    router.push("/recharge/[id]")
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
            {/* <ProfileSheet /> */}
            <BackButton />
            {/* <Logo variant="default" size="small" /> */}
            <Text className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
              Approvisionnement
            </Text>
            <NotificationsModal />
          </View>
          <ScrollView
            className="flex-1"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 w-full">
              <View className="my-6 px-6">
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
              <View className="w-full my-6 px-6">
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
                <View className="flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 rounded-2xl p-2 mx-6">
                  <Animatable.View
                    key={
                      rechargeMethod === "mobile-money" ? "active" : "inactive"
                    }
                    animation={
                      rechargeMethod === "mobile-money" ? "bounceIn" : "fadeIn"
                    }
                    duration={400}
                  >
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
                  </Animatable.View>
                  <Animatable.View
                    key={rechargeMethod === "card" ? "active" : "inactive"}
                    animation={
                      rechargeMethod === "card" ? "bounceIn" : "fadeIn"
                    }
                    duration={400}
                  >
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
                  </Animatable.View>
                </View>

                <Animatable.View
                  key={rechargeMethod}
                  animation={
                    rechargeMethod === "mobile-money"
                      ? "fadeInRight"
                      : "fadeInLeft"
                  }
                  duration={400}
                  className="w-full"
                >
                  {rechargeMethod === "mobile-money" && (
                    <View className="my-6">
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="ml-6"
                      >
                        <View className="flex-row gap-2">
                          {operators.map((operator) => {
                            const isSelected =
                              selectedOperator === operator.slug;
                            return (
                              <Animatable.View
                                key={operator.id}
                                animation={isSelected ? "pulse" : "fadeIn"}
                                duration={500}
                                delay={operator.id * 100}
                              >
                                <Pressable
                                  onPress={() =>
                                    setSelectedOperator(operator.slug)
                                  }
                                  className="flex rounded-2xl items-center justify-center"
                                >
                                  <Image
                                    source={{ uri: operator.image }}
                                    className={`w-28 h-28 rounded-2xl bg-white flex items-center justify-center ${
                                      isSelected
                                        ? "border-4 border-green-500"
                                        : ""
                                    }`}
                                  />
                                  <Text
                                    className={`text-foreground dark:text-white text-lg  ${
                                      isSelected ? "font-bold" : ""
                                    }`}
                                  >
                                    {operator.name}
                                  </Text>
                                </Pressable>
                              </Animatable.View>
                            );
                          })}
                        </View>
                      </ScrollView>
                      <View className="mx-6 flex-row items-center justify-center gap-2 mt-3">
                        <View className="flex-row items-center border border-gray-300 dark:border-gray-700 p-2 rounded-2xl h-16">
                          <Text className="text-xl font-bold text-gray-400">
                            🇨🇩 +243
                          </Text>
                        </View>
                        <TextInput
                          placeholder="Numéro de téléphone"
                          className="flex-1 h-16 rounded-2xl border text-xl text-indigo-500 border-gray-300 dark:border-gray-700 p-2"
                          maxLength={10}
                          keyboardType="numeric"
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                        />
                      </View>
                    </View>
                  )}
                  {rechargeMethod === "card" && (
                    <View className="my-6 px-6">
                      <View>
                        <Text className="text-foreground dark:text-white font-semibold text-xl mb-2">
                          Informations de la carte
                        </Text>
                        <TextInput
                          placeholder="1234 5678 9012 3456"
                          className="w-full h-16 rounded-2xl border text-xl text-indigo-500 border-gray-300 dark:border-gray-700 p-2"
                          maxLength={16}
                          keyboardType="numeric"
                          value={cardNumber}
                          onChangeText={setCardNumber}
                        />
                      </View>
                      <View className="flex-row items-center justify-between py-2 gap-2">
                        <TextInput
                          placeholder="MM/AA"
                          className="flex-1 h-16 rounded-2xl border text-xl text-indigo-500 text-center border-gray-300 dark:border-gray-700 p-2"
                          maxLength={5}
                          keyboardType="numeric"
                          value={cardExpiryDate}
                          onChangeText={setCardExpiryDate}
                        />
                        <TextInput
                          placeholder="CVV"
                          className="flex-1 h-16 rounded-2xl border text-xl text-indigo-500 text-center border-gray-300 dark:border-gray-700 p-2"
                          maxLength={3}
                          keyboardType="numeric"
                          value={cardCvv}
                          onChangeText={setCardCvv}
                        />
                      </View>
                    </View>
                  )}
                </Animatable.View>
              </View>

              <View className="flex-1 flex-col px-6">
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
