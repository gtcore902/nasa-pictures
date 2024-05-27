// Get a list of songs from database
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

/**
 * Get a list of favourites from database
 * @param {object} db
 * @param {string} userId
 * @param {function} setFavourites
 */
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
};

/**
 * Handle add favourite to collection
 * @param {string} picture
 * @param {object} db
 * @param {string} userId
 * @param {object} favourites
 * @param {function} setFavourites
 * @param {function} notify
 */
export const handleAddFavourites = async (
  picture,
  db,
  userId,
  favourites,
  setFavourites,
  notify,
  timestamp
) => {
  await addFavourite(db, userId, {
    img_src: picture,
    timestamp: timestamp,
  });
  const updatedFavourites = [
    ...favourites,
    { img_src: picture, timestamp: timestamp },
  ];
  setFavourites(updatedFavourites);
  getFavourites(db, userId, setFavourites);
  notify('Picture added to your favourites!');
};

/**
 * Add favourite to collection
 * @param {object} db
 * @param {string} userId
 * @param {string} img_scr
 */
export const addFavourite = async (db, userId, img_scr) => {
  try {
    const docRef = await addDoc(collection(db, userId), img_scr);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

/**
 * Handle remove favourite to collection
 * @param {string} picture
 * @param {object} db
 * @param {string} userId
 * @param {object} favourites
 * @param {function} setFavourites
 * @param {function} notify
 */
export const handleRemoveFavourites = async (
  picture,
  db,
  userId,
  favourites,
  setFavourites,
  notify
) => {
  const ref = favourites.filter((favourite) => favourite.img_src === picture);
  console.log(ref[0].id);
  await removeFavourite(db, userId, ref[0].id);
  const updatedFavourites = favourites.filter(
    (element) => element.img_src !== picture
  );
  setFavourites(updatedFavourites);
  getFavourites(db, userId, setFavourites);
  notify('Picture removed from your favourites!');
};

/**
 * Remove favourite to collection
 * @param {object} db
 * @param {string} userId
 * @param {string} img_scr
 */
export const removeFavourite = async (db, userId, img_scr) => {
  try {
    const docRef = doc(db, userId, img_scr);
    await deleteDoc(docRef);
    console.log('Deleted element: ', docRef.id);
  } catch (e) {
    console.error('Error deleted element: ', e);
  }
};
