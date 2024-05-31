import { Context } from '../Context';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFavourites,
  handleRemoveFavourites,
} from '../components/setDocuments';
import { getFirestore } from 'firebase/firestore';
import config from '../firebase-config';
import emptyFolder from '../assets/empty-folder.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { notify } from '../components/Notifications';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  const { isLogged, toggleLogin } = useContext(Context);
  const { userId, setUser } = useContext(Context);
  const [favourites, setFavourites] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [picturesFirstCol, setPicturesFirstColumn] = useState([]);
  const [picturesSecondCol, setPicturesSecondColumn] = useState([]);
  const [picturesLastCol, setPicturesLastCol] = useState([]);

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

  const columns = [picturesFirstCol, picturesSecondCol, picturesLastCol];

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

  useEffect(() => {
    setFilteredDatas(favourites);
  }, [favourites]);

  useEffect(() => {
    const picturesArray = [];
    filteredDatas.map((data) => picturesArray.push(data.img_src));
    setPicturesFirstColumn(
      picturesArray.slice(0, Math.ceil(picturesArray.length / 3))
    );
    setPicturesSecondColumn(
      picturesArray.slice(
        Math.ceil(picturesArray.length / 3),
        Math.ceil(picturesArray.length / 3) * 2
      )
    );
    setPicturesLastCol(
      picturesArray.slice(Math.ceil(picturesArray.length / 3) * 2)
    );
  }, [filteredDatas]);

  return (
    <div>
      <Toaster />
      {!isLogged && <Navigate to="/" replace={true} />}
      <Header />
      <h2 className="text-xl font-bold text-center text-blue-600 dark:text-white mt-8 mb-8 md:mb-16 mt-0 md:mt-8">
        Your favourites
      </h2>
      <div className="max-w-[1920px] mx-auto pb-48">
        {favourites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-[24px] items-start md:text-left mx-2 mt-8 pb-48 md:mx-32 md:mt-8">
            {columns.map((column) => (
              <Grid
                collection={column}
                isLogged={isLogged}
                favourites={favourites}
                db={db}
                userId={userId}
                setFavourites={setFavourites}
                notify={notify}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img
              className="mx-auto w-3/4 md:w-1/3 pt-12 grayscale"
              src={emptyFolder}
              alt="dossier vide"
            />
          </div>
        )}
      </div>
      <Footer style="absolute bottom-0 left-0 right-0 bcc-footer p-8 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
