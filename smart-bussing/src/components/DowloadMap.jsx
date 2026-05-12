import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import HomeDecor from "../assets/home-decor.svg"

const DowloadMap = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-[260px] h-[272px] md:w-[380px] md:h-[398px] lg:w-[484px] lg:h-[507px] flex justify-center">
            {!loaded && (
                <div className="flex items-center justify-center w-full h-full">
                    <CircularProgress sx={{ color: "white" }} />
                </div>
            )}
            <img
                src={HomeDecor}
                alt="Home decoration"
                className="w-full h-full object-contain z-10"
                style={{ display: loaded ? "block" : "none" }}
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default DowloadMap
