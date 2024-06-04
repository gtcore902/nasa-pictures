import Header from '../components/Header';
import Content from '../components/Content';
import { Context } from '../Context';
// import { initializeApp } from 'firebase/app';
// import { getFavourites } from '../components/setDocuments';
// import { getFirestore, serverTimestamp } from 'firebase/firestore';
// import config from '../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
// import styles from '../styles/Footer.module.css';
import { useContext, useEffect, useState } from 'react';
import { targetScroll, handleScroll } from '../HandleScroll';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { favourites, addFavourites } = useContext(Context);

  useEffect(() => {
    const onScroll = () => handleScroll(setScrollPosition);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      <Header />
      <Content />
      <FontAwesomeIcon
        icon={faArrowUp}
        className={
          scrollPosition > targetScroll
            ? 'fixed bottom-4 right-4 z-40 text-black-600 md:right-48 hover:cursor-pointer'
            : 'hidden text-black-600'
        }
        onClick={() => window.scrollTo(0, 0)}
        size="2xl"
      />
      <Footer style="absolute bottom-0 left-0 right-0 bcc-footer p-8 border-t border-t-gray-700 text-center" />
      {/* <Footer className={styles.footer} /> */}
    </div>
  );
};

export default Home;
