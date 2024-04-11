const Header = () => {
  return (
    <div className="mx-32 my-8">
      <div className="flex justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Last pictures from Mars
        </h1>
        <div className="flex items-center">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            S'inscrire
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </div>
      </div>
      <h2 className="text-4xl font-extrabold dark:text-white my-16">
        Latest photos sent from the Perseverance rover on Mars
      </h2>
    </div>
  );
};

export default Header;
