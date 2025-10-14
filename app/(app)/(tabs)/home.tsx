import BaseHeader from '@/components/BaseHeader';
import CreateDeckModal from '@/components/decks/CreateDeckModal';
import NewWordsWidget from '@/components/home/NewWordsWidget';
import RecentDecksWidget from '@/components/home/RecentDecksWidget';
import StatsWidget from '@/components/home/StatsWidget';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <Stack.Screen
        options={{
          header: () => (
            <BaseHeader
              type="tab"
              title="Good Morning!"
              subtitle="Ready to learn?"
            />
          ),
        }}
      />
      <CreateDeckModal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        <StatsWidget />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.newDeckButton}
            onPress={() => setIsVisible(true)}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.newDeckButtonText}>New Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.browseContainer}
            onPress={() => router.navigate('/(app)/(tabs)/decks')}
          >
            <Feather name="search" size={20} color="#333333" />
            <Text style={styles.browseInput}>Browse</Text>
          </TouchableOpacity>
        </View>
        <NewWordsWidget />
        <RecentDecksWidget />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 16,
  },
  newDeckButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  newDeckButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  browseContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.buttonBorderColor,
  },
  browseInput: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
});
