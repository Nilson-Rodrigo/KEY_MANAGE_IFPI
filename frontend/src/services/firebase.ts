import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

export function firebaseConfig(): FirebaseOptions {
  const config = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  } satisfies FirebaseOptions;

  if (Object.values(config).some((value) => !value)) {
    throw new Error("Configuração Firebase incompleta. Preencha as variáveis EXPO_PUBLIC_FIREBASE_*.");
  }
  return config;
}

let services: { app: FirebaseApp; auth: Auth; db: Firestore } | undefined;

export function firebaseServices(): { app: FirebaseApp; auth: Auth; db: Firestore } {
  if (services) return services;
  const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig());
  services = { app, auth: getAuth(app), db: getFirestore(app) };
  return services;
}
