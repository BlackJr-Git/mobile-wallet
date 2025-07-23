import PaymentMethodeItem from "@/components/payment/paymentMethodeItem";
import Icon from "@/components/ui/Icon";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PaymentMethodType = {
  id: number;
  name: string;
  slug: string;
  availableAmount: string;
  currency: string;
  image: string;
};

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

export interface PaymentMethodModalRef {
  expand: () => void;
  close: () => void;
}

type PaymentMethodModalProps = {
  onSelectMethod: (method: PaymentMethodType) => void;
  selectedMethod: PaymentMethodType;
};

const PaymentMethodModal = forwardRef<
  PaymentMethodModalRef,
  PaymentMethodModalProps
>((props, ref) => {
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["60%", "90%"], []);

  useImperativeHandle(
    ref,
    () => ({
      expand: () => {
        sheetRef.current?.snapToIndex(1);
      },
      close: () => {
        sheetRef.current?.close();
      },
    }),
    []
  );

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // Handle sheet changes if needed
  }, []);

  return (
    <View style={styles.mondalContainer}>
      <BottomSheet
        ref={sheetRef}
        index={-1} // fermé par défaut
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <BottomSheetView className="p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold dark:text-white">
              Selectionnez un portmonnaie
            </Text>
            <Pressable onPress={closeSheet}>
              <Icon
                name="X"
                size={28}
                color={colorScheme === "dark" ? "#fff" : "#4A67FF"}
              />
            </Pressable>
          </View>

          <View className="flex-col flex-wrap mt-8 gap-4">
            {paymentMethods.map((paymentMethod) => (
              <View
                key={paymentMethod.id}
                className="w-full flex items-center justify-center"
              >
                <PaymentMethodeItem
                  icon={paymentMethod.image}
                  title={paymentMethod.name}
                  availableAmount={paymentMethod.availableAmount}
                  onPress={() => {
                    console.log(paymentMethod);
                    props.onSelectMethod(paymentMethod);
                    closeSheet();
                  }}
                  currency={paymentMethod.currency}
                  isSelected={paymentMethod.slug === props.selectedMethod.slug}
                />
              </View>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

PaymentMethodModal.displayName = "PaymentMethodModal";

export default PaymentMethodModal;

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
    <Pressable onPress={onPress} className="">
      <View className="flex-1 h-24 flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-4 rounded-2xl">
        <View className="items-center flex-row gap-4 bg-gray-200 dark:bg-gray-800">
          <Image
            source={{
              uri: icon,
            }}
            className="w-16 h-16 rounded-2xl"
          />
          <View>
            <Text className="text-lg font-semibold">{title}</Text>
            <Text className="text-lg text-gray-500">
              {availableAmount} {currency}
            </Text>
          </View>
        </View>
        <Icon name="ChevronDown" size={24} color="gray" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mondalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
});
