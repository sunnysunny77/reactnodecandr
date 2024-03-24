import React, { useEffect } from "react";

const Preload = (props) => {
    let { imagesPreLoad } = props;
    if (imagesPreLoad) useEffect(() => {
        for (let source of imagesPreLoad) {
            const img = new Image();
            img.src = source;
        }
    }, []);
    return (
        <img
            id="loadFront"
            src="https://candid.s3-ap-southeast-2.amazonaws.com/load.gif"
            alt="loading"
        />
    );
}

export default Preload;
