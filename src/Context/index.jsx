import { createContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const toggleLogin = () => {
    setIsLogged(!isLogged);
  };

  return (
    <Context.Provider value={{ isLogged, toggleLogin }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
