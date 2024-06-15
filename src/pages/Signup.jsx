import Header from '../components/Header';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <div>
      <Header />
      <SignUpForm />
      <Footer style="md:absolute md:bottom-0 md:left-0 md:right-0 bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Signup;
