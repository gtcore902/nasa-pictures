import Header from '../components/Header';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';

const SignIn = () => {
  return (
    <div>
      <Header />
      <SignInForm />
      <Footer style="md:absolute bottom-0 left-0 right-0 bcc-footer p-8 mt-32 border-t border-t-gray-700 text-center" />
    </div>
  );
};

export default SignIn;
