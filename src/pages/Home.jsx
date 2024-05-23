import Header from '../components/Header';
import Content2 from '../components/Content2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { useState } from 'react';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Top menu & up arrow handler
  window.document.addEventListener('scroll', () => handleScroll());
  const targetScroll = 500;
  const handleScroll = () => {
    if (window.scrollY > targetScroll) {
      setScrollPosition(window.scrollY);
    } else {
      setScrollPosition(0);
    }
  };

  return (
    <div>
      <Header />
      <Content2 />
      <FontAwesomeIcon
        icon={faArrowUp}
        className={
          scrollPosition > targetScroll
            ? 'fixed bottom-4 right-4 z-40 text-gray-800 md:right-48 hover:cursor-pointer'
            : 'none'
        }
        onClick={() => window.scrollTo(0, 0)}
        size="2xl"
      />
      <Footer style="absolute bottom-0 left-0 right-0 bcc-footer p-8 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
