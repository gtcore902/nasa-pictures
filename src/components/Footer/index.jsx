const Footer = ({ style }) => {
  return (
    <div className={style}>
      <p>
        Thanks to <a href="https://api.nasa.gov/">api.nasa.gov</a>
      </p>
      <p>
        Made with 💻 by{' '}
        <a href="https://gaetantremois.fr"> Gaëtan TREMOIS 🚀</a>
      </p>
    </div>
  );
};

export default Footer;
