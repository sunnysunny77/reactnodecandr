import React, { useEffect, useState } from "react";


const Preload = (props) => {
    let { imagesPreLoad } = props;
    useEffect(() => {
        for (let source of imagesPreLoad[window.location.pathname]) {
            const img = new Image();
            img.src = source;
        }
    }, [imagesPreLoad[window.location.pathname]]);
}

export default Preload;
