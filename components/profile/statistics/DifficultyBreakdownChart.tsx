import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

// Component for a single legend item
const LegendItem: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const DifficultyBreakdownChart: React.FC = () => {
  // ✨ Updated pastel colors for the donut chart ✨
  const pastelColors = {
    easy: '#A3D9B0', // Soft Green
    medium: '#FFD180', // Soft Orange
    hard: '#FFAB91', // Soft Red
  };

  const pieData = [
    { value: 45, color: pastelColors.easy, text: '45%' },
    { value: 35, color: pastelColors.medium, text: '35%' },
    { value: 20, color: pastelColors.hard, text: '20%' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Feather name="layers" size={18} color="#A9B0D2" />
        <Text style={styles.title}>Learning Difficulty Breakdown</Text>
      </View>

      <View style={styles.chartAndLegendContainer}>
        <PieChart
          data={pieData}
          donut
          radius={80}
          innerRadius={50}
          showText={false}
          centerLabelComponent={() => null}
          sectionAutoFocus
          isAnimated
        />
        <View style={styles.legendContainer}>
          <LegendItem color={pastelColors.easy} label="Easy (45%)" />
          <LegendItem color={pastelColors.medium} label="Medium (35%)" />
          <LegendItem color={pastelColors.hard} label="Hard (20%)" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  chartAndLegendContainer: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: '#333',
  },
});

export default DifficultyBreakdownChart;
