import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

// Components
import Calendar from '../../components/calendar';
import RoomService from '../../components/roomservice';
import Banner from '../../components/banner';
import Booking from '../../components/booking';
import BookingInfo from '../../components/bookInfo';

// Styles
import styles from '../../styles/Room.module.css';
import BookingStyles from '../../styles/Booking.module.css';

// lib
import { fetchDataByGet } from '../../lib/fetch';

export async function getServerSideProps(context) {
  const room = await fetchDataByGet('get', context.query.id);
  return {
    props: {
      room: room.room,
    },
  }
}

export default function Room({ room }) {
  const roomPrice = {
    normalDayPrice: room[0].normalDayPrice,
    holidayPrice: room[0].holidayPrice
  };
  const [now, setNow] = useState(new Date());
  const [nightNumber, setNightNumber] = useState(1);
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [money, setMoney] = (now.getDay() === 6 || now.getDay() === 7) ? useState(roomPrice.holidayPrice) : useState(roomPrice.normalDayPrice);
  const roomDescrip = room[0].description.split('.');
  roomDescrip.pop();
  const [submit, setSubmit] = useState(false);
  const dotChange = (dotActiveIndex) => {
    const dots = Array.from(document.querySelector(`.${styles.dot}`).querySelectorAll(`.${styles.item}`));
    dots.forEach((e, i) => {
      e.classList.remove(`${styles.active}`);
      if (i === dotActiveIndex) {
        e.classList.add(`${styles.active}`);
      }
    });
  }
  const bookingOpen = () => {
    document.querySelector(`.${BookingStyles.booking}`).classList.add(`${BookingStyles.active}`);
    document.getElementsByTagName('body')[0].classList.add('fixed');
  }
  return (
    <div className={styles.room}>
      <Head>
        <title>好室旅店</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.banner}>
        <Banner room={room} dotChange={dotChange} />
        <div className={styles.seeOtherPage}>
          <Link href="/">
            <a>查看其他房型</a>
          </Link>
        </div>
        <div className={styles.bookInfo}>
          {<p>${money} / <span>{nightNumber}晚</span></p>}
          <button className={styles.bookingBtn} onClick={() => bookingOpen()}>Booking now</button>
          <div className={styles.dot}>
            {room[0].imageUrl.map((e, i) => {
              if (i === 0) {
                return (
                  <span key={i} className={`${styles.item} ${styles.active}`}></span>
                );
              }
              return (
                <span key={i} className={styles.item}></span>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.info}>
        <header>
          <h1>{room[0].name}</h1>
          <span>{room[0].descriptionShort.GuestMin}~{room[0].descriptionShort.GuestMax}人・{room[0].descriptionShort.Bed[0]}{room[0].descriptionShort.Bed.length}張・附早餐・衛浴{room[0].descriptionShort['Private-Bath']}間・{room[0].descriptionShort.Footage}平方公尺</span>
        </header>
        <div className={styles.detailInfo}>
          <span className={styles.price}>平日（一～四）價格：{room[0].normalDayPrice}</span>
          <span className={styles.price}>假日（五〜日）價格：{room[0].holidayPrice}</span>
          <span className={styles.roomTime}>入住時間：{room[0].checkInAndOut.checkInEarly}（最早）/ {room[0].checkInAndOut.checkInLate}（最晚）</span>
          <span className={styles.roomTime}>退房時間：{room[0].checkInAndOut.checkOut}</span>
          <ul>
            {roomDescrip.map((e, i) => {
              return (
                <li key={i}>{`${e.trim()}.`}</li>
              );
            })}
          </ul>
          <div className={styles.roomEquip}>
            <RoomService service={room[0].amenities} />
          </div>
          <Calendar setNightNumber={setNightNumber} setMoney={setMoney} roomprice={roomPrice} firstDate={firstDate} setFirstDate={setFirstDate} lastDate={lastDate} setLastDate={setLastDate} />
        </div>
      </section>
      <Booking service={room[0].amenities} firstDate={firstDate} lastDate={lastDate} roomPrice={roomPrice} checkInInfo={room[0].checkInAndOut} descriptionShort={room[0].descriptionShort} setSubmit={setSubmit} />
      {submit ? <BookingInfo status={submit} setSubmit={setSubmit} /> : null}
    </div>
  );
} 