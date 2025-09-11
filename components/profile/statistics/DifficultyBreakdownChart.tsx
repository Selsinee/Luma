import Colors from '@/constants/Colors';
import { useUserStats } from '@/hooks/useUserStats';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';

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
  const { data } = useUserStats();
  const { difficulty_breakdown } = data ?? {};
  const pieData: pieDataItem[] = useMemo(() => {
    const data: pieDataItem[] = [];
    data.push({
      value: difficulty_breakdown?.easy ?? 0,
      color: Colors.pastel.easy,
      text: `${difficulty_breakdown?.easy ?? 0}%`,
    });
    data.push({
      value: difficulty_breakdown?.medium ?? 0,
      color: Colors.pastel.medium,
      text: `${difficulty_breakdown?.medium ?? 0}%`,
    });
    data.push({
      value: difficulty_breakdown?.hard ?? 0,
      color: Colors.pastel.hard,
      text: `${difficulty_breakdown?.hard ?? 0}%`,
    });
    return data;
  }, [difficulty_breakdown]);

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
          <LegendItem
            color={Colors.pastel.easy}
            label={`Easy (${difficulty_breakdown?.easy ?? 0}%)`}
          />
          <LegendItem
            color={Colors.pastel.medium}
            label={`Medium (${difficulty_breakdown?.medium ?? 0}%)`}
          />
          <LegendItem
            color={Colors.pastel.hard}
            label={`Hard (${difficulty_breakdown?.hard ?? 0}%)`}
          />
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
