import { Context } from '../Context';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
// import { collection, getDocs } from 'firebase/firestore';
import { getFavourites } from '../components/setDocuments';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import config from '../firebase-config';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
  // const picturesRef = collection(db, 'GCNPLkhu8wh9MWmzuym1PTPMVAF2');

  useEffect(() => {
    getFavourites(db, userId, setFavourites);
    console.log(userId);
  }, []);

  useEffect(() => {
    console.log(favourites);
  }, [favourites]);

  return (
    <div>
      {!isLogged && <Navigate to="/" replace={true} />}
      <Header />
      <p className="text-center">Favourites comes here ...</p>
      <Footer style="absolute bottom-0 left-0 right-0  bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
