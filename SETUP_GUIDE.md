# Setup & Installation Guide - UGM Nugas Map React Native

## ✅ Quick Setup Checklist

### 1. Prerequisites
- [x] Node.js & npm installed
- [x] Expo CLI installed globally: `npm install -g expo-cli`
- [x] Git installed
- [ ] Android Studio / Xcode (untuk testing on device)

### 2. Installation Steps

#### Step 1: Navigate ke Project Directory
```bash
cd d:\Praktikum\ UGM\ Semester\ 5\PGPBL\ResponsiReactNative\nugas-ugm
```

#### Step 2: Install Dependencies
```bash
npm install
```

Dependencies yang akan diinstall:
- react-native-maps (Peta interaktif)
- expo-location (Geolocation)
- @react-native-community/hooks
- react-native dan Expo base packages

#### Step 3: Start Development Server
```bash
npm start
```

Output akan terlihat seperti:
```
Starting project at /path/to/nugas-ugm
Starting Expo development server
Tunnel ready.
Android | (Press 'a' to open Android)
iOS     | (Press 'i' to open iOS)
Web     | (Press 'w' to open Web)
```

### 3. Run Aplikasi

**Option A: Menggunakan Expo Go App (Recommended)**
1. Install Expo Go dari App Store atau Play Store
2. Scan QR Code yang muncul di terminal
3. Aplikasi akan membuka di Expo Go

**Option B: Run di Android Emulator**
```bash
npm run android
```

**Option C: Run di iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option D: Run di Web Browser**
```bash
npm run web
```

## 📱 Testing Aplikasi

### Test Map Functionality
1. Buka aplikasi → Tab "Peta"
2. Seharusnya menampilkan peta Yogyakarta dengan marker café hijau

### Test Search
1. Ketik "Kopi" di search bar
2. Hasil akan di-filter secara real-time

### Test Location
1. Klik tombol lokasi (GPS icon) di bawah kanan
2. Izinkan akses lokasi saat diminta
3. Marker biru akan muncul di lokasi Anda

### Test List View
1. Klik tab "Daftar"
2. Café akan ditampilkan dengan urutan jarak terdekat
3. Klik tombol navigasi untuk membuka Google Maps

### Test Dark Mode
1. Klik tombol moon icon di bawah kanan
2. Aplikasi akan berubah ke dark mode
3. Klik lagi untuk kembali ke light mode

## 🗂️ Struktur File Penting

```
nugas-ugm/
├── data.json                    ← DATABASE CAFÉ (update di sini)
├── package.json                 ← Dependencies
├── app.json                     ← Expo configuration
├── app/
│   ├── _layout.tsx             ← Root navigator
│   ├── index.tsx               ← Main entry point
│   └── (tabs)/
│       └── index.tsx           ← Home screen
├── components/
│   ├── MapScreen.tsx           ← Main component
│   ├── MapSearchBar.tsx        ← Search bar
│   ├── BottomNavigation.tsx    ← Navigation bar
│   ├── CafeListView.tsx        ← Café list
│   └── InfoModal.tsx           ← Info screen
├── constants/
│   └── theme.ts                ← Colors & themes
└── NUGAS_REACT_NATIVE.md       ← Documentation

```

## 📝 Mengubah Data Café

Database café tersimpan di `data.json` di root folder project.

### Format Data:
```json
{
  "id": 1,
  "name": "Nama Café",
  "address": "Alamat lengkap",
  "latitude": -7.7725,
  "longitude": 110.3703,
  "rating": 4.5,
  "image": "https://url-to-image.com/image.jpg",
  "description": "Deskripsi singkat"
}
```

### Menambah Café Baru:
1. Buka `data.json`
2. Tambah object baru ke array
3. Gunakan ID yang belum digunakan
4. Simpan file
5. Restart aplikasi untuk melihat perubahan

### Contoh Format Lengkap:
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
  }
]
```

## 🎨 Mengubah Theme/Warna

Semua warna terdefinisi di `constants/theme.ts`:

```typescript
export const COLORS = {
  primary: '#059669',           // Warna utama (hijau)
  primaryDark: '#047857',       // Hijau lebih gelap
  primaryLight: '#10b981',      // Hijau lebih terang
  lightBg: '#f5f5f5',          // Background terang
  darkBg: '#1f2937',           // Background gelap
  // ... colors lainnya
};
```

Ubah value hex color untuk mengubah tema aplikasi.

## 🔧 Troubleshooting

### Error: "Cannot find module 'react-native-maps'"
```bash
npm install react-native-maps
npx expo prebuild --clean
npm start
```

### Error: "Permission denied"
```bash
# Bersihkan cache
npm start -- --clear
```

### Maps tidak menampilkan di Android
- Pastikan sudah run `npm run android`
- Cek Google Maps API key di `app.json`

### Geolocation tidak bekerja
- Cek permissions di `app.json`
- Izinkan akses lokasi saat app pertama kali dibuka
- Di emulator, pastikan location service diaktifkan

### Build Error
```bash
# Clear cache dan rebuild
rm -rf node_modules
npm install
npm start -- --clear
```

## 📦 Build untuk Production

### Android APK
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

Requires Expo account: [expo.dev](https://expo.dev)

## 📚 Referensi & Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)

## 💡 Tips & Best Practices

1. **Gunakan Expo Go** untuk development awal yang lebih cepat
2. **Hot Reload** - Perubahan code otomatis refresh tanpa restart
3. **Use TypeScript** - Untuk type safety yang lebih baik
4. **Test di Real Device** - Untuk testing geolocation akurat
5. **Keep data.json Updated** - Update database untuk menambah/ubah café

## 📞 Support

Jika ada error:
1. Cek console output di terminal
2. Lihat error message di Expo Go app
3. Try clearing cache: `npm start -- --clear`
4. Reinstall dependencies: `npm install`

---

**Last Updated:** December 2025
**Version:** 1.0.0
**Status:** ✅ Ready for Development
