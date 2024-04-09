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

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentPicture(pictures[currentIndex]);
      setCurrentDescription(datas[currentIndex].camera.name);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex < pictures.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPicture(pictures[currentIndex]);
      setCurrentDescription(datas[currentIndex].camera.name);
    }
  };

  const fetchDatas = async (url) => {
    try {
      const response = await fetch(url);
      let datas = await response.json();
      setDatas(datas.latest_photos);

      console.log(datas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatas(`${rovers.perseverance.url}`);
  }, []);

  useEffect(() => {
    const picturesArray = [];
    datas.map((data) => picturesArray.push(data.img_src));
    setPictures(picturesArray);
    setCurrentDescription(datas[currentIndex]?.camera?.name);
  }, [datas]);

  return (
    <div className="">
      <div className="w-1/2 max-w-1200px my-0 mx-auto truncate relative rounded box-custom">
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
      <p className="text-center">{currentDescription}</p>
    </div>
  );
};

export default Content;
