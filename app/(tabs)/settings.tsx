import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Wifi, 
  Smartphone,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Zap,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}) => (
  <TouchableOpacity 
    style={styles.settingItem}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.settingLeft}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
    
    <View style={styles.settingRight}>
      {rightElement}
      {showChevron && onPress && (
        <ChevronRight size={20} color={Colors.text.secondary} />
      )}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [autoOptimization, setAutoOptimization] = React.useState(true);
  
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
            <SettingsIcon size={24} color={Colors.primary.darkCyan} />
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>
        
        {/* Profile Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.profileCard}
          >
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <User size={32} color={Colors.primary.darkGreen} />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfile}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        
        {/* Device & Connection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device & Connection</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Wifi size={20} color={Colors.primary.darkCyan} />}
              title="Device Connection"
              subtitle="ESP32 Energy Monitor - Connected"
              onPress={() => console.log('Device connection')}
            />
            
            <SettingItem
              icon={<Smartphone size={20} color={Colors.primary.darkCyan} />}
              title="Device Management"
              subtitle="Add or remove monitoring devices"
              onPress={() => console.log('Device management')}
            />
          </View>
        </View>
        
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Bell size={20} color={Colors.primary.darkCyan} />}
              title="Push Notifications"
              subtitle="Energy alerts and updates"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ 
                    false: Colors.text.secondary + '30', 
                    true: Colors.primary.mint 
                  }}
                  thumbColor={notificationsEnabled ? Colors.primary.darkGreen : Colors.text.secondary}
                />
              }
              showChevron={false}
            />
            
            <SettingItem
              icon={<Zap size={20} color={Colors.primary.darkCyan} />}
              title="Energy Alerts"
              subtitle="Overload and spike notifications"
              onPress={() => console.log('Energy alerts')}
            />
          </View>
        </View>
        
        {/* Energy Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Energy Management</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Zap size={20} color={Colors.primary.darkCyan} />}
              title="Auto Optimization"
              subtitle="AI-powered energy saving suggestions"
              rightElement={
                <Switch
                  value={autoOptimization}
                  onValueChange={setAutoOptimization}
                  trackColor={{ 
                    false: Colors.text.secondary + '30', 
                    true: Colors.primary.mint 
                  }}
                  thumbColor={autoOptimization ? Colors.primary.darkGreen : Colors.text.secondary}
                />
              }
              showChevron={false}
            />
            
            <SettingItem
              icon={<SettingsIcon size={20} color={Colors.primary.darkCyan} />}
              title="Energy Budget"
              subtitle="Set monthly consumption limits"
              onPress={() => console.log('Energy budget')}
            />
          </View>
        </View>
        
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Moon size={20} color={Colors.primary.darkCyan} />}
              title="Dark Mode"
              subtitle="Switch to dark theme"
              rightElement={
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ 
                    false: Colors.text.secondary + '30', 
                    true: Colors.primary.mint 
                  }}
                  thumbColor={darkModeEnabled ? Colors.primary.darkGreen : Colors.text.secondary}
                />
              }
              showChevron={false}
            />
          </View>
        </View>
        
        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<Shield size={20} color={Colors.primary.darkCyan} />}
              title="Privacy Settings"
              subtitle="Data collection and sharing preferences"
              onPress={() => console.log('Privacy settings')}
            />
            
            <SettingItem
              icon={<Shield size={20} color={Colors.primary.darkCyan} />}
              title="Export Data"
              subtitle="Download your energy usage data"
              onPress={() => console.log('Export data')}
            />
          </View>
        </View>
        
        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={<HelpCircle size={20} color={Colors.primary.darkCyan} />}
              title="Help & Support"
              subtitle="FAQs and contact support"
              onPress={() => console.log('Help & support')}
            />
          </View>
        </View>
        
        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Colors.status.danger} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>EnSight v1.0.0</Text>
          <Text style={styles.versionSubtext}>Smart Energy Monitor</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
    marginLeft: 4,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.darkGreen,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.primary.darkCyan,
  },
  editProfile: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.darkGreen,
  },
  settingsGroup: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.aquamarine + '30',
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.aquamarine,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.card,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.status.danger + '30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.status.danger,
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  versionSubtext: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
    opacity: 0.7,
  },
});