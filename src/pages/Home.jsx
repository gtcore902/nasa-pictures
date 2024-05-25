import Header from '../components/Header';
import Content2 from '../components/Content2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
// import styles from '../styles/Footer.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Top menu & up arrow handler
  const targetScroll = 1100;

  const handleScroll = () => {
    if (window.scrollY > targetScroll) {
      setScrollPosition(window.scrollY);
    } else {
      setScrollPosition(0);
    }
  };

  useEffect(() => {
    window.document.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header />
      <Content2 />
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
