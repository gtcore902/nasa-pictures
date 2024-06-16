import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDesktop, faRocket } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ style }) => {
  return (
    <div className={style}>
      <p className="my-4">
        Thanks to{' '}
        <a href="https://api.nasa.gov/">
          api.nasa.gov
          <FontAwesomeIcon icon={faRocket} className="mx-2 text-gray-800" />
        </a>
      </p>
      <p className="my-4">
        Made with
        <FontAwesomeIcon icon={faDesktop} className="mx-2 text-gray-800" />
        by <a href="https://gaetantremois.fr"> Gaëtan TREMOIS</a>
      </p>
      <p className="my-4">
        Fork me on{' '}
        <a href="https://github.com/gtcore902/nasa-pictures">
          GitHub
          <FontAwesomeIcon
            icon={faGithub}
            size="lg"
            className="mx-2 text-gray-800"
          />
        </a>
      </p>
    </div>
  );
};

export default Footer;
