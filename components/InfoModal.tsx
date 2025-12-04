import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/theme';

interface InfoModalProps {
  darkMode: boolean;
}

export default function InfoModal({ darkMode }: InfoModalProps) {
  return (
    <SafeAreaView
      style={[styles.container, darkMode && styles.containerDark]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.title, darkMode && styles.titleDark]}>
          Tentang Aplikasi
        </Text>

        <Text style={[styles.description, darkMode && styles.descriptionDark]}>
          <Text style={styles.bold}>UGM Nugas Map</Text> adalah aplikasi peta
          interaktif yang membantu Anda menemukan tempat Nugas (nongkrong) terbaik
          di area sekitar kampus UGM dengan mudah dan cepat.
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.subtitleDark]}>
          Fitur Utama:
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          📍 Peta interaktif dengan lokasi semua tempat Nugas di sekitar UGM
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          🔍 Fitur pencarian tempat Nugas berdasarkan nama atau alamat
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          ⭐ Rating dan informasi detail lengkap setiap tempat Nugas
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          📍 Jarak dari lokasi Anda ke setiap tempat Nugas
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          🗺️ Integrasi dengan Google Maps untuk navigasi
        </Text>
        <Text style={[styles.feature, darkMode && styles.featureDark]}>
          🌙 Mode gelap untuk kenyamanan mata di malam hari
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.subtitleDark]}>
          Cara Menggunakan:
        </Text>
        <Text style={[styles.instruction, darkMode && styles.instructionDark]}>
          1. Gunakan tab "Peta" untuk melihat semua café di peta interaktif
        </Text>
        <Text style={[styles.instruction, darkMode && styles.instructionDark]}>
          2. Gunakan tab "Daftar" untuk melihat daftar café dengan jarak dari lokasi Anda
        </Text>
        <Text style={[styles.instruction, darkMode && styles.instructionDark]}>
          3. Gunakan fitur pencarian untuk menemukan café tertentu
        </Text>
        <Text style={[styles.instruction, darkMode && styles.instructionDark]}>
          4. Klik tombol navigasi untuk membuka Google Maps
        </Text>
        <Text style={[styles.instruction, darkMode && styles.instructionDark]}>
          5. Gunakan tombol lokasi untuk menemukan posisi Anda
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.subtitleDark]}>
          Teknologi:
        </Text>
        <Text style={[styles.tech, darkMode && styles.techDark]}>
          • React Native - Framework untuk aplikasi mobile
        </Text>
        <Text style={[styles.tech, darkMode && styles.techDark]}>
          • Expo - Platform untuk development React Native
        </Text>
        <Text style={[styles.tech, darkMode && styles.techDark]}>
          • React Native Maps - Library untuk peta interaktif
        </Text>
        <Text style={[styles.tech, darkMode && styles.techDark]}>
          • Expo Location - API untuk geolocation
        </Text>

        <Text style={[styles.footer, darkMode && styles.footerDark]}>
          Dikembangkan dengan ❤️ untuk UGM
        </Text>
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  },
  titleDark: {
    color: '#86efac',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 16,
  },
  descriptionDark: {
    color: '#d1d5db',
  },
  bold: {
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitleDark: {
    color: '#86efac',
  },
  feature: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 6,
  },
  featureDark: {
    color: '#d1d5db',
  },
  instruction: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 6,
  },
  instructionDark: {
    color: '#d1d5db',
  },
  tech: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 6,
  },
  techDark: {
    color: '#d1d5db',
  },
  footer: {
    fontSize: 12,
    color: '#7c3aed',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerDark: {
    color: '#a78bfa',
  },
});
