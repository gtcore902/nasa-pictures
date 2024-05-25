import { createContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favourites, setFavourites] = useState([]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
