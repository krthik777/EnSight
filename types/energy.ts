export interface EnergyData {
  current: number; // Amperes
  voltage: number; // Volts
  power: number; // Watts
  energy: number; // kWh
  timestamp: Date;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  currentPower: number;
  dailyUsage: number;
  status: 'normal' | 'warning' | 'danger';
  devices: Device[];
}

export interface Device {
  id: string;
  name: string;
  roomId: string;
  power: number;
  isOnline: boolean;
  lastSeen: Date;
}

export interface EnergyBudget {
  monthlyLimit: number; // kWh
  currentUsage: number; // kWh
  daysRemaining: number;
  projectedUsage: number; // kWh
}

export interface UsageHistory {
  date: string;
  usage: number; // kWh
  cost: number; // currency
}