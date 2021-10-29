import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    // relative -> we want somthing absolutely positioning inside of this container
    <div className="relative">
      <div className="absolute w-full h-32  bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {/* Lazy loading is the technique of rendering only-needed or critical user interface 
        items first, then quietly unrolling the non-critical items later.

        lazy loading -> slow down the user experience
         */}

        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" alt="" />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/Gateway/Zeitgeist/Mar20/Covid19/2021/IN_GWD_Covid19_CustomerMsg_MH_ENG_1x_v1._CB669806110_.jpg"
            alt="carosule-1"
          />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Fresh/GW/May21/Covid_Slot/GW_1500x600_Pantry._CB669786696_.jpg"
            alt="carosule-2"
          />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" alt="" />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/May/M17/non-reg/1500x600_Hero-Tall_JPN._CB668432235_.jpg"
            alt="carosule-3"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/Auto/PSS/Personal-Safety_1500x600._CB668022827_.jpg"
            alt="carosule-4"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
