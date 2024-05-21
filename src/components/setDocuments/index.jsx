// Get a list of songs from database
import { collection, getDocs } from 'firebase/firestore';

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
