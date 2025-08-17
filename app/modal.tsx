import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Zap, Settings } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function ModalScreen() {
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.iconBackground}
          >
            <Zap size={48} color={Colors.primary.darkGreen} />
          </LinearGradient>
        </View>
        
        <Text style={styles.title}>Energy Settings</Text>
        <Text style={styles.subtitle}>
          Configure your energy monitoring preferences and device settings.
        </Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <LinearGradient
              colors={Colors.gradients.secondary}
              style={styles.optionGradient}
            >
              <Settings size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.optionText}>Device Configuration</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.optionGradient}
            >
              <Zap size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.optionText}>Energy Alerts</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary.darkGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  optionsContainer: {
    width: '100%',
    gap: 16,
  },
  option: {
    width: '100%',
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.darkGreen,
    marginLeft: 12,
  },
});
