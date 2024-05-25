// Get a list of songs from database
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// Get a list of favourites from database
export const getFavourites = async (db, userId, setFavourites) => {
  const myArray = [];
  const picturesCol = collection(db, userId);
  console.log(picturesCol);
  const pictureSnapShot = await getDocs(picturesCol);
  pictureSnapShot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    myArray.push({ ...doc.data(), id: doc.id }); // A comprendre ici
  });
  console.log(myArray);
  setFavourites(myArray);
  // return myArray;
};

// Add favourite to collection
export const addFavourite = async (db, userId, img_scr) => {
  try {
    const docRef = await addDoc(collection(db, userId), img_scr);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Remove favourite to collection
export const removeFavourite = async (db, userId, img_scr) => {
  try {
    const docRef = doc(db, userId, img_scr);
    await deleteDoc(docRef);
    console.log('Deleted element: ', docRef.id);
  } catch (e) {
    console.error('Error deleted element: ', e);
  }
};
