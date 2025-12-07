import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

// Mencegah splash screen bersembunyi secara otomatis
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<any>(null); // State untuk menyimpan user
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAppIsReady(true);
      SplashScreen.hideAsync(); // Sembunyikan splash screen setelah status autentikasi dimuat
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (!appIsReady) {
    return null; // Atau tampilkan loading indicator
  }

  return (
    <Stack>
      {/* Jika user tidak ada, arahkan ke login. Jika ada, ke tabs. */}
      {!user ? (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      {/* Tambahkan rute untuk register jika diperlukan */}
      <Stack.Screen name="register" options={{ headerShown: false }} />
      {/* Rute lain seperti modal.tsx */}
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
