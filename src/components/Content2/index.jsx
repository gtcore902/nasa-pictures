import { useState, useEffect } from 'react';
import { API_KEY } from '../../API_KEYS';

const Content2 = () => {
  const [datas, setDatas] = useState([]);
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
        // console.log(response);
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
    datas.map((data) => picturesArray.push(data.img_src));
    setPictures(picturesArray);
    setPicturesFirstColumn(pictures.slice(0, Math.ceil(pictures.length / 3)));
    setPicturesSecondColumn(
      pictures.slice(
        Math.ceil(pictures.length / 3),
        Math.ceil(pictures.length / 3) * 2
      )
    );
    setPicturesLastCol(pictures.slice(Math.ceil(pictures.length / 3) * 2));
  }, [datas]);

  /**
   * Set new set for all cameras
   */
  useEffect(() => {
    const camList = new Set();
    datas.filter((data) => camList.add(data?.camera?.name));
    console.log(camList);
  }, [datas]);

  return (
    <div>
      <p className="text-center">Date : {datas[0]?.earth_date}</p>
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
