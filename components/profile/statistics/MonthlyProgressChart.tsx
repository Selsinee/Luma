import Colors from '@/constants/Colors';
import { useUserStats } from '@/hooks/useUserStats';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

const MonthlyProgressChart: React.FC = () => {
  const { data } = useUserStats();
  const { monthly_progress = [] } = data ?? {};
  const lineData: lineDataItem[] = useMemo(() => {
    return monthly_progress.map(w => ({
      label: w.month,
      value: w.words_studied,
    }));
  }, [monthly_progress]);

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Feather name="trending-up" size={18} color={Colors.primary} />
        <Text style={styles.title}>6-Month Progress</Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={lineData}
          curved
          isAnimated
          color={Colors.primary}
          thickness={3}
          dataPointsColor={Colors.primary}
          dataPointsRadius={5}
          // Y-Axis Configuration
          yAxisTextStyle={styles.axisLabel}
          yAxisThickness={0} // Hide the Y-axis line
          maxValue={600}
          noOfSections={4} // Creates 4 sections (0, 150, 300, 450, 600)
          // X-Axis Configuration
          xAxisLabelTextStyle={styles.axisLabel}
          xAxisColor="#E8E8F0"
          // Grid Lines
          rulesColor={'#F0F0F0'} // Color of the dotted lines
          rulesType={'dotted'}
        />
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
    borderColor: '#E8E8F0',
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  chartContainer: {
    // Gifted charts sometimes need padding adjustments
    paddingLeft: 10,
  },
  axisLabel: {
    color: '#8A8A8A',
    fontSize: 12,
  },
});

export default MonthlyProgressChart;
