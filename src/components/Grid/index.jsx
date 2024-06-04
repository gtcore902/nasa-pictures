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
  collection,
  isLogged,
  favourites,
  db,
  userId,
  setFavourites,
  notify,
  favouritesPage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-[24px]">
      {collection.map((picture, index) => (
        <div key={index} className="relative">
          <img
            className="w-full opacity-0 animate-fadeIn"
            key={index}
            src={picture}
            alt={picture}
          />
          {!isLogged && (
            <FontAwesomeIcon
              icon={faHeartCirclePlus}
              className="absolute top-5 right-5 text-white cursor-pointer"
              size="xl"
              onClick={() => navigate('/signin')}
            />
          )}
          {isLogged &&
            (favourites.some((element) => element.img_src === picture) ? (
              !favouritesPage ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="absolute top-5 right-5 text-white cursor-pointer"
                  size="xl"
                  onClick={() =>
                    handleRemoveFavourites(
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
                  className="absolute top-5 right-5 text-white cursor-pointer"
                  size="xl"
                  onClick={() =>
                    handleRemoveFavourites(
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
                className="absolute top-5 right-5 text-white cursor-pointer"
                size="xl"
                onClick={() =>
                  handleAddFavourites(
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
