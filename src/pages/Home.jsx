import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex-col mx-auto relative">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
