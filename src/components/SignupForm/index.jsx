import { Context } from '../../Context';
import { Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { handleChange, handleSubmit } from '../../HandleForms';

const SignUpForm = () => {
  const { isLogged, toggleLogin } = useContext(Context);
  const { userId, setUser } = useContext(Context);
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const auth = getAuth();
  const createUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setErrorMessage('');
        toggleLogin();
        setInputs({});
        setUser(userCredential.user.uid);
        console.log('User created successfully!', user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorCode === 'auth/email-already-in-use' &&
          console.log('Email already in use!');
        setErrorMessage('Email already in use!');
        console.log(errorCode, errorMessage);
      });
  };
  useEffect(() => {
    console.log(isLogged);
  }, []);

  return (
    <div>
      {isLogged && <Navigate to="/" replace={true} />}
      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            setErrorEmail,
            setErrorPassword,
            inputs,
            createUser
          )
        }
        className="max-w-sm mx-auto mb-8"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email{' '}
            {errorEmail !== '' && (
              <span className="text-red-600">{errorEmail}</span>
            )}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email || ''}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@example.com"
            required
            onChange={(event) => handleChange(event, setInputs)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password{' '}
            {errorPassword !== '' && (
              <span className="text-red-600">{errorPassword}</span>
            )}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password || ''}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(event) => handleChange(event, setInputs)}
          />
        </div>
        {/* <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div> */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {errorMessage !== '' && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
