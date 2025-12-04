import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, useColorScheme, Platform, Modal, StatusBar, Image } from 'react-native';
import MapSearchBar from './MapSearchBar';
import BottomNavigation from './BottomNavigation';
import CafeListView from './CafeListView';
import InfoModal from './InfoModal';
import { COLORS } from '../constants/theme';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import data.json directly
const cafeData = require('../data.json');

// Conditional import for MapView (not supported on web)
let MapView: any = null;
let Marker: any = null;
let PROVIDER_GOOGLE: any = null;
let Region: any = null;

if (Platform.OS !== 'web') {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}

interface Cafe {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  image: string;
  description: string;
}

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const YOGYAKARTA_COORDS: Region = {
  latitude: -7.7725,
  longitude: 110.3825,
  latitudeDelta: 0.01, // Zoom awal lebih dekat
  longitudeDelta: 0.01, // Zoom awal lebih dekat
};

// Dark mode map style for Google Maps
const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9080' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b0' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3751ff' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export default function MapScreen() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Cafe | null>(null);
  const [showMarkerModal, setShowMarkerModal] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State baru
  const [pendingAnimation, setPendingAnimation] = useState<Cafe | null>(null); // State baru
  const [mapKey, setMapKey] = useState(0);
  const mapViewRef = useRef<any>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadCafes();
    requestLocationPermission();
  }, []);

  // UseEffect baru untuk menangani zoom dari daftar cafe
  useEffect(() => {
    if (pendingAnimation && mapViewRef.current && activeTab === 'map') {
      setShowMarkerModal(true);
      mapViewRef.current.animateToRegion(
        {
          latitude: pendingAnimation.latitude,
          longitude: pendingAnimation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
      // Reset pendingAnimation setelah selesai
      setPendingAnimation(null);
    }
  }, [pendingAnimation, activeTab]);
  
  useEffect(() => {
    setMapKey(prevKey => prevKey + 1);
  }, [darkMode]);

  const loadCafes = async () => {
    try {
      // Map JSON data to interface format
      const mappedCafes = cafeData.map((cafe: any) => ({
        id: cafe.id,
        name: cafe.nama,
        address: cafe.alamat,
        latitude: cafe.latitude,
        longitude: cafe.longitude,
        rating: cafe.rating,
        image: cafe.foto,
        description: cafe.nama, // Use nama as description
      }));
      setCafes(mappedCafes);
      setFilteredCafes(mappedCafes);
      setLoading(false);
    } catch (error) {
      console.error('Error loading cafes:', error);
      Alert.alert('Error', 'Failed to load café data');
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getUserLocation();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getUserLocation = async () => {
    try {
      setActiveTab('map');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(newLocation);
      
      // Zoom to user location
      if (mapViewRef.current && Platform.OS !== 'web') {
        mapViewRef.current.animateToRegion(
          {
            ...newLocation,
            latitudeDelta: 0.005, // Closer zoom level
            longitudeDelta: 0.005, // Closer zoom level
          },
          1000 // Animation duration in milliseconds
        );
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get your location');
    }
  };

  const handleMarkerPress = (cafe: Cafe) => {
    setSelectedMarker(cafe);
    setShowMarkerModal(true);
    // No need to set activeTab to map here, as this is already on map

    // Zoom to marker
    if (mapViewRef.current && Platform.OS !== 'web') {
      mapViewRef.current.animateToRegion({
        latitude: cafe.latitude,
        longitude: cafe.longitude,
        latitudeDelta: 0.005, // Closer zoom level
        longitudeDelta: 0.005, // Closer zoom level
      }, 1000); // Animation duration in milliseconds
    }
  };

  const handleCafeListItemPress = (cafe: Cafe) => {
    setPendingAnimation(cafe);
    setSelectedMarker(cafe);
    setActiveTab('map'); // Ini akan memicu useEffect untuk zoom setelah tab berubah
  };

  const handleSearch = (query: string): void => {
    // Keep showing all markers on map, only filter the list in SearchBar
    if (!query.trim()) {
      setFilteredCafes(cafes);
      return;
    }

    const filtered = cafes.filter(
      (cafe: Cafe) =>
        cafe.name.toLowerCase().includes(query.toLowerCase()) ||
        cafe.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCafes(filtered);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const sortCafesByDistance = () => {
    if (!userLocation) return filteredCafes;
    
    const sorted = [...filteredCafes].sort((a, b) => {
      const distA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude
      );
      const distB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude
      );
      return parseFloat(distA) - parseFloat(distB);
    });
    return sorted;
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setMapKey(prevKey => prevKey + 1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Cafés...</Text>
      </View>
    );
  }

  const styles_dynamic = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? COLORS.darkBg : COLORS.lightBg,
    },
  });

  return (
    <View style={[styles.container, styles_dynamic.container]}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1, paddingBottom: Platform.OS === 'android' ? 80 : 0 }}>
        {activeTab === 'map' && (
          <>
            {Platform.OS === 'web' ? (
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>
                  📍 Map not available on web. Use mobile or switch to List view.
                </Text>
              </View>
            ) : (
              <MapView
                key={mapKey}
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={YOGYAKARTA_COORDS}
                customMapStyle={darkMode ? darkMapStyle : undefined}
                // Menonaktifkan event pointer di peta saat dropdown terlihat
                pointerEvents={isDropdownVisible ? 'none' : 'auto'}
              >
                {cafes.map((cafe: Cafe) => (
                  <Marker
                    key={cafe.id}
                    coordinate={{
                      latitude: cafe.latitude,
                      longitude: cafe.longitude,
                    }}
                    title={cafe.name}
                    description={cafe.address}
                    pinColor="#22c55e"
                    onPress={() => handleMarkerPress(cafe)}
                  />
                ))}
                {userLocation && (
                  <Marker
                    coordinate={userLocation}
                    title="Your Location"
                    pinColor="blue"
                  />
                )}
              </MapView>
            )}
            <MapSearchBar 
              onSearch={handleSearch} 
              darkMode={darkMode}
              cafes={cafes}
              filteredCafes={filteredCafes}
              onCafeSelect={handleCafeListItemPress}
              onDropdownVisibilityChange={setIsDropdownVisible}
            />
          </>
        )}

        {activeTab === 'list' && (
          <CafeListView
            cafes={sortCafesByDistance()}
            userLocation={userLocation}
            calculateDistance={calculateDistance}
            darkMode={darkMode}
            onCafePress={handleCafeListItemPress}
          />
        )}

        {activeTab === 'info' && (
          <InfoModal darkMode={darkMode} />
        )}
      </View>

      {/* Marker Popup Modal */}
      <Modal
        visible={showMarkerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMarkerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, darkMode && styles.modalContentDark]}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowMarkerModal(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color={darkMode ? '#fff' : '#000'} />
            </TouchableOpacity>

            {selectedMarker && (
              <ScrollView contentContainerStyle={styles.modalScroll}>
                <View style={styles.modalHeaderContent}>
                  <Image source={{ uri: selectedMarker.image }} style={styles.modalImage} />
                  <View style={styles.modalDetails}>
                    <Text style={[styles.modalTitle, darkMode && styles.modalTitleDark]}>
                      {selectedMarker.name}
                    </Text>

                    <View style={styles.modalRating}>
                      {[...Array(5)].map((_, i) => (
                        <MaterialCommunityIcons
                          key={i}
                          name={i < Math.round(selectedMarker.rating) ? 'star' : 'star-outline'}
                          size={20}
                          color="#f59e0b"
                        />
                      ))}
                      <Text style={[styles.ratingText, darkMode && styles.ratingTextDark]}>
                        ({selectedMarker.rating})
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={[styles.modalAddress, darkMode && styles.modalAddressDark]}>
                  📍 {selectedMarker.address}
                </Text>

                <Text style={[styles.modalDescription, darkMode && styles.modalDescriptionDark]}>
                  {selectedMarker.description}
                </Text>

                {userLocation && (
                  <Text style={styles.distanceInfo}>
                    📏 {calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      selectedMarker.latitude,
                      selectedMarker.longitude
                    )} km dari lokasi Anda
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.navigateBtn}
                  onPress={() => {
                    setShowMarkerModal(false);
                    const url = `https://www.google.com/maps?q=${selectedMarker.latitude},${selectedMarker.longitude}`;
                    require('react-native').Linking.openURL(url);
                  }}
                >
                  <MaterialCommunityIcons name="directions" size={20} color="white" />
                  <Text style={styles.navigateBtnText}>Buka di Google Maps</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userLocation={userLocation}
        onRequestLocation={getUserLocation}
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  modalContentDark: {
    backgroundColor: '#1f2937',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 10,
  },
  modalScroll: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
  },
  modalTitleDark: {
    color: '#86efac',
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 8,
  },
  ratingTextDark: {
    color: '#9ca3af',
  },
  modalAddress: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  modalAddressDark: {
    color: '#d1d5db',
  },
  modalDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 18,
  },
  modalDescriptionDark: {
    color: '#9ca3af',
  },
  distanceInfo: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 16,
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 10,
  },
  navigateBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#e5e7eb',
  },
  modalDetails: {
    flex: 1,
  },
});
