import DownloadSection from "./components/DownloadSection";
import Navbar from "./components/Navbar";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProximamenteForm from "./components/ProximamenteForm_";

function App() {
  return (
    <>
      <div className="h-full scroll-smooth flex flex-col justify-between">
        <div className="sticky top-0 z-100">
          <Navbar />
        </div>
        <div className="flex justify-center min-h-screen bg-gradient-to-b from-[#BAC5B3] to-[#9EBC8A] z-10">
          <DownloadSection />
        </div>
        <div className="bg-gradient-to-b from-[#9EBC8A] to-[#66745d] z-10">
          <div className="flex flex-col justify-center items-center mb-40 pt-10">
            <div id="mobile-register" className="scroll-mt-80 flex flex-col justify-center items-center text-center px-10 text-outline-sm mb-10 text-white text-2xl lg:text-5xl">
              <div id="register"> ¡Regístrate para ser de </div>
              <div>los primeros usuarios en probar la app!</div>
            </div>
            <ProximamenteForm />
          </div>
          <ContactSection />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
