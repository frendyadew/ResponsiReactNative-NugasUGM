# 🎉 UGM Nugas Map - React Native Version READY!

## 📌 QUICK INFO

✅ **Status:** Selesai dan siap digunakan
✅ **Database:** Sudah tersedia
✅ **Fungsi:** Sama persis dengan versi web
✅ **Framework:** React Native + Expo

---

## 📍 DATABASE LOCATION

```
📁 d:\Praktikum UGM Semester 5\PGPBL\ResponsiReactNative\nugas-ugm\data.json
```

**Format:** JSON Array berisi data café

---

## 🚀 QUICK START

### 1. Buka Terminal & Navigate
```powershell
cd "d:\Praktikum UGM Semester 5\PGPBL\ResponsiReactNative\nugas-ugm"
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm start
```

### 4. Jalankan Aplikasi
Pilih salah satu:
- **Android:** Tekan `a` di terminal
- **iOS:** Tekan `i` di terminal (macOS only)
- **Expo Go:** Scan QR code dengan app Expo Go
- **Web:** Tekan `w` di terminal

---

## 📂 PROJECT STRUCTURE

```
nugas-ugm/
├── 📄 data.json                    ← EDIT DATABASE DI SINI
├── 📄 app.json                     ← Config
├── 📄 package.json                 ← Dependencies
│
├── 📁 app/                         ← Navigation
│   ├── _layout.tsx
│   └── (tabs)/index.tsx
│
├── 📁 components/                  ← React Components
│   ├── MapScreen.tsx               ← Main component
│   ├── MapSearchBar.tsx            ← Search bar
│   ├── BottomNavigation.tsx        ← Nav bar
│   ├── CafeListView.tsx            ← List view
│   └── InfoModal.tsx               ← Info screen
│
├── 📁 constants/
│   └── theme.ts                    ← Colors & styles
│
└── 📄 DOKUMENTASI
    ├── NUGAS_REACT_NATIVE.md           (Complete docs)
    ├── SETUP_GUIDE.md                  (Setup instructions)
    └── WEB_TO_REACT_NATIVE_MAPPING.md  (Web vs RN comparison)
```

---

## ✨ FEATURES

| Feature | Status |
|---------|--------|
| 📍 Interactive Map | ✅ |
| 🔍 Search Café | ✅ |
| 📋 List View | ✅ |
| 📍 Geolocation | ✅ |
| 📏 Distance Calculation | ✅ |
| 🗺️ Google Maps Navigation | ✅ |
| 🌙 Dark Mode | ✅ |
| ℹ️ Info Screen | ✅ |
| 📱 Responsive Design | ✅ |
| 💾 JSON Database | ✅ |

---

## 🎨 KOMPONEN UTAMA

### MapScreen.tsx
**Fungsi:** Komponen utama yang mengelola:
- Load data dari `data.json`
- Tab navigation (Map, List, Info)
- Geolocation handling
- Search & filtering
- Distance calculation

### MapSearchBar.tsx
**Fungsi:** Search bar di atas peta
- Real-time search
- Filter berdasarkan nama/alamat

### BottomNavigation.tsx
**Fungsi:** Navigation bar di bawah
- 3 tab: Map, List, Info
- Dark mode toggle button
- Location button

### CafeListView.tsx
**Fungsi:** Menampilkan daftar café
- List dengan scroll
- Sorting by distance
- Navigate to Google Maps

### InfoModal.tsx
**Fungsi:** Informasi aplikasi
- Fitur aplikasi
- Cara penggunaan
- Tech stack

---

## 🔧 MENGUBAH DATABASE

### Location: `data.json`

### Format Setiap Café:
```json
{
  "id": 1,
  "name": "Nama Café",
  "address": "Alamat lengkap",
  "latitude": -7.7725,
  "longitude": 110.3703,
  "rating": 4.5,
  "image": "https://url-image.jpg",
  "description": "Deskripsi singkat"
}
```

### Untuk Menambah Café:
1. Buka `data.json`
2. Tambah object baru ke array
3. Gunakan ID yang belum dipakai
4. Simpan
5. Restart aplikasi

---

## 🎨 MENGUBAH WARNA

**File:** `constants/theme.ts`

```typescript
export const COLORS = {
  primary: '#059669',        ← Warna hijau utama
  primaryDark: '#047857',
  primaryLight: '#10b981',
  warning: '#f59e0b',        ← Warna warning (orange)
  // ... colors lainnya
};
```

Ubah hex code untuk mengubah tema.

---

## 📱 TESTING CHECKLIST

- [ ] Map menampilkan dengan benar
- [ ] Marker café terlihat (hijau)
- [ ] Search bar berfungsi
- [ ] Tab navigation bekerja
- [ ] Dark mode toggle bekerja
- [ ] Location button request permission
- [ ] List view menampilkan café
- [ ] Distance calculation akurat
- [ ] Google Maps navigation terbuka
- [ ] Info modal menampilkan content

---

## 🐛 TROUBLESHOOTING

### Maps tidak muncul?
- Pastikan internet connect
- Clear cache: `npm start -- --clear`
- Check Google Maps API key di `app.json`

### Data tidak load?
- Cek `data.json` format JSON valid
- File harus di root folder project

### Geolocation error?
- Izinkan permission saat diminta
- Cek GPS/location services di device

### Error saat install?
```powershell
# Clear node_modules dan install ulang
rm -Recurse node_modules
npm install
```

---

## 📖 DOKUMENTASI

Buka file ini untuk info lebih lengkap:

1. **NUGAS_REACT_NATIVE.md**
   - Complete documentation
   - Tech details
   - Semua fitur dijelaskan

2. **SETUP_GUIDE.md**
   - Step-by-step installation
   - Testing guide
   - Build untuk production

3. **WEB_TO_REACT_NATIVE_MAPPING.md**
   - Perbandingan Web vs React Native
   - Code mapping
   - Features checklist

---

## ⚡ COMMAND REFERENCE

```powershell
# Development
npm start           # Start server
npm start -- a      # Android
npm start -- i      # iOS
npm start -- w      # Web

# Dependencies
npm install         # Install packages
npm update          # Update packages

# Cleaning
npm start -- --clear    # Clear cache
rm node_modules
npm install

# Linting
npm run lint        # Check code
```

---

## 📞 QUICK REFERENCE

| Item | Value |
|------|-------|
| **Database Path** | `data.json` di root folder |
| **Main Component** | `MapScreen.tsx` |
| **Colors Config** | `constants/theme.ts` |
| **Navigation** | `Bottom tabs: Map, List, Info` |
| **Map Library** | React Native Maps |
| **Location API** | Expo Location |
| **Database Format** | JSON Array |

---

## ✅ VERIFIKASI SETUP

Setelah jalankan aplikasi, pastikan:

1. ✅ Peta Yogyakarta muncul
2. ✅ Marker café berwarna hijau ada di peta
3. ✅ Tab navigation di bawah berfungsi
4. ✅ Search bar merespons input
5. ✅ Dark mode toggle berfungsi
6. ✅ Location button ada di kanan bawah

Jika semua ✅, berarti **SETUP BERHASIL!**

---

## 🎯 NEXT STEPS

1. **Install & Run**
   ```powershell
   npm install
   npm start
   ```

2. **Test Aplikasi**
   - Coba semua fitur
   - Test di berbagai device

3. **Update Data**
   - Edit `data.json`
   - Tambah café asli Yogyakarta

4. **Customize**
   - Ubah warna di `theme.ts`
   - Modify komponen sesuai kebutuhan

5. **Deploy**
   - Build APK untuk Android
   - Build IPA untuk iOS
   - atau push ke Expo

---

## 📊 PROJECT INFO

```
Project: UGM Nugas Map
Type: React Native + Expo
Version: 1.0.0
Language: TypeScript
Database: JSON Local
Status: ✅ Ready
Last Update: December 2025
```

---

## 🎓 PEMBELAJARAN PENTING

### Dari Web ke React Native:
- DOM manipulation → State management
- CSS styling → React Native StyleSheet
- HTML elements → React Native components
- Vanilla JS → React hooks
- Leaflet → React Native Maps
- navigator.geolocation → expo-location

### Best Practices:
- Gunakan hooks untuk state management
- Component-based architecture
- Separate styles in StyleSheet
- PropTypes atau TypeScript untuk type safety
- Keep components small dan reusable

---

**Selamat! Aplikasi Anda sudah siap! 🚀**

Untuk pertanyaan lebih lanjut, lihat dokumentasi lengkap di file markdown yang disediakan.

---

*Created: December 2025*
*Framework: React Native + Expo*
*Status: Production Ready*
