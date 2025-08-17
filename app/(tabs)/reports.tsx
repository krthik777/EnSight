import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Zap,
  Target,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useEnergyStore } from '@/hooks/useEnergyStore';

type TimePeriod = 'daily' | 'weekly' | 'monthly';

export default function ReportsScreen() {
  const { budget } = useEnergyStore();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('daily');
  
  // Mock data for charts
  const dailyData = [12, 15, 8, 22, 18, 25, 20];
  const weeklyData = [120, 135, 98, 156, 142, 178, 165];
  const monthlyData = [450, 520, 380, 610, 580, 720, 650];
  
  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'daily': return dailyData;
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return dailyData;
    }
  };
  
  const getUnit = () => {
    switch (selectedPeriod) {
      case 'daily': return 'kWh/day';
      case 'weekly': return 'kWh/week';
      case 'monthly': return 'kWh/month';
      default: return 'kWh';
    }
  };
  
  const budgetPercentage = (budget.currentUsage / budget.monthlyLimit) * 100;
  const projectedOverage = budget.projectedUsage > budget.monthlyLimit;
  
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <BarChart3 size={24} color={Colors.primary.darkCyan} />
            <Text style={styles.title}>Energy Reports</Text>
          </View>
        </View>
        
        {/* Budget Overview */}
        <View style={styles.budgetContainer}>
          <LinearGradient
            colors={projectedOverage ? [Colors.status.warning + '20', Colors.status.warning + '10'] : Colors.gradients.primary}
            style={styles.budgetCard}
          >
            <View style={styles.budgetHeader}>
              <Target size={20} color={projectedOverage ? Colors.status.warning : Colors.primary.darkGreen} />
              <Text style={[styles.budgetTitle, { color: projectedOverage ? Colors.status.warning : Colors.primary.darkGreen }]}>
                Monthly Budget
              </Text>
            </View>
            
            <View style={styles.budgetProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${Math.min(budgetPercentage, 100)}%`,
                      backgroundColor: projectedOverage ? Colors.status.warning : Colors.primary.mint,
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.budgetStats}>
                <Text style={[styles.budgetUsage, { color: projectedOverage ? Colors.status.warning : Colors.primary.darkGreen }]}>
                  {budget.currentUsage} / {budget.monthlyLimit} kWh
                </Text>
                <Text style={[styles.budgetPercentage, { color: projectedOverage ? Colors.status.warning : Colors.primary.darkCyan }]}>
                  {budgetPercentage.toFixed(1)}% used
                </Text>
              </View>
            </View>
            
            {projectedOverage && (
              <Text style={styles.warningText}>
                ⚠️ Projected to exceed budget by {(budget.projectedUsage - budget.monthlyLimit).toFixed(0)} kWh
              </Text>
            )}
          </LinearGradient>
        </View>
        
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['daily', 'weekly', 'monthly'] as TimePeriod[]).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive,
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Usage Trend ({getUnit()})</Text>
          
          <View style={styles.chart}>
            {getCurrentData().map((value, index) => {
              const maxValue = Math.max(...getCurrentData());
              const height = (value / maxValue) * 120;
              
              return (
                <View key={index} style={styles.chartBar}>
                  <View style={styles.chartBarContainer}>
                    <LinearGradient
                      colors={Colors.gradients.secondary}
                      style={[styles.chartBarFill, { height }]}
                    />
                  </View>
                  <Text style={styles.chartBarValue}>{value}</Text>
                  <Text style={styles.chartBarLabel}>
                    {selectedPeriod === 'daily' ? `Day ${index + 1}` : 
                     selectedPeriod === 'weekly' ? `W${index + 1}` : 
                     `M${index + 1}`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.statCard}
            >
              <TrendingUp size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.statValue}>+12%</Text>
              <Text style={styles.statLabel}>vs Last Month</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={Colors.gradients.secondary}
              style={styles.statCard}
            >
              <DollarSign size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.statValue}>₹1,847</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statsRow}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.statCard}
            >
              <Zap size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.statValue}>2.1 kW</Text>
              <Text style={styles.statLabel}>Peak Usage</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={Colors.gradients.secondary}
              style={styles.statCard}
            >
              <Calendar size={24} color={Colors.primary.darkGreen} />
              <Text style={styles.statValue}>18 days</Text>
              <Text style={styles.statLabel}>Avg/Month</Text>
            </LinearGradient>
          </View>
        </View>
        
        {/* Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              💡 Your kitchen usage peaks between 7-9 PM. Consider using energy-intensive appliances during off-peak hours (11 PM - 6 AM) to save ₹200/month.
            </Text>
          </View>
          
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>
              🌱 Based on your usage pattern, installing a 3kW solar panel could reduce your bill by 40% and pay for itself in 4.2 years.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  budgetContainer: {
    marginBottom: 24,
  },
  budgetCard: {
    borderRadius: 16,
    padding: 20,
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  budgetProgress: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.primary.darkGreen + '20',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetUsage: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetPercentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  warningText: {
    fontSize: 12,
    color: Colors.status.warning,
    marginTop: 8,
    fontWeight: '500',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: Colors.primary.aquamarine,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  periodButtonTextActive: {
    color: Colors.primary.darkGreen,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  chartBarContainer: {
    width: '80%',
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  chartBarValue: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  chartBarLabel: {
    fontSize: 8,
    color: Colors.text.secondary,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.darkGreen,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.primary.darkCyan,
    textAlign: 'center',
  },
  insightsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  insightCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.mint,
  },
  insightText: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
});