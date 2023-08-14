import React, { useState } from "react";
import leftarrow from "public/assets/leftArrow";
import rightarrow from "public/assets/rightarrow.svg";
import styles from "./carousel.module.css"; 
import Image from "next/image";

function Carousel({ activityPictures }) {
  const [indexImage, setIndexImage] = useState(0);

  function backImage() {
    setIndexImage((currentIndex) => {
      return (currentIndex + activityPictures.length - 1) % activityPictures.length;
    });
  }

  function nextImage() {
    setIndexImage((currentIndex) => {
      return (currentIndex + activityPictures.length + 1) % activityPictures.length;
    });
  }

  return (
    <div className={styles.carousel}>
      <Image src={activityPictures[indexImage]} alt="" className={styles.image} />
      {activityPictures.length > 1 && (
        <>
          <Image
            className={styles.leftArrow}
            src={leftarrow}
            alt="Left Arrow"
            onClick={backImage}
          />

          <Image
            className={styles.rightArrow}
            src={rightarrow}
            alt="Right Arrow"
            onClick={nextImage}
          />
          <p className={styles.imageCount}>
            {indexImage + 1}/{activityPictures.length}
          </p>
        </>
      )}
    </div>
  );
}

export default Carousel;
