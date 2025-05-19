import React from "react";
import logoApple from "../assets/AppleIcon.svg";
import logoAndroid from "../assets/AndroidIcon.svg";

function DownloadButtons() {
  return (
    <div className="text-center">
      {/*  <div className='pb-2'>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#3B7C5F] hover:bg-[#3b6652] border-[2px] border-white rounded-[20px] my-2 w-full h-[110px] lg:w-[350px] lg:h-[110px] flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300">
                    <img src={logoApple} alt="Apple Store" className="w-[85px] h-[85px]" />
                    </button>
                </a>
            </div>
            <div className='pt-2'>
                <a href="https://play.google.com/store/apps?hl=en_US&pli=1" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#3B7C5F] hover:bg-[#3b6652] border-[2px] border-white rounded-[20px] my-2 w-full h-[110px] lg:w-[350px] lg:h-[110px] flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300">
                    <img src={logoAndroid} alt="Google Play" className="w-[85px] h-[85px]" />
                    </button>
                </a>
            </div>
            */}
      <div className="pb-2">
        <a
          href="#contacto"
        >
          <button className="bg-[#3B7C5F] text-outline-sm  hover:bg-[#3b6652] border-[2px] border-white rounded-[20px] my-2 w-full h-[110px] lg:w-[350px] lg:h-[110px] flex items-center justify-center shadow-lg cursor-pointer transition-colors duration-300">
            Próximamente
          </button>
        </a>
      </div>    
    </div>
  );
}

export default DownloadButtons;
