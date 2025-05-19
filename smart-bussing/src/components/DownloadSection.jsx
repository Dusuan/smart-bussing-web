import DownloadMap from "../components/DowloadMap";
import DownloadButtons from "./DownloadButtons";

const DownloadSection = () => {
  return (
    <div className="font-bold text-outline text-3xl px-10 mt-40 lg:mx-40 lg:px-25 flex-col lg:flex lg:flex-row">
      <div className="">
        <div className="text-outline-bold text-6xl lg:text-7xl pb-4">
          Más rutas, <br />
          menos dudas
        </div>
        <div className="py-4 text-2xl lg:text-2xl">
          Encuentra el mejor camino en segundos <br />y viaja sin
          complicaciones.
        </div>
        <div className="text-outline-white text-2xl lg:text-5xl text-[#3B7C5F] py-4 ">
          Descarga la App:
        </div>
        <div className="">
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
