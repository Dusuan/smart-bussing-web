import AppDemo from "../assets/AppDemo.png"
import Deco1 from "../assets/MapDecor2.svg"
import Deco2 from "../assets/MapDecor1.svg"

const DowloadMap = () => {
    return (
        <div className="w-full flex justify-center">
            <div  className="relative z-0">
                <img src={Deco1} alt="Decoration 1" className="absolute hidden lg:block left-46 top-10 lg:w-[78%] z-[-10]"/>
                <img src={Deco2} alt="Decoration 2" className="absolute hidden lg:block -left-25 bottom-10 lg:w-[78%] z-[-10]"/>
                <img src={AppDemo} alt="App main screen" className="w-[100%] my-20 lg:my-0 lg:mt-0 lg:w-xs z-10"/>
            </div>
        </div>
    )
}

export default DowloadMap