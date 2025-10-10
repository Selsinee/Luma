import DeckList from '@/components/decks/DeckList';
import { StyleSheet, View } from 'react-native';

export default function DecksScreen() {
  return (
    <View style={styles.container}>
      <DeckList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
