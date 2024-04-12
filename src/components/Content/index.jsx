import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { API_KEY } from '../../API_KEYS';
import './Content.css';

const Content = () => {
  const [datas, setDatas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [currentPicture, setCurrentPicture] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const rovers = {
    perseverance: {
      name: 'perseverance',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?&api_key=${API_KEY}`,
    },
    curiosity: 'curiosity',
  };

  /**
   * Set previous slides functions
   */
  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  /**
   * Set next slides functions
   */
  const goToNextSlide = () => {
    if (currentIndex < pictures.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
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
   * Set pictures & current camera when datas is loaded
   */
  useEffect(() => {
    const picturesArray = [];
    datas.map((data) => picturesArray.push(data.img_src));
    setPictures(picturesArray);
    setCurrentDescription(datas[currentIndex]?.camera?.name);
  }, [datas, currentIndex]);

  /**
   * Set current picture & current camera when currentIndex is updated
   */
  useEffect(() => {
    setCurrentPicture(pictures[currentIndex]);
    setCurrentDescription(datas[currentIndex]?.camera?.name);
  }, [datas, pictures, currentIndex]);

  return (
    <div className="mb-8">
      <div className="w-3/4 max-w-5xl h-auto my-8 mx-auto truncate relative rounded box-custom">
        <div
          className="flex transition-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {datas.map((data, index) => (
            <img
              className="flex-custom w-full text-center"
              src={data.img_src}
              key={index}
              alt=""
            />
          ))}
        </div>
        {currentIndex !== 0 && (
          <button
            className="absolute top-0 left-0 bottom-0 py-0 px-3 "
            onClick={goToPrevSlide}
          >
            <div className="flex justify-center items-center p-6 w-14 h-14 rounded-full bg-gray-50/50">
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </div>
          </button>
        )}
        {currentIndex !== pictures.length - 1 && (
          <button
            className="absolute top-0 right-0 bottom-0 py-0 px-3 "
            onClick={goToNextSlide}
          >
            <div className="flex justify-center items-center p-6 w-14 h-14 rounded-full bg-gray-50/50">
              <FontAwesomeIcon icon={faChevronRight} size="2xl" />
            </div>
          </button>
        )}
      </div>
      <p className="w-3/4 max-w-5xl mx-auto text-center text-2xl font-extrabold dark:text-white">
        Caméra {currentDescription}
      </p>
      <p className="w-3/4 max-w-5xl mx-auto text-center flex justify-between text-2xl font-extrabold dark:text-white">
        <span>Date : {datas[0]?.earth_date} </span>
        <span>
          {currentIndex + 1} / {pictures.length}
        </span>
      </p>
    </div>
  );
};

export default Content;
