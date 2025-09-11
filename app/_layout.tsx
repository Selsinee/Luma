// app/_layout.tsx
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const InitialLayout = () => {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const inAuthGroup = segments[0] === '(app)';

    // The navigation guard:
    // If the user is logged in and not in the '(app)' group, redirect them.
    if (user && !inAuthGroup) {
      router.replace('/(app)/(tabs)/home');
    }
    // If the user is not logged in and is in the '(app)' group, redirect them.
    else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, isLoading]);

  // Show a loading screen while checking for the auth token.
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // Once loaded, render the main navigator.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <InitialLayout />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
