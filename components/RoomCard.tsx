import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Sofa, 
  ChefHat, 
  Bed, 
  Monitor,
  Zap,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Room } from '@/types/energy';

interface RoomCardProps {
  room: Room;
  onPress: () => void;
}

const getIconComponent = (iconName: string) => {
  const iconProps = { size: 24, color: Colors.primary.darkGreen };
  
  switch (iconName) {
    case 'sofa': return <Sofa {...iconProps} />;
    case 'chef-hat': return <ChefHat {...iconProps} />;
    case 'bed': return <Bed {...iconProps} />;
    case 'monitor': return <Monitor {...iconProps} />;
    default: return <Zap {...iconProps} />;
  }
};

const getStatusColor = (status: Room['status']) => {
  switch (status) {
    case 'normal': return Colors.status.normal;
    case 'warning': return Colors.status.warning;
    case 'danger': return Colors.status.danger;
    default: return Colors.status.normal;
  }
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, onPress }) => {
  const statusColor = getStatusColor(room.status);
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[Colors.background.card, Colors.background.secondary]}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {getIconComponent(room.icon)}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.roomName}>{room.name}</Text>
            <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.statHeader}>
              <Zap size={16} color={Colors.primary.darkCyan} />
              <Text style={styles.statLabel}>Current</Text>
            </View>
            <Text style={styles.statValue}>{room.currentPower.toFixed(0)} W</Text>
          </View>
          
          <View style={styles.stat}>
            <View style={styles.statHeader}>
              <TrendingUp size={16} color={Colors.primary.darkCyan} />
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <Text style={styles.statValue}>{room.dailyUsage.toFixed(1)} kWh</Text>
          </View>
        </View>
        
        {room.status === 'warning' && (
          <View style={styles.warningContainer}>
            <AlertTriangle size={16} color={Colors.status.warning} />
            <Text style={styles.warningText}>High usage detected</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary.aquamarine,
    shadowColor: Colors.primary.darkGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.aquamarine,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: Colors.status.warning + '20',
    borderRadius: 8,
  },
  warningText: {
    fontSize: 12,
    color: Colors.status.warning,
    marginLeft: 4,
    fontWeight: '500',
  },
});