import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

import { getAuth, signOut } from 'firebase/auth';
import config from '../../firebase-config';

const Header = () => {
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

  const auth = getAuth();
  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
      })
      .catch((error) => {
        console.log('An error happened');
      });
  };
  return (
    <div className="text-center md:text-left mx-2 my-8 md:mx-32 md:my-8 lg:mx-32">
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Last pictures from Mars
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link
            to="/signup"
            className="block px-5 py-2.5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            SignUp
          </Link>
          <Link
            to="/signin"
            className="block px-5 py-2.5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            SignIn
          </Link>
          <Link
            className="block px-5 py-2.5 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={logout}
          >
            Logout
          </Link>
        </div>
      </div>
      <h2 className="text-4xl font-extrabold dark:text-white mt-8 mb-16">
        Latest photos sent from the Perseverance rover on Mars
      </h2>
    </div>
  );
};

export default Header;
