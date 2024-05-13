import { useState, useEffect } from 'react';
import { API_KEY } from '../../API_KEYS';

const Content2 = () => {
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [picturesFirstCol, setPicturesFirstColumn] = useState([]);
  const [picturesSecondCol, setPicturesSecondColumn] = useState([]);
  const [picturesLastCol, setPicturesLastCol] = useState([]);
  const [listCam, setListCam] = useState([]);

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
        console.log(datas);
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

  /**
   * Dispatch all images for all columns of grid
   */
  useEffect(() => {
    const picturesArray = [];
    setFilteredDatas(datas);
    filteredDatas.map((data) => picturesArray.push(data.img_src));
    setPictures(picturesArray);
    setPicturesFirstColumn(pictures.slice(0, Math.ceil(pictures.length / 3)));
    setPicturesSecondColumn(
      pictures.slice(
        Math.ceil(pictures.length / 3),
        Math.ceil(pictures.length / 3) * 2
      )
    );
    setPicturesLastCol(pictures.slice(Math.ceil(pictures.length / 3) * 2));
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
    <div>
      <p className="text-center">Date : {datas[0]?.earth_date}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2 my-8 md:mx-32 md:my-8 max-w-[1920px]">
        {Array.from(listCam).map((camera, index) => (
          <button
            key={index}
            className="w-auto text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:text-white focus:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            id={camera}
            onClick={(event) => sortCam(event)}
          >
            {camera}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start md:text-left mx-2 my-8 md:mx-32 md:my-8 max-w-[1920px]">
        <div className="grid grid-cols-1 gap-2">
          {picturesFirstCol.map((picture, index) => (
            <div key={index} className="">
              <img className="w-full" key={index} src={picture} alt="" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {picturesSecondCol.map((picture, index) => (
            <div key={index} className="">
              <img className="w-full" key={index} src={picture} alt="" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {picturesLastCol.map((picture, index) => (
            <div key={index} className="">
              <img className="w-full" key={index} src={picture} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content2;
