import BaseHeader from '@/components/BaseHeader';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuizStartPage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Stack.Screen
        options={{
          header: () => (
            <BaseHeader
              type="page"
              title="Quiz Mode"
              subtitle="Advanced Vocabulary"
            />
          ),
        }}
      />
      <View style={styles.card}>
        <Feather
          name="target"
          size={48}
          color="#A9B0D2"
          style={styles.cardIcon}
        />
        <Text style={styles.cardTitle}>Ready to Start Quiz?</Text>
        {/* Hardcoded value */}
        <Text style={styles.cardSubtitle}>Multiple choice questions</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Questions</Text>
          {/* Hardcoded value */}
          <Text style={styles.detailValue}>6</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time Limit</Text>
          {/* Hardcoded value */}
          <Text style={styles.detailValue}>0:30</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quiz Type</Text>
          {/* Hardcoded value */}
          <Text style={styles.detailValue}>Multiple Choice</Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => Alert.alert('Start Quiz pressed')}
        >
          <Feather
            name="play"
            size={18}
            color="#FFFFFF"
            style={styles.startButtonIcon}
          />
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  quizModeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quizTitleText: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: -40,
  },
  cardIcon: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9B0D2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  startButtonIcon: {
    marginRight: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizStartPage;
