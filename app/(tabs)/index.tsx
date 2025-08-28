import NewWordsWidget from '@/components/home/NewWordsWidget';
import RecentDecksWidget from '@/components/home/RecentDecksWidget';
import StatsWidget from '@/components/home/StatsWidget';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 16,
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <StatsWidget
          wordsStudied={40}
          dailyGoal={50}
          streak={7}
          totalWords={1247}
          weeklyProgress={5}
          weeklyGoal={7}
        />
        <View style={styles.header}>
          <TouchableOpacity style={styles.newDeckButton}>
            <Feather name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.newDeckButtonText}>New Deck</Text>
          </TouchableOpacity>
          <View style={styles.browseContainer}>
            <Feather name="search" size={20} color="#8A8A8A" />
            <TextInput placeholder="Browse" style={styles.browseInput} />
          </View>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  browseInput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
});
