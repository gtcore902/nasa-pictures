// Top menu & up arrow handler
const targetScroll = 1100;
const handleScroll = (callback) => {
  if (window.scrollY > targetScroll) {
    callback(window.scrollY);
  } else {
    callback(0);
  }
};

export { targetScroll, handleScroll };
