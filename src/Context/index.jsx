import { createContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  const toggleLogin = () => {
    setIsLogged(!isLogged);
  };

  const setUser = (value) => {
    setUserId(value);
  };

  return (
    <Context.Provider value={{ isLogged, toggleLogin, userId, setUser }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
