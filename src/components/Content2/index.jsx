import { Context } from '../../Context';
import { useContext, useState, useEffect } from 'react';
import { API_KEY } from '../../API_KEYS';
import roverPicture from '../../assets/rover-robot.svg';

const Content2 = () => {
  const { isLogged, toggleLogin } = useContext(Context);
  const { userId, setUser } = useContext(Context);

  const [datas, setDatas] = useState([]);
  const [description, setDescription] = useState({});
  const [filteredDatas, setFilteredDatas] = useState([]);
  // const [pictures, setPictures] = useState([]);
  const [picturesFirstCol, setPicturesFirstColumn] = useState([]);
  const [picturesSecondCol, setPicturesSecondColumn] = useState([]);
  const [picturesLastCol, setPicturesLastCol] = useState([]);
  const [listCam, setListCam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const rovers = {
    perseverance: {
      name: 'perseverance',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?&api_key=${API_KEY}`,
    },
    curiosity: 'curiosity',
  };

  const fetchDatas = async (url) => {
    try {
      const response = await fetch(url);
      let datas = await response.json();
      console.log();
      if (response.status === 200) {
        setDatas(datas.latest_photos);
        console.log(datas);
        setIsLoading(false);
      }
      if (response.status !== 200) {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Launch fetch request
   */
  useEffect(() => {
    fetchDatas(`${rovers.perseverance.url}`);
  }, []);

  useEffect(() => {
    setFilteredDatas(datas);
    setDescription(datas[0]);
  }, [datas]);
  /**
   * Dispatch all images for all columns of grid
   */
  useEffect(() => {
    const picturesArray = [];
    filteredDatas.map((data) => picturesArray.push(data.img_src));
    // setPictures(picturesArray);
    setPicturesFirstColumn(
      picturesArray.slice(0, Math.ceil(picturesArray.length / 3))
    );
    setPicturesSecondColumn(
      picturesArray.slice(
        Math.ceil(picturesArray.length / 3),
        Math.ceil(picturesArray.length / 3) * 2
      )
    );
    setPicturesLastCol(
      picturesArray.slice(Math.ceil(picturesArray.length / 3) * 2)
    );
  }, [datas, filteredDatas]);

  /**
   * Set new set for all cameras
   */
  useEffect(() => {
    const camList = new Set();
    datas.filter((data) => camList.add(data?.camera?.full_name));
    setListCam(['All'].concat(...camList));
  }, [datas]);

  const sortCam = (event) => {
    if (event.target.id === 'All') {
      setFilteredDatas(datas.filter((data) => data));
    } else if (event.target.id !== 'All') {
      setFilteredDatas(
        datas.filter((data) => data.camera?.full_name === event.target.id)
      );
    }
  };

  return (
    <div className="max-w-[1920px] mx-auto pb-48">
      <h3 className="text-lg text-center md:text-left text-gray-800 dark:text-white mx-2 my-8 md:mx-32">
        The {description?.rover?.name} rover, launched on{' '}
        {description?.rover?.launch_date}, landed on Mars on{' '}
        {description?.rover?.landing_date}, and sent, with {listCam.length - 1}{' '}
        cameras, {datas?.length} photos back to Earth on{' '}
        {description?.earth_date} on Martian sol {description?.sol}.
      </h3>
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
      {isLoading ? (
        <img
          src={roverPicture}
          className="max-w-24 animate-pulse mx-auto"
          alt="Rover illustration"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-[24px] items-start md:text-left mx-2 my-8 md:mx-32 md:my-8">
          <div className="grid grid-cols-1 gap-2 md:gap-[24px]">
            {picturesFirstCol.map((picture, index) => (
              <div key={index} className="">
                <img
                  className="w-full opacity-0 animate-fadeIn"
                  key={index}
                  src={picture}
                  alt={picture}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-[24px]">
            {picturesSecondCol.map((picture, index) => (
              <div key={index} className="">
                <img
                  className="w-full opacity-0 animate-fadeIn"
                  key={index}
                  src={picture}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-[24px]">
            {picturesLastCol.map((picture, index) => (
              <div key={index} className="">
                <img
                  className="w-full opacity-0 animate-fadeIn"
                  key={index}
                  src={picture}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content2;
