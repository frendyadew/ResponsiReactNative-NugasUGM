import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

interface MapSearchBarProps {
  onSearch: (query: string) => void;
  darkMode: boolean;
  cafes: Cafe[];
  filteredCafes: Cafe[];
  onCafeSelect?: (cafe: Cafe) => void;
}

export default function MapSearchBar({ 
  onSearch, 
  darkMode, 
  cafes, 
  filteredCafes,
  onCafeSelect 
}: MapSearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const insets = useSafeAreaInsets();

  const handleChangeText = (text: string): void => {
    setQuery(text);
    onSearch(text);
    setShowResults(text.length > 0);
  };

  const handleCafeSelect = (cafe: Cafe) => {
    setQuery('');
    setShowResults(false);
    onCafeSelect?.(cafe);
  };

  const renderStars = (rating: number): string => {
    const stars = Math.round(rating);
    let starString = '';
    for (let i = 0; i < 5; i++) {
      starString += i < stars ? '⭐' : '☆';
    }
    return starString;
  };

  return (
    <View style={[styles.container, { top: insets.top + 16 }]}>
      <View style={[styles.searchBox, darkMode && styles.searchBoxDark]}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={COLORS.primary}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          placeholder="Cari café di Yogyakarta..."
          placeholderTextColor={darkMode ? '#9ca3af' : '#9ca3af'}
          value={query}
          onChangeText={handleChangeText}
        />
        {query.length > 0 && (
          <TouchableOpacity 
            onPress={() => {
              setQuery('');
              setShowResults(false);
              onSearch('');
            }}
          >
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {showResults && filteredCafes.length > 0 && (
        <View 
          style={[styles.dropdown, darkMode && styles.dropdownDark]}
          onStartShouldSetResponderCapture={() => true}
          onMoveShouldSetResponderCapture={() => true}
        >
          <FlatList
            data={filteredCafes}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: cafe }) => (
              <TouchableOpacity
                style={[styles.resultItem, darkMode && styles.resultItemDark]}
                onPress={() => handleCafeSelect(cafe)}
              >
                <Image
                  source={{ uri: cafe.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultInfo}>
                  <Text
                    style={[styles.resultName, darkMode && styles.resultNameDark]}
                    numberOfLines={1}
                  >
                    {cafe.name}
                  </Text>
                  <Text
                    style={[styles.resultAddress, darkMode && styles.resultAddressDark]}
                    numberOfLines={1}
                  >
                    {cafe.address}
                  </Text>
                  <Text style={styles.resultRating}>
                    {renderStars(cafe.rating)} ({cafe.rating})
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            maxToRenderPerBatch={5}
          />
        </View>
      )}

      {showResults && query.length > 0 && filteredCafes.length === 0 && (
        <View style={[styles.dropdown, darkMode && styles.dropdownDark]}>
          <Text style={[styles.noResults, darkMode && styles.noResultsDark]}>
            Tidak ada hasil pencarian
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.1)',
  },
  searchBoxDark: {
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
    borderColor: 'rgba(134, 239, 172, 0.1)',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  inputDark: {
    color: '#ffffff',
  },
  dropdown: {
    position: 'absolute',
    top: 68,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 12,
    marginHorizontal: 16,
    maxHeight: 300,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 10,
    zIndex: 101,
  },
  dropdownDark: {
    backgroundColor: 'rgba(31, 41, 55, 0.98)',
  },
  resultItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  resultItemDark: {
    borderBottomColor: '#374151',
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e5e7eb',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  resultNameDark: {
    color: '#ffffff',
  },
  resultAddress: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  resultAddressDark: {
    color: '#d1d5db',
  },
  resultRating: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: '500',
  },
  noResults: {
    textAlign: 'center',
    paddingVertical: 16,
    color: '#6b7280',
    fontSize: 13,
  },
  noResultsDark: {
    color: '#d1d5db',
  },
});
