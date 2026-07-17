import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FirebaseApp } from "firebase/app";
// Firebase exposes this function only through its React Native export condition.
// @ts-expect-error The generic TypeScript resolver sees the browser declaration.
import { getAuth, getReactNativePersistence, initializeAuth, type Auth } from "firebase/auth";

export function authForApp(app: FirebaseApp): Auth {
  try {
    return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  } catch {
    return getAuth(app);
  }
}
