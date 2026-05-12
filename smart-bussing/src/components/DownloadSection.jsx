import DownloadMap from "../components/DowloadMap";
import DownloadButtons from "./DownloadButtons";

const DownloadSection = () => {
  return (
    <div className="font-bold text-[#5F93A2] text-3xl px-10 lg:mx-10 lg:px-10 flex-col lg:flex lg:flex-row lg:items-center">
      <div id="download">
        <div style={{ fontSize: "45px" }} className="pb-4">
          ¡Más rutas, <br />
          menos dudas!
        </div>
        <div id="mobile-download" style={{ fontSize: "20px", color: "#4B4B4B" }} className="py-4 font-semibold pb-9">
          Encuentra el mejor camino en segundos y <br /> viaja sin
          complicaciones.
        </div>
        <div style={{ fontSize: "35px" }} className="py-4">
          Descarga la App:
        </div>
        <div>
          <DownloadButtons />
        </div>
      </div>

      <div className="lg:ml-60 flex lg:block shrink-0">
        <DownloadMap />
      </div>
    </div>
  );
};

export default DownloadSection;
