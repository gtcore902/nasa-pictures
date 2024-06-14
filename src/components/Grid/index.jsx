import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faHeartCirclePlus,
  faHeart as faHeartSolid,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { handleAddFavourites, handleRemoveFavourites } from '../setDocuments';
import { serverTimestamp } from 'firebase/firestore';

const Grid = ({
  datas,
  collection,
  isLogged,
  favourites,
  db,
  userId,
  setFavourites,
  notify,
  favouritesPage,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        isLoading
          ? 'grid grid-cols-1 gap-2 md:gap-[24px] bg-gray-300 min-h-28 rounded-lg animate-pulse'
          : 'grid grid-cols-1 gap-2 md:gap-[24px] min-h-28'
      }
    >
      {collection.map((picture, index) => (
        <div key={index} className="relative animate-fadeIn opacity-0">
          <img
            className="w-full rounded-lg"
            key={index}
            src={picture.img_src}
            alt={picture.img_src}
          />
          {!isLogged && (
            <FontAwesomeIcon
              icon={faHeartCirclePlus}
              className="absolute top-5 right-5 text-white cursor-pointer md:hover:scale-105 lg:hover:scale-105"
              size="xl"
              onClick={() => navigate('/signin')}
            />
          )}
          {isLogged &&
            (favourites.some(
              (element) => element.img_src === picture.img_src
            ) ? (
              !favouritesPage ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="absolute top-5 right-5 text-white cursor-pointer md:hover:scale-105 lg:hover:scale-105"
                  size="xl"
                  onClick={() =>
                    handleRemoveFavourites(
                      datas,
                      picture,
                      db,
                      userId,
                      favourites,
                      setFavourites,
                      notify
                    )
                  }
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="absolute top-5 right-5 text-white cursor-pointer md:hover:scale-105 lg:hover:scale-105"
                  size="xl"
                  onClick={() =>
                    handleRemoveFavourites(
                      datas,
                      picture,
                      db,
                      userId,
                      favourites,
                      setFavourites,
                      notify
                    )
                  }
                />
              )
            ) : (
              <FontAwesomeIcon
                icon={faHeartRegular}
                className="absolute top-5 right-5 text-white cursor-pointer md:hover:scale-105 lg:hover:scale-105"
                size="xl"
                onClick={() =>
                  handleAddFavourites(
                    datas,
                    picture,
                    db,
                    userId,
                    favourites,
                    setFavourites,
                    notify,
                    serverTimestamp()
                  )
                }
              />
            ))}{' '}
        </div>
      ))}
    </div>
  );
};

export default Grid;
