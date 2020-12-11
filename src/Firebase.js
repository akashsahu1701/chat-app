import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// var firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

var firebaseConfig = {
  apiKey: "AIzaSyB5Id5VT2FN_OSGuUlkwuDu5JglloPYqGA",
  authDomain: "chat-app-30b0c.firebaseapp.com",
  databaseURL: "https://chat-app-30b0c.firebaseio.com",
  projectId: "chat-app-30b0c",
  storageBucket: "chat-app-30b0c.appspot.com",
  messagingSenderId: "114280330137",
  appId: "1:114280330137:web:03c015043902508cc55908",
  measurementId: "G-067KEMV80R",
};
// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const database = app.database().ref("/chats");
export const storage = app.storage();
export default app;
