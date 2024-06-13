import { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import config from '../firebase-config';

const Context = createContext();

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Provider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        user.getIdToken().then((token) => {
          setAccessToken(token);
          localStorage.setItem('token', token);
          setIsLogged(true);
        });
      } else {
        setUserId(null);
        setAccessToken(null);
        localStorage.removeItem('token');
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const toggleLogin = () => {
    setIsLogged(!isLogged);
  };

  const setUser = (value) => {
    setUserId(value);
  };

  const addFavourite = (value) => {
    setFavourites(...favourites, value);
  };

  return (
    <Context.Provider
      value={{
        isLogged,
        toggleLogin,
        userId,
        setUser,
        favourites,
        addFavourite,
        accessToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
