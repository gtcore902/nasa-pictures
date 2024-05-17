import { Context } from '../Context';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const { isLogged, toggleLogin } = useContext(Context);

  return (
    <div>
      {!isLogged && <Navigate to="/" replace={true} />}
      <Header />
      <p>Favourites comes here ...</p>
      <Footer style="bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
