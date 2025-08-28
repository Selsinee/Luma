import DeckFilters from '@/components/decks/DeckFilters';
import DeckList, { MOCK_DECKS } from '@/components/decks/DeckList';
import { StyleSheet, View } from 'react-native';

export default function DecksScreen() {
  return (
    <View style={styles.container}>
      <DeckFilters />
      <DeckList decks={MOCK_DECKS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
