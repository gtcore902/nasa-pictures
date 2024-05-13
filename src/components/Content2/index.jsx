import { useState, useEffect } from 'react';
import { API_KEY } from '../../API_KEYS';

const Content2 = () => {
  const [datas, setDatas] = useState([]);
  const [pictures, setPictures] = useState([]);

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
  useEffect(() => {
    const picturesArray = [];
    datas.map((data) => picturesArray.push(data.img_src));
    setPictures(picturesArray);
    // setCurrentDescription(datas[currentIndex]?.camera?.name);
  }, [datas]);

  return <div></div>;
};

export default Content2;
