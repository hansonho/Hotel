import { useState, useEffect } from 'react';

// Styles
import styles from '../styles/Banner.module.css';

export default function banner({ room, dotChange }) {
  const [bannerDefault, setBannerDefault] = useState(false);
  const changeBanner = (status) => {
    let prevImg;
    let furtureImg;
    let nextImg;
    const banners = Array.from(document.querySelectorAll(`.${styles.bannerImg}`));
    const active = document.querySelector(`.${styles.active}`);
    const activeIndex = parseInt(active.dataset.index);
    let dotActiveIndex;
    if (status === 'prev') {
      if (activeIndex === 0) {
        dotActiveIndex = banners.length - 1;
        prevImg = banners[banners.length - 1];
        furtureImg = banners[banners.length - 2];
      } else {
        dotActiveIndex = activeIndex - 1;
        prevImg = banners[activeIndex - 1];
        furtureImg = banners[activeIndex - 2 < 0 ? banners.length - 1 : activeIndex - 2];
      }
      prevImg.classList.add(`${styles.active}`);
      prevImg.style.left = '0px';
    } else {
      if (activeIndex === banners.length - 1) {
        dotActiveIndex = 0;
        nextImg = banners[0];
        furtureImg = banners[1];
      } else {
        dotActiveIndex = activeIndex + 1;
        nextImg = banners[activeIndex + 1];
        furtureImg = banners[activeIndex + 2 > banners.length - 1 ? 0 : activeIndex + 2];
      }
      nextImg.classList.add(`${styles.active}`);
      nextImg.style.left = '0px';
    }
    active.style.left = status === 'prev' ? `${active.width}px` : `-${active.width}px`;
    furtureImg.style.left = status === 'prev' ? `-${furtureImg.width}px` : `${furtureImg.width}px`;
    setTimeout(() => {
      active.classList.remove(`${styles.active}`);
    }, 500);
    dotChange(dotActiveIndex);
  }

  useEffect(() => {
    if (!bannerDefault) {
      const banners = Array.from(document.querySelectorAll(`.${styles.bannerImg}`));
      banners.forEach((e, i) => {
        if (i === banners.length - 1) {
          e.style.left = `-${e.width}px`;
        } else if (i === 0) {
          e.style.left = `${0}px`;
        } else {
          e.style.left = `${e.width}px`;
        }
      });
      setBannerDefault(true);
    }
  });
  return (
    <div className={styles.bannerContent}>
      <button className={`${styles.directBtn} ${styles.prevBtn}`} onClick={e => changeBanner('prev')}>
        <img src="/icon/arrow.svg" alt="前一張" />
      </button>
      <div className={styles.bannerArea}>
        {room[0].imageUrl.map((e, i) => {
          if (i === 0) {
            return (
              <img key={i} data-index={i} className={`${styles.bannerImg} ${styles.active}`} src={e} alt={room.name} />
            );
          }
          return (
            <img key={i} data-index={i} className={styles.bannerImg} src={e} alt={room.name} />
          );
        })}
      </div>
      <button className={`${styles.directBtn} ${styles.nextBtn}`} onClick={e => changeBanner('next')}>
        <img src="/icon/arrow.svg" alt="後一張" />
      </button>
    </div>
  );
}