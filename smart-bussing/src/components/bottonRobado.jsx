import { useState } from "react";

export default function BottonRobado() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 700); 
  };

  return (
    <button
      className="text-xl w-32 h-10 rounded bg-[#3B7C5F] text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
      onClick={handleClick}
    >
      <span
        className={`absolute bg-emerald-600 w-36 h-36 rounded-full -z-10 -left-2 -top-10 origin-center transform transition-all
          ${clicked ? "scale-100 duration-500" : "scale-0 duration-700"} group-hover:scale-100 group-hover:duration-500`}
      ></span>
      <span
        className={`absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full -z-10 origin-center transform transition-all
          ${clicked ? "scale-100 duration-700" : "scale-0 duration-500"} group-hover:scale-100 group-hover:duration-700`}
      ></span>
      Enviar
    </button>
  );
}
