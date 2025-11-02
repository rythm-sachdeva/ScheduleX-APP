import AuthProvider from "@/components/Providers/AuthProvider";
import UrlProvider from "@/components/Providers/UrlProvider";
import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return(
  <UrlProvider> 
    <AuthProvider>
    <Stack >
      <Stack.Screen name="index" options={{headerShown:false}}/>ß
    <Stack.Screen name="(app)" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)" options={{headerShown:false}}/>
    </Stack>
    </AuthProvider>
  </UrlProvider>
  );
}
