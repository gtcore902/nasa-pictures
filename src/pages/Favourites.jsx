import { Context } from '../Context';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
// import { collection, getDocs } from 'firebase/firestore';
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from '../components/setDocuments';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import config from '../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const { isLogged, toggleLogin } = useContext(Context);
  const { userId, setUser } = useContext(Context);
  const [favourites, setFavourites] = useState([]);

  // Firebase
  // Firebase project configuration
  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleRemoveFavourites = async (picture) => {
    const ref = favourites.filter((favourite) => favourite.img_src === picture);
    await removeFavourite(db, userId, ref[0].id);
    const updatedFavourites = favourites.filter(
      (element) => element.img_src !== picture
    );
    setFavourites(updatedFavourites);
    getFavourites(db, userId, setFavourites);
    notify('Picture removed from your favourites!');
  };

  const notify = (text) => {
    toast.success(text);
  };

  useEffect(() => {
    if (isLogged) {
      getFavourites(db, userId, setFavourites);
      console.log(userId);
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      console.log(favourites);
    }
  }, [favourites, isLogged]);

  return (
    <div>
      <Toaster />
      {!isLogged && <Navigate to="/" replace={true} />}
      <Header />
      <h2 className="text-xl font-bold text-center text-blue-600 dark:text-white mt-8 mb-8 md:mb-16 mt-0 md:mt-8">
        Your favourites
      </h2>

      <p className="text-center">
        Page under development. Your favorites will appear here!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-[24px] items-start md:text-left mx-2 my-8 md:mx-32 md:my-8">
        {favourites.map((favourite, index) => (
          <div className="relative" key={index}>
            <img
              className="w-full opacity-0 animate-fadeIn"
              key={index}
              src={favourite.img_src}
              alt={favourite}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="absolute top-5 right-5 text-white cursor-pointer"
              size="xl"
              onClick={() => handleRemoveFavourites(favourite.img_src)}
            />
          </div>
        ))}
      </div>
      <Footer style="absolute bottom-0 left-0 right-0  bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
