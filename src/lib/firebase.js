import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtKZfPD_yd4EoslzXZu5HczmFZKha-3EU",
    authDomain: "fir-sample-5b2fa.firebaseapp.com",
    projectId: "fir-sample-5b2fa",
    storageBucket: "fir-sample-5b2fa.appspot.com",
    messagingSenderId: "402135830376",
    appId: "1:402135830376:web:5dd2f4947a1ee332b910dd"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
}; 