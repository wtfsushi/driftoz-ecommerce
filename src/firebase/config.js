import { initializeApp } from 'firebase/app';

// CRA expects env vars to be prefixed with REACT_APP_. Support both prefixed and unprefixed.
const env = (key, fallback = '') =>
  process.env[`REACT_APP_${key}`] || process.env[key] || fallback;

const firebaseConfig = {
  apiKey: env('FIREBASE_API_KEY', 'AIzaSyA-ugQT3nKTmtLgNw4palLvL3dxvL_8Op0'),
  authDomain: env('FIREBASE_AUTH_DOMAIN', 'driftoz.firebaseapp.com'),
  projectId: env('FIREBASE_PROJECT_ID', 'driftoz'),
  storageBucket: env('FIREBASE_STORAGE_BUCKET', 'driftoz.firebasestorage.app'),
  messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID', '27059522684'),
  appId: env('FIREBASE_APP_ID', '1:27059522684:web:d0e52f3fdb0b6f9eec0df9'),
};

const app = initializeApp(firebaseConfig);

export default app;