import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'

import house1 from '../public/img/house/house1.jpeg';
import house2 from '../public/img/house/house2.jpeg';
import house3 from '../public/img/house/house3.jpeg';
import house4 from '../public/img/house/house4.jpeg';

import { fetchDataByGet } from '../lib/fetch';

function showRoomName(target) {
  const roompicActive = document.querySelector(`.${styles.roompic}.${styles.active}`);
  const roomTypeActive = document.querySelector(`.${styles.roomtype}.${styles.active}`);
  if (roompicActive) {
    roompicActive.classList.remove(`${styles.active}`);
  }
  if (roomTypeActive) {
    roomTypeActive.classList.remove(`${styles.active}`);
  }
  target.classList.add(`${styles.active}`);
}

function dotActiveChange(nowActive, newActive) {
  if (parseInt(nowActive.dataset.index, 10) === parseInt(newActive.dataset.index, 10)) {
    return false;
  }
  else {
    return true;
  }
}

function changeBackgroundBanner(target) {
  const nowActive = document.querySelector(`.${styles.dot}.${styles.active}`);
  const change = dotActiveChange(nowActive, target);
  if (change) {
    target.classList.add(`${styles.active}`);
    nowActive.classList.remove(`${styles.active}`);
  }
  switch (parseInt(target.dataset.index, 10)) {
    case 1:
      document.querySelector(`.${styles.home}`).style.backgroundImage = `url('${house1}')`;
      break;
    case 2:
      document.querySelector(`.${styles.home}`).style.backgroundImage = `url('${house2}')`;
      break;
    case 3:
      document.querySelector(`.${styles.home}`).style.backgroundImage = `url('${house3}')`;
      break;
    default:
      document.querySelector(`.${styles.home}`).style.backgroundImage = `url('${house4}')`;
      break;
  }
}

export async function getStaticProps(context) {
  const rooms = await fetchDataByGet('get');
  return {
    props: {
      rooms,
    },
  }
}

export default function Home({ rooms }) {
  const houseImg = [
    {
      index: 1,
      alt: 'house1',
      src: house1,
    },
    {
      index: 2,
      alt: 'house2',
      src: house2,
    },
    {
      index: 3,
      alt: 'house3',
      src: house3,
    },
    {
      index: 4,
      alt: 'house4',
      src: house4,
    }
  ];
  function doubleClick(target, id) {
    if (target.dataset.dclick === 'false') {
      target.dataset.dclick = true;
      const roomsList = Array.from(document.querySelectorAll(`.${styles.roompic}`));
      roomsList.forEach(e => {
        if (e.dataset.id !== target.dataset.id) {
          e.dataset.dclick = false;
        }
      })
    } else {
      window.location.href = `/roomtype/${id}`;
    }
  }
  useEffect(() => {
    document.querySelector(`.${styles.home}`).style.backgroundImage = `url('${house1}')`;
    const dotList = Array.from(document.querySelectorAll(`.${styles.dot}`));
    let changeBackgroundBannerInterval = setInterval(e => {
      const activeDotIndex = document.querySelector(`.${styles.dot}.${styles.active}`).dataset.index;
      const nextActiveDot = dotList.find(e => {
        if (parseInt(activeDotIndex, 10) === 4) {
          return parseInt(e.dataset.index, 10) === 1;
        }
        return parseInt(e.dataset.index, 10) === parseInt(activeDotIndex, 10) + 1;
      })
      changeBackgroundBanner(nextActiveDot);
    }, 5000);
    return () => clearInterval(changeBackgroundBannerInterval);
  });
  return (
    <div className={styles.home}>
      <Head>
        <title>好室旅店</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.info}>
        <section className={`${styles.content} ${styles.hotel}`}>
          <div className={styles.icon}>
            <img src="/img/icon.png" alt="好室旅店" />
            <div className={styles.bannerDot}>
              {houseImg.map(e => {
                if (e.index === 1) {
                  return (
                    <span key={e.index} className={`${styles.dot} ${styles.active}`} data-index={e.index} onClick={e => changeBackgroundBanner(e.target)}></span>
                  );
                }
                return (
                  <span key={e.index} className={`${styles.dot}`} data-index={e.index} onClick={e => changeBackgroundBanner(e.target)}></span>
                );
              })}
            </div>
          </div>
          <div className={styles.connection}>
            <h1>好室旅店。HOUSE HOTEL</h1>
            <span>花蓮縣花蓮市國聯一路1號</span>
            <span>03-8321155</span>
            <span>HOUSE@HOTEL.COM</span>
          </div>
        </section>
        <section className={`${styles.content} ${styles.room}`}>
          <h1>房間資料</h1>
          {rooms.items.map((e, i) => {
            return (
              <div key={i} className={`${styles.roompic}`} data-id={e.id} data-dclick={false} onClick={element => { showRoomName(element.currentTarget); doubleClick(element.currentTarget, e.id) }}>
                <h2 className={styles.roomtype}>{e.name}</h2>
                <img src={e.imageUrl} alt={e.name} />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  )
}
