import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userLocation: { latitude: number; longitude: number } | null;
  onRequestLocation: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

interface NavItemProps {
  icon: string;
  label: string;
  tabName: string;
  isActive: boolean;
}

export default function BottomNavigation({
  activeTab,
  onTabChange,
  userLocation,
  onRequestLocation,
  darkMode,
  onDarkModeToggle,
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const NavItem = ({ icon, label, tabName, isActive }: NavItemProps) => (
    <TouchableOpacity
      style={[
        styles.navItem,
        isActive && [styles.navItemActive, darkMode && styles.navItemActiveDark],
        darkMode && styles.navItemDark,
      ]}
      onPress={() => onTabChange(tabName)}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={isActive ? COLORS.primary : '#9ca3af'}
      />
      <Text
        style={[
          styles.navLabel,
          isActive && styles.navLabelActive,
          darkMode && styles.navLabelDark,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark, { paddingBottom: insets.bottom }]}>
      <View style={[styles.navBar, darkMode && styles.navBarDark]}>
        <NavItem
          icon="map"
          label="Peta"
          tabName="map"
          isActive={activeTab === 'map'}
        />
        <NavItem
          icon="format-list-bulleted"
          label="Daftar"
          tabName="list"
          isActive={activeTab === 'list'}
        />
        <NavItem
          icon="information"
          label="Info"
          tabName="info"
          isActive={activeTab === 'info'}
        />
      </View>

      {/* Floating Action Buttons */}
      <TouchableOpacity
        style={[styles.fabDarkMode, darkMode && styles.fabDarkModeActive]}
        onPress={onDarkModeToggle}
      >
        <MaterialCommunityIcons
          name={darkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
          size={22}
          color={darkMode ? '#86efac' : COLORS.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.fabLocation}
        onPress={onRequestLocation}
      >
        <MaterialCommunityIcons
          name="crosshairs-gps"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 76,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  navBarDark: {
    backgroundColor: '#1f2937',
    borderTopColor: '#374151',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navItemDark: {
    backgroundColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
  },
  navItemActiveDark: {
    backgroundColor: 'rgba(134, 239, 172, 0.1)',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
  },
  navLabelDark: {
    color: '#9ca3af',
  },
  navLabelActive: {
    color: COLORS.primary,
  },
  fabDarkMode: {
    position: 'absolute',
    bottom: 200,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  fabDarkModeActive: {
    backgroundColor: '#1f2937',
    borderColor: '#86efac',
  },
  fabLocation: {
    position: 'absolute',
    bottom: 144,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});
