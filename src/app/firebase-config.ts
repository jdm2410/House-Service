import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyAXeToCaWMj91sJjOaninn1y5gKxLv9oPw",
  authDomain: "ng-house-service.firebaseapp.com",
  databaseURL: "https://ng-house-service-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ng-house-service",
  storageBucket: "gs://ng-house-service.appspot.com",
  messagingSenderId: "665838707431",
  appId: "1:665838707431:web:ce9ea9278f31d04a527842",
  measurementId: "G-NM88HPBXVC"
};

const firebaseApp = initializeApp(firebaseConfig);


  
  export const environment = {
    production: false, // Set to true in production environment
    firebaseConfig: firebaseConfig,
  };