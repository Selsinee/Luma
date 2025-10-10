import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="deck/[deckId]"
        options={{
          title: 'Deck Details',
        }}
      />
      <Stack.Screen
        name="study/flashcard/[deckId]"
        options={{
          title: 'Flashcards',
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
      <Stack.Screen
        name="study/quiz/start-quiz"
        options={{
          title: 'Quiz',
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </Stack>
  );
}
