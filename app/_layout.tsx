import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="screen/map" options={{ title: 'Property Map' }} />
      <Stack.Screen name="screen/property-details" options={{ title: 'Property Details' }} />
    </Stack>
  );
}
