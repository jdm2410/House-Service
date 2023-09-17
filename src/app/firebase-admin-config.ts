const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ng-house-service-default-rtdb.europe-west1.firebasedatabase.app', // Replace with your Firebase database URL
});