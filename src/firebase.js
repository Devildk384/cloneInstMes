import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUj9XYv4AhksnsT-doqbmcuTD2Vq4aNvg",
    authDomain: "socialshare-24349.firebaseapp.com",
    databaseURL: "https://socialshare-24349.firebaseio.com",
    projectId: "socialshare-24349",
    storageBucket: "socialshare-24349.appspot.com",
    messagingSenderId: "871679590097",
    appId: "1:871679590097:web:c685774b90cf9788168ff0",
    measurementId: "G-XT4VGSZKH6"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth ,storage};

//   export default firebaseConfig;