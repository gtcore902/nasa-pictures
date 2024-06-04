// Get a list of songs from database
import { faV } from '@fortawesome/free-solid-svg-icons';
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
    myArray.push({
      ...doc.data(),
      id: doc.id,
      earth_date: doc.data().earth_date,
      camera: doc.data().camera,
      // id: doc.data().id,
    }); // A comprendre ici
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
  datas,
  picture,
  db,
  userId,
  favourites,
  setFavourites,
  notify,
  timestamp
) => {
  let dataset = Array.from(datas);
  const target = dataset.filter((data) => data.img_src === picture.img_src);
  console.log(target[0].img_src);
  await addFavourite(db, userId, {
    img_src: target[0].img_src,
    earth_date: target[0].earth_date,
    camera: target[0].camera.full_name,
    // id: target[0].id,
    timestamp: timestamp,
  });
  const updatedFavourites = [
    ...favourites,
    {
      img_src: target[0].img_src,
      earth_date: target[0].earth_date,
      camera: target[0].camera.full_name,
      timestamp: timestamp,
    },
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
  console.log(favourites);
  console.log(picture);
  const dataset = Array.from(favourites);
  console.log(dataset);
  const img_src = 'img_src';
  dataset.map((element) => console.log(element[img_src]));
  const ref = dataset.filter(
    (favourite) => favourite[img_src] === picture[img_src]
  );
  // const ref = favourites[0].id;
  // dataset.map((favourite) => console.log(favourite.img_scr));
  // console.log(favourites);
  console.log(ref);
  await removeFavourite(db, userId, ref[0].id);
  const updatedFavourites = favourites.filter(
    (favourite) => favourite[img_src] !== picture[img_src]
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
