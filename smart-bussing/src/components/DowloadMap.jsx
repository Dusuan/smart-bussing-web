import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import HomeDecor from "../assets/home-decor.svg"

const DowloadMap = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="w-full flex justify-center" style={{ width: "484px", height: "507px" }}>
            {!loaded && (
                <div className="flex items-center justify-center w-full h-full">
                    <CircularProgress sx={{ color: "white" }} />
                </div>
            )}
            <img
                src={HomeDecor}
                alt="Home decoration"
                style={{ width: "484px", height: "507px", display: loaded ? "block" : "none" }}
                className="z-10"
                onLoad={() => setLoaded(true)}
            />
        </div>
    )
}

export default DowloadMap
