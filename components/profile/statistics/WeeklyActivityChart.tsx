import Colors from '@/constants/Colors';
import { useUserStats } from '@/hooks/useUserStats';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart, barDataItem } from 'react-native-gifted-charts';

const WeeklyActivityChart: React.FC = () => {
  const { data } = useUserStats();
  const { weekly_activity = [] } = data ?? {};
  const barData: barDataItem[] = useMemo(() => {
    return weekly_activity.map(w => ({
      label: w.day,
      value: w.words_studied,
    }));
  }, [weekly_activity]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>This Week&apos;s Activity</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barData}
          barWidth={35}
          barBorderRadius={4}
          frontColor={'#A9B0D2'} // Color of the bars
          // Y-Axis Configuration
          yAxisThickness={0} // Hide the Y-axis line
          yAxisTextStyle={styles.axisLabel}
          maxValue={32}
          noOfSections={4} // Creates 4 sections (0, 8, 16, 24, 32)
          // X-Axis Configuration
          xAxisThickness={0} // Hide the X-axis line
          xAxisLabelTextStyle={styles.axisLabel}
          // Grid Lines
          rulesColor={'#F0F0F0'} // Color of the dashed lines
          rulesType={'dashed'}
          // General Chart Styling
          isAnimated
          spacing={20} // Space between bars
          initialSpacing={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  chartContainer: {
    // Gifted charts often work best with some padding adjustments
    paddingLeft: 10,
  },
  axisLabel: {
    color: '#8A8A8A',
    fontSize: 12,
  },
});

export default WeeklyActivityChart;
