// Get a list of songs from database
import { collection, getDocs, addDoc } from 'firebase/firestore';

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
  setFavourites([...myArray]);
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
// Use it with next function
// const newImage = {
//     img_src:
//       'https://images.unsplash.com/photo-1715313200229-0326e4fd2e5e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
//   };
// addFavourite(db, userCredential.user.uid, newImage);
