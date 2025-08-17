import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';

interface PowerMeterProps {
  currentPower: number;
  maxPower?: number;
}

export const PowerMeter: React.FC<PowerMeterProps> = ({ 
  currentPower, 
  maxPower = 3000 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const percentage = Math.min((currentPower / maxPower) * 100, 100);
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedValue]);
  
  const getStatusColor = () => {
    if (percentage > 80) return Colors.status.danger;
    if (percentage > 60) return Colors.status.warning;
    return Colors.primary.mint;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Power Usage</Text>
      
      <View style={styles.meterContainer}>
        <View style={styles.meterBackground}>
          <Animated.View
            style={[
              styles.meterFill,
              {
                width: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
                backgroundColor: getStatusColor(),
              },
            ]}
          />
        </View>
        
        <View style={styles.valueContainer}>
          <Text style={styles.powerValue}>
            {currentPower.toFixed(0)}
          </Text>
          <Text style={styles.powerUnit}>W</Text>
        </View>
      </View>
      
      <View style={styles.scaleContainer}>
        <Text style={styles.scaleText}>0W</Text>
        <Text style={styles.scaleText}>{maxPower}W</Text>
      </View>
      
      <Text style={styles.percentageText}>
        {percentage.toFixed(1)}% of capacity
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: Colors.primary.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  meterContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  meterBackground: {
    width: '100%',
    height: 12,
    backgroundColor: Colors.primary.aquamarine + '40',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  meterFill: {
    height: '100%',
    borderRadius: 6,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  powerValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  powerUnit: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scaleText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  percentageText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },
});