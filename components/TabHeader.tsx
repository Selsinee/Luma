import IcnDefaultProfile from '@/assets/svgs/IcnDefaultProfile';
import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrapper, { marginTop: insets.top }]}>
      <IcnDefaultProfile width={40} height={40} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.secondText}>Ready to learn?</Text>
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  secondText: {
    fontSize: 12,
    color: '#717182',
  },
});
