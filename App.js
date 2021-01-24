import React from "react";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  KosugiMaru_400Regular,
} from "@expo-google-fonts/kosugi-maru";

import { KanaProvider } from "./app/context/kana";
import KanaScreen from "./app/screens/kana-screen";

export default function App() {
  const [fontsLoaded] = useFonts({ KosugiMaru_400Regular });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <KanaProvider>
      <KanaScreen />
    </KanaProvider>
  );
}
