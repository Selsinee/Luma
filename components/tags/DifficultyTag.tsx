import Colors from '@/constants/Colors';
import { Difficulty } from '@/interfaces';
import { StyleSheet, Text, View } from 'react-native';

// const difficultyStyles = {
//   hard: { backgroundColor: '#FFEBEE', color: '#C62828' },
//   medium: { backgroundColor: 'rgba(255, 248, 225, 1)', color: '#FF8F00' },
//   easy: { backgroundColor: '#E8F5E9', color: '#2E7D32' },
// };
export const difficultyStyles = {
  easy: {
    backgroundColor: 'rgba(92, 184, 92, 0.15)',
    color: Colors.easy,
  },
  medium: {
    backgroundColor: 'rgba(255, 235, 59, 0.25)',
    color: Colors.medium,
  },
  hard: {
    backgroundColor: 'rgba(217, 83, 79, 0.15)',
    color: Colors.hard,
  },
};

interface DifficultyTagProps {
  difficulty: Difficulty;
}

const DifficultyTag: React.FC<DifficultyTagProps> = ({ difficulty }) => {
  const tagStyle = difficultyStyles[difficulty];
  return (
    <View style={[styles.tag, { backgroundColor: tagStyle.backgroundColor }]}>
      <Text style={[styles.tagText, { color: tagStyle.color }]}>
        {difficulty}
      </Text>
    </View>
  );
};

export default DifficultyTag;
const styles = StyleSheet.create({
  tag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
