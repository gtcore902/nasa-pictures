import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';

const SignIn = () => {
  return (
    <div>
      <Header />
      <SignInForm />
      <Footer style="md:absolute md:bottom-0 md:left-0 md:right-0 bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default SignIn;
