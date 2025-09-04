import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* The login screen, with no header */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* The main part of the app, also with no header shown here */}
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
