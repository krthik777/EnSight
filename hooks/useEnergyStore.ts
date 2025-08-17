import { create } from 'zustand';
import { EnergyData, Room, EnergyBudget, UsageHistory } from '@/types/energy';

interface EnergyStore {
  // Real-time data
  currentData: EnergyData;
  isConnected: boolean;
  
  // Rooms and devices
  rooms: Room[];
  selectedRoomId: string | null;
  
  // Budget and history
  budget: EnergyBudget;
  usageHistory: UsageHistory[];
  
  // Actions
  updateCurrentData: (data: EnergyData) => void;
  setConnectionStatus: (status: boolean) => void;
  selectRoom: (roomId: string | null) => void;
  updateRoomPower: (roomId: string, power: number) => void;
  setBudget: (budget: EnergyBudget) => void;
}

// Mock data generator
const generateMockData = (): EnergyData => ({
  current: 8.5 + Math.random() * 2,
  voltage: 230 + Math.random() * 10,
  power: 1950 + Math.random() * 200,
  energy: 145.7 + Math.random() * 0.1,
  timestamp: new Date(),
});

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Living Room',
    icon: 'sofa',
    currentPower: 450,
    dailyUsage: 8.2,
    status: 'normal',
    devices: [],
  },
  {
    id: '2',
    name: 'Kitchen',
    icon: 'chef-hat',
    currentPower: 1200,
    dailyUsage: 15.6,
    status: 'warning',
    devices: [],
  },
  {
    id: '3',
    name: 'Bedroom',
    icon: 'bed',
    currentPower: 180,
    dailyUsage: 4.3,
    status: 'normal',
    devices: [],
  },
  {
    id: '4',
    name: 'Office',
    icon: 'monitor',
    currentPower: 320,
    dailyUsage: 6.8,
    status: 'normal',
    devices: [],
  },
];

const mockBudget: EnergyBudget = {
  monthlyLimit: 400,
  currentUsage: 287.5,
  daysRemaining: 12,
  projectedUsage: 425,
};

export const useEnergyStore = create<EnergyStore>((set, get) => ({
  currentData: generateMockData(),
  isConnected: true,
  rooms: mockRooms,
  selectedRoomId: null,
  budget: mockBudget,
  usageHistory: [],
  
  updateCurrentData: (data) => set({ currentData: data }),
  
  setConnectionStatus: (status) => set({ isConnected: status }),
  
  selectRoom: (roomId) => set({ selectedRoomId: roomId }),
  
  updateRoomPower: (roomId, power) => set((state) => ({
    rooms: state.rooms.map(room => 
      room.id === roomId 
        ? { ...room, currentPower: power }
        : room
    )
  })),
  
  setBudget: (budget) => set({ budget }),
}));

// Simulate real-time data updates
let dataInterval: ReturnType<typeof setInterval> | null = null;

export const startEnergySimulation = () => {
  if (dataInterval) clearInterval(dataInterval);
  
  dataInterval = setInterval(() => {
    const store = useEnergyStore.getState();
    const newData = generateMockData();
    store.updateCurrentData(newData);
    
    // Randomly update room power consumption
    store.rooms.forEach(room => {
      if (Math.random() > 0.7) {
        const variation = (Math.random() - 0.5) * 100;
        const newPower = Math.max(0, room.currentPower + variation);
        store.updateRoomPower(room.id, newPower);
      }
    });
  }, 2000);
};

export const stopEnergySimulation = () => {
  if (dataInterval) {
    clearInterval(dataInterval);
    dataInterval = null;
  }
};