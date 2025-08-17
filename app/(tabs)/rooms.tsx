import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Home } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useEnergyStore } from '@/hooks/useEnergyStore';
import { RoomCard } from '@/components/RoomCard';

export default function RoomsScreen() {
  const { rooms } = useEnergyStore();
  
  const handleRoomPress = (roomId: string) => {
    console.log('Room pressed:', roomId);
    // Navigate to room details
  };
  
  const handleAddRoom = () => {
    console.log('Add room pressed');
    // Navigate to add room screen
  };
  
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
            <Home size={24} color={Colors.primary.darkCyan} />
            <Text style={styles.title}>Room Monitoring</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddRoom}
          >
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.addButtonGradient}
            >
              <Plus size={20} color={Colors.primary.darkGreen} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.summaryCard}
          >
            <Text style={styles.summaryTitle}>Total Consumption</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {rooms.reduce((sum, room) => sum + room.currentPower, 0).toFixed(0)}
                </Text>
                <Text style={styles.summaryUnit}>W</Text>
                <Text style={styles.summaryLabel}>Current</Text>
              </View>
              
              <View style={styles.summaryDivider} />
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>
                  {rooms.reduce((sum, room) => sum + room.dailyUsage, 0).toFixed(1)}
                </Text>
                <Text style={styles.summaryUnit}>kWh</Text>
                <Text style={styles.summaryLabel}>Today</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Room Cards */}
        <View style={styles.roomsContainer}>
          <Text style={styles.sectionTitle}>
            Rooms ({rooms.length})
          </Text>
          
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onPress={() => handleRoomPress(room.id)}
            />
          ))}
        </View>
        
        {/* Add Room Card */}
        <TouchableOpacity 
          style={styles.addRoomCard}
          onPress={handleAddRoom}
        >
          <View style={styles.addRoomContent}>
            <View style={styles.addRoomIcon}>
              <Plus size={24} color={Colors.primary.darkCyan} />
            </View>
            <Text style={styles.addRoomText}>Add New Room</Text>
            <Text style={styles.addRoomSubtext}>
              Set up monitoring for another room
            </Text>
          </View>
        </TouchableOpacity>
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
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.darkGreen,
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary.darkGreen,
  },
  summaryUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary.darkCyan,
    marginTop: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.primary.darkCyan,
    marginTop: 4,
    opacity: 0.8,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.primary.darkGreen,
    opacity: 0.3,
  },
  roomsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  addRoomCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.primary.aquamarine,
    borderStyle: 'dashed',
  },
  addRoomContent: {
    alignItems: 'center',
  },
  addRoomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.aquamarine,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addRoomText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  addRoomSubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});