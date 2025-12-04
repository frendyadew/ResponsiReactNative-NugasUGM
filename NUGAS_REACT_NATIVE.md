# UGM Nugas Map - React Native Version

Aplikasi peta interaktif untuk menemukan café-café terbaik di Yogyakarta, dibangun dengan React Native dan Expo.

## 📁 Struktur Folder

```
nugas-ugm/
├── app/                          # Navigation dan screens
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Main screen
│   ├── modal.tsx
│   └── (tabs)/                  # Tab navigation
│       ├── _layout.tsx
│       └── index.tsx            # Home screen
├── components/                   # React components
│   ├── MapScreen.tsx            # Main map screen component
│   ├── MapSearchBar.tsx         # Search bar component
│   ├── BottomNavigation.tsx     # Bottom navigation bar
│   ├── CafeListView.tsx         # Café list view
│   ├── InfoModal.tsx            # Information modal
│   └── ...other components
├── constants/
│   └── theme.ts                 # Color theme dan constants
├── data.json                    # **Database café dalam format JSON**
├── package.json
├── tsconfig.json
└── app.json
```

## 📍 Database Location

**File database tersimpan di:** `d:\Praktikum UGM Semester 5\PGPBL\ResponsiReactNative\nugas-ugm\data.json`

### Struktur Data (data.json)

```json
[
  {
    "id": 1,
    "name": "Kopi Kenangan",
    "address": "Jl. Cik Ditiro No. 12, Yogyakarta",
    "latitude": -7.7725,
    "longitude": 110.3703,
    "rating": 4.5,
    "image": "https://via.placeholder.com/400x300?text=Kopi+Kenangan",
    "description": "Kedai kopi modern dengan suasana cozy"
  },
  ...
]
```

## 🚀 Fitur

✅ **Peta Interaktif** - Menampilkan semua café di Yogyakarta pada peta
✅ **Pencarian** - Cari café berdasarkan nama atau alamat
✅ **Daftar Café** - Lihat daftar semua café dengan sorting berdasarkan jarak
✅ **Geolocation** - Dapatkan lokasi Anda dan hitung jarak ke setiap café
✅ **Google Maps Integration** - Navigasi langsung ke café menggunakan Google Maps
✅ **Dark Mode** - Dukungan tema gelap untuk kenyamanan mata
✅ **Rating & Info** - Lihat rating dan informasi detail setiap café

## 🔧 Komponen Utama

### MapScreen.tsx
Komponen utama yang mengelola:
- Memuat data café dari `data.json`
- State management untuk tab navigation
- Geolocation handling
- Search functionality
- Distance calculation

### MapSearchBar.tsx
- Input search dengan auto-complete
- Real-time filtering café

### BottomNavigation.tsx
- Tab navigation (Map, List, Info)
- Dark mode toggle button
- Location request button

### CafeListView.tsx
- Menampilkan daftar café
- Sorting berdasarkan jarak
- Card dengan informasi lengkap
- Integrasi dengan Google Maps

### InfoModal.tsx
- Menampilkan informasi aplikasi
- Fitur dan cara penggunaan
- Teknologi yang digunakan

## 🔌 Teknologi

- **React Native** - Framework untuk aplikasi mobile
- **Expo** - Platform development untuk React Native
- **React Native Maps** - Library untuk peta interaktif
- **Expo Location** - API untuk geolocation
- **Material Community Icons** - Icon library
- **TypeScript** - Type-safe JavaScript

## 📦 Dependencies

```json
{
  "@react-native-community/hooks": "Hooks untuk React Native",
  "react-native-maps": "Peta interaktif dengan Google Maps",
  "expo-location": "Akses geolocation device",
  "@expo/vector-icons": "Icon library"
}
```

## ⚙️ Instalasi & Setup

### 1. Install Dependencies

```bash
cd nugas-ugm
npm install
# atau
yarn install
```

### 2. Jalankan Aplikasi

```bash
# Development server
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📱 Penggunaan

### Tab Peta
1. Menampilkan peta interaktif Yogyakarta
2. Gunakan tombol lokasi untuk menemukan posisi Anda
3. Marker hijau menunjukkan lokasi café
4. Marker biru menunjukkan posisi Anda

### Tab Daftar
1. Lihat semua café dalam bentuk list
2. Café disort berdasarkan jarak terdekat dari posisi Anda
3. Klik navigasi untuk membuka Google Maps

### Tab Info
1. Informasi tentang aplikasi
2. Daftar fitur utama
3. Cara penggunaan
4. Teknologi yang digunakan

## 🎨 Tema & Styling

### Light Mode (Default)
- Background: White (#ffffff)
- Primary Color: Green (#059669)
- Accent: Orange (#f59e0b)

### Dark Mode
- Background: Dark Gray (#1f2937)
- Primary Color: Light Green (#86efac)
- Text: Light (#ffffff)

Semua warna terdefinisi di `constants/theme.ts`

## 📊 Struktur Data Café

| Field | Type | Keterangan |
|-------|------|-----------|
| id | number | ID unik café |
| name | string | Nama café |
| address | string | Alamat lengkap |
| latitude | number | Koordinat lintang |
| longitude | number | Koordinat bujur |
| rating | number | Rating (1-5) |
| image | string | URL gambar café |
| description | string | Deskripsi singkat |

## 🔄 Fungsi-Fungsi Penting

### calculateDistance(lat1, lon1, lat2, lon2)
Menghitung jarak antara dua titik menggunakan formula Haversine

```typescript
const distance = calculateDistance(
  userLat, userLon,
  cafeLat, cafeLon
); // hasil dalam km
```

### handleSearch(query)
Filter café berdasarkan nama atau alamat

### getUserLocation()
Request permission geolocation dan dapatkan posisi user

### handleTabChange(tab)
Switching antara tab: 'map', 'list', 'info'

## 🌐 API Integration

### Geolocation
```typescript
import * as Location from 'expo-location';

const location = await Location.getCurrentPositionAsync();
```

### Google Maps Navigation
```typescript
const url = `https://www.google.com/maps?q=${lat},${lng}`;
Linking.openURL(url);
```

## 💾 Data Management

Data café dimuat dari file `data.json` saat aplikasi pertama kali dibuka:

```typescript
async function loadCafesData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  setCafes(data);
}
```

Data disimpan dalam state React:
- `cafes` - Semua data café dari JSON
- `filteredCafes` - Data yang sudah di-filter berdasarkan search
- `userLocation` - Lokasi user saat ini

## 🐛 Troubleshooting

### Maps tidak muncul
- Pastikan API key Google Maps sudah dikonfigurasi di `app.json`
- Cek koneksi internet

### Geolocation error
- Pastikan permission sudah diberikan
- Cek apakah device mempunyai GPS

### Data tidak load
- Pastikan file `data.json` ada di root folder project
- Cek format JSON

## 📝 Lisensi

Dikembangkan untuk keperluan UGM

---

**Created:** December 2025
**Framework:** React Native + Expo
**Database:** JSON (Local)
