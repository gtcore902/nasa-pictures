import Header from '../components/Header';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <div>
      <Header />
      <SignUpForm />
      <Footer style="absolute bottom-0 left-0 right-0 bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default Signup;
