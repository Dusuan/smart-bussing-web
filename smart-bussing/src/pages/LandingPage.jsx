import DownloadSection from "../components/DownloadSection";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ProximamenteForm from "../components/ProximamenteForm_";
import BusFooter from "../assets/bus-footer.svg";

export default function LandingPage() {
  return (
    <>
      <div className="h-full scroll-smooth flex flex-col justify-between">
        <div className="sticky top-0 z-100">
          <Navbar />
        </div>
        <div className="flex justify-center items-start min-h-screen bg-[#EEFEFF] z-10 pt-32">
          <DownloadSection />
        </div>
        <div className="bg-[#EEFEFF] z-10">
          <div className="flex flex-col justify-center items-center mb-40">
            <div id="mobile-register" className="scroll-mt-50 flex flex-col justify-center items-center mb-10 text-[#5F93A2] text-2xl lg:text-5xl">
              <div id="register"> ¡Regístrate para ser de </div>
              <div>los primeros usuarios en probar la app!</div>
            </div>
            <ProximamenteForm />
          </div>
          <ContactSection />
        </div>
        <div className="bg-[#EEFEFF]">
          <img src={BusFooter} alt="Bus" className="w-full" />
          <Footer />
        </div>
      </div>
    </>
  );
}
