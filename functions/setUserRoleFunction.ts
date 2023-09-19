import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(); // Initialize Firebase Admin SDK

// Define the Cloud Function
export const setUserRole = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
  }

  const { uid, role } = data; // Extract user ID and role from request data

  // Set custom claims for the user's role
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return { message: `User role set to '${role}' successfully.` };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error setting custom claims.', error);
  }
});
