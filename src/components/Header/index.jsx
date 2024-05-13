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
    <div className="text-center md:text-left mx-2 my-8 md:mx-32 md:my-8">
      <div className="flex flex-col lg:flex-row justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Last pictures from Mars
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Link to="/signup">
            <button
              type="button"
              className="text-white w-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Signup
            </button>
          </Link>
          <Link to="/signin ">
            <button
              type="button"
              className="text-white w-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Signin
            </button>
          </Link>
          <Link>
            <button
              onClick={logout}
              type="button"
              className="text-white w-40 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-4xl font-extrabold dark:text-white my-16">
        Latest photos sent from the Perseverance rover on Mars
      </h2>
    </div>
  );
};

export default Header;
