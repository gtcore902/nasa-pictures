import { Carousel } from '@material-tailwind/react';
// https://www.material-tailwind.com/docs/react/carousel

function Caroussel() {
  const images = [
    {
      original:
        'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/04102/opgs/edr/fcam/FLB_761645828EDR_F1060660FHAZ00302M_.JPG',
      thumbnail:
        'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/04102/opgs/edr/fcam/FLB_761645828EDR_F1060660FHAZ00302M_.JPG',
    },
    {
      original:
        'https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01113/ids/edr/browse/ncam/NLG_1113_0765749334_050ECM_N0512794NCAM00500_00_2I4J01_1200.jpg',
      thumbnail:
        'https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/01113/ids/edr/browse/ncam/NLG_1113_0765749334_050ECM_N0512794NCAM00500_00_2I4J01_1200.jpg',
      originalHeight: '150px',
    },
  ];

  return (
    <div className="flex max-w-96 m-auto mt-16">
      <Carousel
        autoplay
        loop
        transition={{ duration: 0.5 }}
        className="rounded-xl items-center bg-slate-800" // !!!
        children={`<p>test</p>`}
      >
        <img
          src={images[0].original}
          alt={images[0].original}
          className="h-full w-full object-cover"
        />
        <img
          src={images[1].original}
          alt={images[1].original}
          className="h-full w-full object-cover"
        />
        <img
          src={images[0].original}
          alt={images[1].original}
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
}

export default Caroussel;
