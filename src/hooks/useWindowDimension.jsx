// package imports
import { useEffect, useState } from "react";

function useWindowDimension() {
    // state
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

    // function
    useEffect(() => {
        const handleResize = () => setSize([window.innerHeight, window.innerWidth]);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    return size;
}

export default useWindowDimension;