import { Context } from '../../Context';
import { useContext, useState, useEffect } from 'react';
import { rovers } from '../Rovers';
import roverPicture from '../../assets/rover-robot.svg';
import { initializeApp } from 'firebase/app';
import { getFavourites } from '../setDocuments';
import CamFilterButtons from '../../components/CamFilterButtons';
import { notify } from '../Notifications';
import { getFirestore } from 'firebase/firestore';
import config from '../../firebase-config';
import Grid from '../Grid';
import { Toaster } from 'react-hot-toast';

const Content = () => {
  const { isLogged, toggleLogin } = useContext(Context);
  const { userId, setUser } = useContext(Context);
  const [favourites, setFavourites] = useState([]);
  const [datas, setDatas] = useState([]);
  const [description, setDescription] = useState({});
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [picturesFirstCol, setPicturesFirstColumn] = useState([]);
  const [picturesSecondCol, setPicturesSecondColumn] = useState([]);
  const [picturesLastCol, setPicturesLastCol] = useState([]);
  const [listCam, setListCam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  const db = getFirestore(app);

  /**
   * Fetch datas from API
   * @param {string} url
   */
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
    filteredDatas.map((data) =>
      picturesArray.push({
        img_src: data.img_src,
        earth_date: data.earth_date,
        camera: data.camera.full_name,
        // id: data.id,
      })
    );
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

  useEffect(() => {
    isLogged && getFavourites(db, userId, setFavourites);
  }, [isLogged, db, userId]);

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
      <Toaster />
      <h3 className="text-lg text-center md:text-left text-gray-800 dark:text-white mx-2 my-8 md:mx-32">
        The {description?.rover?.name} rover, launched on{' '}
        {description?.rover?.launch_date}, landed on Mars on{' '}
        {description?.rover?.landing_date}, and sent, with {listCam.length - 1}{' '}
        cameras, {datas?.length} photos back to Earth on{' '}
        {description?.earth_date} on Martian sol {description?.sol}.
      </h3>

      <CamFilterButtons listCam={listCam} sortCam={sortCam} />

      {isLoading ? (
        <img
          src={roverPicture}
          className="max-w-24 animate-pulse mx-auto"
          alt="Rover illustration"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-[24px] items-start md:text-left mx-2 my-8 md:mx-32 md:my-8">
          <Grid
            datas={datas}
            collection={picturesFirstCol}
            isLogged={isLogged}
            favourites={favourites}
            db={db}
            userId={userId}
            setFavourites={setFavourites}
            notify={notify}
            favouritesPage={false}
          />
          <Grid
            datas={datas}
            collection={picturesSecondCol}
            isLogged={isLogged}
            favourites={favourites}
            db={db}
            userId={userId}
            setFavourites={setFavourites}
            notify={notify}
            favouritesPage={false}
          />
          <Grid
            datas={datas}
            collection={picturesLastCol}
            isLogged={isLogged}
            favourites={favourites}
            db={db}
            userId={userId}
            setFavourites={setFavourites}
            notify={notify}
            favouritesPage={false}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
