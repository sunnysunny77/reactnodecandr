import React, { useEffect, useState } from "react";

const Preload = (props) => {
    const [imagesPreLoad, setImagesPreLoad] = useState(
        {
            "/": [
                "https://candid.s3-ap-southeast-2.amazonaws.com/card1.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/card2.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/card3.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/card4.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/card5.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/card6.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v1.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v2.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v3.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v4.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v5.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/v6.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/wel1.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/wel1m.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/wel2.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/wel2m.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/welcome.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/info.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/info1.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
            ],
            "/about": [
                "https://candid.s3-ap-southeast-2.amazonaws.com/about.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/breakp.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
            ],
            "/gallery": [
                "https://candid.s3-ap-southeast-2.amazonaws.com/c1.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/c2.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/c3.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/c4.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
            ],
            "/contact": [
                "https://candid.s3-ap-southeast-2.amazonaws.com/cont.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
            ],
            "/blog": [
                "https://candid.s3-ap-southeast-2.amazonaws.com/ikon.jpg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/svg0.svg",
                "https://candid.s3-ap-southeast-2.amazonaws.com/foot.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logolarge.png",
                "https://candid.s3-ap-southeast-2.amazonaws.com/logos.png",
            ],
        }
    );
    useEffect(() => {
        for (let source of imagesPreLoad[window.location.pathname]) {
            const img = new Image();
            img.src = source;
            console.log(img)
        }
    }, [imagesPreLoad[window.location.pathname]]);
}

export default Preload;
