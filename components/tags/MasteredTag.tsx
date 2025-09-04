import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MasteredTag: React.FC = () => {
  return (
    <View style={[styles.tag, styles.masteredTag]}>
      <Text style={[styles.tagText, styles.masteredTagText]}>Mastered</Text>
    </View>
  );
};

export default MasteredTag;

const styles = StyleSheet.create({
  tag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  tagText: { fontSize: 12, fontWeight: '500', textTransform: 'capitalize' },
  masteredTag: { backgroundColor: '#C8E6C9' },
  masteredTagText: { color: '#388E3C' },
});
