import ProfileSheet from "@/components/home/ProfileSheet";
import NotificationsModal from "@/components/notifications/NotificationsModal";
import PaymentMethodModal, {
  OpenPaymentMethodItem,
  PaymentMethodModalRef,
} from "@/components/payment/PaymentMethod";
import Input from "@/components/ui/Input";
// import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import React, { useCallback, useRef } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";

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

export default function AchatCredit() {
  const paymentMethodModalRef = useRef<PaymentMethodModalRef>(null);
  const openSheet = useCallback(() => {
    paymentMethodModalRef.current?.expand();
  }, []);
  const [selectedOperator, setSelectedOperator] = React.useState<string | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<PaymentMethodType>(paymentMethods[0]);
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full flex-row items-center justify-between px-6 pb-4 mb-4 z-10 bg-background">
        <ProfileSheet />
        {/* <Logo variant="default" size="small" /> */}
        <Text className="text-2xl font-bold dark:text-white">Achat crédit</Text>
        <NotificationsModal />
      </View>
      <ScrollView>
        <View className="w-full px-6">
          <View>
            <Text className="text-foreground dark:text-white font-semibold mb-4 text-xl">
              Ajouter un numéro
            </Text>
            <Text className="text-slate-500 dark:text-white mb-2">
              Entrez le numéro de téléphone
            </Text>
          </View>
          <Input
            maxLength={10}
            keyboardType="numeric"
            placeholder="0851750853"
            // label="Numéro de téléphone"
          />
        </View>
        <View className="w-full pl-6 mt-4">
          <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
            Selectionnez un operateur
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {operators.map((operator) => {
                const isSelected = selectedOperator === operator.slug;
                return (
                  <Animatable.View
                    key={operator.id}
                    animation={isSelected ? "pulse" : "fadeIn"}
                    duration={500}
                    delay={operator.id * 100}
                  >
                    <Pressable
                      onPress={() => setSelectedOperator(operator.slug)}
                      className="flex rounded-2xl items-center justify-center"
                    >
                      <Image
                        source={{ uri: operator.image }}
                        className={`w-28 h-28 rounded-2xl bg-white flex items-center justify-center ${
                          isSelected ? "border-4 border-green-500" : ""
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
        </View>
        <View className="w-full px-6 mt-4">
          <Text className="text-foreground dark:text-white font-semibold mb-2 text-xl">
            Saisissez le montant
          </Text>
          <TextInput
            maxLength={6}
            className="flex focus-within:border-indigo-500 focus-within:border-2 w-full h-20 rounded-2xl border text-2xl text-indigo-500 font-bold text-center border-gray-300 p-2 items-center justify-center"
            placeholder="Montant"
            keyboardType="numeric"
          />
        </View>
        <View className="w-full px-6 mt-4">
          <OpenPaymentMethodItem
            icon={selectedPaymentMethod.image}
            title={selectedPaymentMethod.name}
            availableAmount={selectedPaymentMethod.availableAmount}
            currency={selectedPaymentMethod.currency}
            onPress={() => openSheet()}
          />
        </View>
        <View className="w-full px-6 mt-4">
          <Button title="Continuer" onPress={() => {}} />
        </View>
      </ScrollView>
      <PaymentMethodModal
        ref={paymentMethodModalRef}
        onSelectMethod={setSelectedPaymentMethod}
        selectedMethod={selectedPaymentMethod}
      />
    </SafeAreaView>
  );
}
