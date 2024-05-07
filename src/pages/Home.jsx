import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer style="bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Home;
