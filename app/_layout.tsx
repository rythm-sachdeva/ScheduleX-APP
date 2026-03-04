// These MUST be at the very top, before any other imports
import '@/global/crypto/polyfills';
// import { Buffer } from "buffer";
import { Stack } from "expo-router";
// import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import './global.css';




export default function RootLayout() {
  return(<>
    <Stack >
    <Stack.Screen name="index" options={{headerShown:false}}/>
    <Stack.Screen name="(app)" options={{headerShown: false }} />
    <Stack.Screen name="(auth)" options={{headerShown:false}}/>
    </Stack>
  <Toast/>
  </>
  );
}
