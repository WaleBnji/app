
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCCM385U6mF0For0gN7cYuXD9CeWFN6O8Y',
  authDomain: 'galleryhng.firebaseapp.com',
  projectId: 'galleryhng',
  storageBucket: 'galleryhng.appspot.com',
  messagingSenderId: '11325036517',
  appId: '1:11325036517:web:78d71484c338e3c9f1010c',
  measurementId: 'G-589NQSTFEW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
// const analytics = getAnalytics(app);
