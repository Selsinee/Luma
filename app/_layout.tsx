import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="deck-details"
          options={{
            title: 'Deck Details',
          }}
        />
        <Stack.Screen
          name="study/[deckId]"
          options={{
            title: 'Flashcards',
            contentStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
