import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [isAuthenticated] = useState(true);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
