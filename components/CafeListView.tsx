import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

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

interface Location {
  latitude: number;
  longitude: number;
}

interface CafeListViewProps {
  cafes: Cafe[];
  userLocation: Location | null;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => string;
  darkMode: boolean;
  onCafePress?: (cafe: Cafe) => void;
}

export default function CafeListView({
  cafes,
  userLocation,
  calculateDistance,
  darkMode,
  onCafePress,
}: CafeListViewProps) {
  const renderStars = (rating: number): string => {
    const stars = Math.round(rating);
    let starString = '';
    for (let i = 0; i < 5; i++) {
      starString += i < stars ? '⭐' : '☆';
    }
    return starString;
  };

  const CafeCard = ({ cafe }: { cafe: Cafe }) => {
    const distance = userLocation
      ? calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          cafe.latitude,
          cafe.longitude
        )
      : null;

    const handleNavigate = () => {
      const url = `https://www.google.com/maps?q=${cafe.latitude},${cafe.longitude}`;
      Linking.openURL(url);
    };

    return (
      <TouchableOpacity
        style={[styles.cafeCard, darkMode && styles.cafeCardDark]}
        activeOpacity={0.7}
        onPress={() => {
          onCafePress?.(cafe);
        }}
      >
        <Image
          source={{ uri: cafe.image }}
          style={styles.cardImage}
        />
        <View style={styles.cardInfo}>
          <Text
            style={[styles.cardTitle, darkMode && styles.cardTitleDark]}
            numberOfLines={2}
          >
            {cafe.name}
          </Text>
          <Text style={styles.cardRating}>
            {renderStars(cafe.rating)} ({cafe.rating})
          </Text>
          <Text
            style={[styles.cardAddress, darkMode && styles.cardAddressDark]}
            numberOfLines={2}
          >
            {cafe.address}
          </Text>
          {distance && (
            <Text style={styles.cardDistance}>{distance} km</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={handleNavigate}
        >
          <MaterialCommunityIcons
            name="directions"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={[styles.header, darkMode && styles.headerDark]}>
        <Text style={[styles.headerTitle, darkMode && styles.headerTitleDark]}>
          Café di Yogyakarta
        </Text>
      </View>
      <FlatList
        data={cafes}
        renderItem={({ item }) => <CafeCard cafe={item} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        style={[styles.list, darkMode && styles.listDark]}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Tidak ada café yang ditemukan
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerDark: {
    backgroundColor: '#1f2937',
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  headerTitleDark: {
    color: '#86efac',
  },
  list: {
    flex: 1,
  },
  listDark: {
    backgroundColor: '#1f2937',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  cafeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    gap: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cafeCardDark: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardTitleDark: {
    color: '#f3f4f6',
  },
  cardRating: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: '600',
    marginBottom: 6,
  },
  cardAddress: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 4,
  },
  cardAddressDark: {
    color: '#9ca3af',
  },
  cardDistance: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
    fontSize: 16,
    fontWeight: '500',
  },
});
