import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  Wifi, 
  WifiOff,
  Home,
  ChevronDown,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useEnergyStore, startEnergySimulation, stopEnergySimulation } from '@/hooks/useEnergyStore';
import { EnergyCard } from '@/components/EnergyCard';
import { PowerMeter } from '@/components/PowerMeter';

export default function DashboardScreen() {
  const { 
    currentData, 
    isConnected, 
    rooms, 
    selectedRoomId,
    selectRoom,
  } = useEnergyStore();
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  useEffect(() => {
    startEnergySimulation();
    return () => stopEnergySimulation();
  }, []);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);
  
  const selectedRoom = selectedRoomId ? rooms.find(r => r.id === selectedRoomId) : null;
  const totalPower = rooms.reduce((sum, room) => sum + room.currentPower, 0);
  const dailyTotal = rooms.reduce((sum, room) => sum + room.dailyUsage, 0);
  
  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>Energy Dashboard</Text>
          </View>
          
          <View style={styles.connectionStatus}>
            {isConnected ? (
              <Wifi size={24} color={Colors.status.normal} />
            ) : (
              <WifiOff size={24} color={Colors.status.danger} />
            )}
          </View>
        </View>
        
        {/* Room Selector */}
        <TouchableOpacity 
          style={styles.roomSelector}
          onPress={() => selectRoom(selectedRoomId ? null : '1')}
        >
          <Home size={20} color={Colors.primary.darkCyan} />
          <Text style={styles.roomSelectorText}>
            {selectedRoom ? selectedRoom.name : 'All Rooms'}
          </Text>
          <ChevronDown size={20} color={Colors.primary.darkCyan} />
        </TouchableOpacity>
        
        {/* Power Meter */}
        <PowerMeter 
          currentPower={selectedRoom ? selectedRoom.currentPower : totalPower}
        />
        
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View style={styles.cardContainer}>
              <EnergyCard
                title="Current"
                value={currentData.current.toFixed(1)}
                unit="A"
                subtitle="Amperage"
                icon={<Activity size={20} color={Colors.primary.darkGreen} />}
                gradient={Colors.gradients.primary}
              />
            </View>
            
            <View style={styles.cardContainer}>
              <EnergyCard
                title="Voltage"
                value={currentData.voltage.toFixed(0)}
                unit="V"
                subtitle="Supply voltage"
                icon={<Zap size={20} color={Colors.primary.darkGreen} />}
                gradient={Colors.gradients.secondary}
              />
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.cardContainer}>
              <EnergyCard
                title="Today's Usage"
                value={dailyTotal.toFixed(1)}
                unit="kWh"
                subtitle="Total consumption"
                icon={<TrendingUp size={20} color={Colors.primary.darkGreen} />}
                gradient={Colors.gradients.primary}
              />
            </View>
            
            <View style={styles.cardContainer}>
              <EnergyCard
              title="Estimated Cost"
              value={`₹${(dailyTotal * 6.5).toFixed(0)}`}
              unit=""
              subtitle="Today's bill"
              icon={<Activity size={20} color={Colors.primary.darkGreen} />}
              gradient={Colors.gradients.secondary}
              />
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.actionButtonGradient}
              >
                <TrendingUp size={24} color={Colors.primary.darkGreen} />
                <Text style={styles.actionButtonText}>View Reports</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={Colors.gradients.secondary}
                style={styles.actionButtonGradient}
              >
                <Zap size={24} color={Colors.primary.darkGreen} />
                <Text style={styles.actionButtonText}>Set Budget</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  connectionStatus: {
    padding: 8,
  },
  roomSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary.aquamarine,
  },
  roomSelectorText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  quickActions: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.darkGreen,
    marginLeft: 8,
  },
});