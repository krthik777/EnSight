import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface EnergyCardProps {
  title: string;
  value: string;
  unit: string;
  subtitle?: string;
  gradient?: readonly [string, string, ...string[]];
  icon?: React.ReactNode;
}

export const EnergyCard: React.FC<EnergyCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  gradient = Colors.gradients.primary as readonly [string, string, ...string[]],
  icon,
}) => {
  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    minHeight: 120,
    justifyContent: 'space-between',
    shadowColor: Colors.primary.darkGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.darkGreen,
    opacity: 0.8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary.darkGreen,
    marginRight: 4,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary.darkCyan,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.primary.darkCyan,
    opacity: 0.7,
  },
});