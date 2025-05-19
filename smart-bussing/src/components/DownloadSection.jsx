import DownloadMap from "../components/DowloadMap";
import DownloadButtons from "./DownloadButtons";

const DownloadSection = () => {
  return (
    <div className="font-bold text-outline text-3xl px-6 mt-40 lg:mx-40 lg:px-25 flex-col lg:flex lg:flex-row">
      <div id="download"  className="">
        <div className="text-center lg:text-left text-outline-bold text-5xl lg:text-7xl pb-4">
          Más rutas, <br />
          menos dudas
        </div>
        <div id="mobile-download" className="text-center text-outline-sm lg:text-left py-4 text-2xl lg:text-2xl">
          Encuentra el mejor camino en segundos <br />y viaja sin
          complicaciones.
        </div>
        <div  className="text-center lg:text-left text-outline-white-sm text-2xl lg:text-5xl text-[#3B7C5F] py-4 ">
          Descarga la App:
        </div>
        <div  className="">
          {/*Cambiar tamaño para responsive*/}
          <DownloadButtons />
        </div>
      </div>
      {/* Cambiar tamaño para repsponsive      */}

      <div className="lg:mx-20 flex lg:block">
        <DownloadMap />
      </div>
    </div>
  );
};

export default DownloadSection;
