import DownloadMap from "../components/DowloadMap";
import DownloadButtons from "./DownloadButtons";

const DownloadSection = () => {
  return (
    <div className="font-bold text-[#5F93A2] px-10 lg:mx-10 lg:px-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left">
      <div id="download">
        <div className="text-[32px] lg:text-[45px] pb-4">
          ¡Más rutas, <br className="hidden lg:block" />
          menos dudas!
        </div>
        <div id="mobile-download" className="text-[16px] lg:text-[20px] text-[#4B4B4B] py-4 font-semibold pb-9">
          Encuentra el mejor camino en segundos y<br className="hidden lg:inline" /> viaja sin complicaciones.
        </div>
        <div className="text-[26px] lg:text-[35px] py-4">
          Descarga la App:
        </div>
        <div>
          <DownloadButtons />
        </div>
      </div>

      <div className="lg:ml-60 flex lg:block shrink-0 mt-8 lg:mt-0">
        <DownloadMap />
      </div>
    </div>
  );
};

export default DownloadSection;
