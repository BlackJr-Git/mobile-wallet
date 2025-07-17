import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function AchatCredit() {
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        alignItems: "center",
        backgroundColor: "lightblue",
        justifyContent: "center",
      }}
      // options={options}
    >
      <FlatList
        data={[
          99, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={() => console.log(item)}>
            <Text style={{ fontSize: 40 }}>Hello view {item}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={{ fontSize: 40 }}>No data</Text>}
        keyExtractor={(item) => item.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}
