const CamFilterButtons = ({ listCam, sortCam }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-x-[24px] mx-2 my-8 md:mx-32 md:my-8">
      {Array.from(listCam).map((camera, index) => (
        <button
          key={index}
          className="first-of-type:col-span-2 md:first-of-type:col-span-2 lg:first-of-type:col-auto w-auto text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:text-white focus:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          id={camera}
          onClick={(event) => sortCam(event)}
        >
          {camera}
        </button>
      ))}
    </div>
  );
};

export default CamFilterButtons;
