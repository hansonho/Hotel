import { useState, useEffect } from 'react';

import styles from '../styles/Booking.module.css';

import breakFast from '../public/icon/Breakfast.svg';
import miniBar from '../public/icon/Mini-Bar.svg';
import roomService from '../public/icon/Room-Service.svg';
import wifi from '../public/icon/Wi-Fi.svg';
import forChild from '../public/icon/Child-Friendly.svg';
import phone from '../public/icon/Television.svg';
import goodView from '../public/icon/Great-View.svg';
import refrigerater from '../public/icon/Refrigerator.svg';
import sofa from '../public/icon/Sofa.svg';
import forPet from '../public/icon/Pet-Friendly.svg';
import noSmoke from '../public/icon/Smoke-Free.svg';
import airCondition from '../public/icon/Air-Conditioner.svg';
import first from '../public/icon/submit.svg';
import second from '../public/icon/check.svg';
import third from '../public/icon/finish.svg';
import arrow from '../public/icon/arrow.svg';

function Calendar({ openCalendar, rows, setRows, id, setOpen, setDate }) {
  const now = new Date().getTime();
  const afterNinety = new Date().setDate(new Date().getDate() + 90);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dateData, setDateData] = useState([]);
  const monthMapEng = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'Septemper',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const createOtherDdate = (type, date, weekData) => {
    let newMonth;
    let newYear = year;
    let over = true;
    if (type === 'before') {
      if (month - 1 === 0) {
        newMonth = 12;
        newYear -= 1;
      } else {
        newMonth = month - 1
      }
      let newMonthDays = new Date(newYear, newMonth, 0).getDate();
      for (let j = date - 1; j >= 0; j -= 1) {
        const newMonthDate = new Date(newYear, newMonth - 1, newMonthDays - j);
        if (newMonthDate.getTime() < now || newMonthDate.getTime() > afterNinety) {
          over = true;
        } else {
          over = false;
        }
        weekData.push({
          note: 'before',
          over: over,
          weekDay: newMonthDate.getDay(),
          monthDate: newMonthDate.getDate(),
        });
      }
    } else {
      if (month + 1 === 13) {
        newMonth = 1;
        newYear += 1;
      } else {
        newMonth = month + 1
      }
      let i = 1;
      for (let j = date + 1; j <= 6; j += 1) {
        const newMonthDate = new Date(newYear, newMonth - 1, i);
        i += 1;
        if (newMonthDate.getTime() < now || newMonthDate.getTime() > afterNinety) {
          over = true;
        } else {
          over = false;
        }
        weekData.push({
          note: 'after',
          over: over,
          weekDay: newMonthDate.getDay(),
          monthDate: newMonthDate.getDate(),
        });
      }
    }
  }
  const choose = (element, id) => {
    const year = element.target.dataset.year;
    const month = parseInt(element.target.dataset.month) < 10 ? `0${element.target.dataset.month}` : element.target.dataset.month;
    const date = parseInt(element.target.dataset.date) < 10 ? `0${element.target.dataset.date}` : element.target.dataset.date;
    const chooseElement = document.querySelector(`#${id} .${styles.dateChoose}`);
    if (chooseElement) {
      chooseElement.classList.remove(`${styles.dateChoose}`);
    }
    element.target.classList.add(`${styles.dateChoose}`);
    if (id === 'loginDate') {
      document.querySelector('#check-in-date').value = `${year}-${month}-${date}`;
      document.querySelector('#check-in-date').classList.remove(`${styles.error}`);
      document.querySelector('#check-in-date').nextElementSibling.innerHTML = '';
    } else {
      document.querySelector('#check-out-date').value = `${year}-${month}-${date}`;
      document.querySelector('#check-out-date').classList.remove(`${styles.error}`);
      document.querySelector('#check-out-date').nextElementSibling.innerHTML = '';
    }
    const calendar = document.querySelector(`#${id}`);
    calendar.style.height = '0px';
    calendar.style.transition = '0.5s';
    setOpen(false);
    setDate(new Date(year, month - 1, date));
  }
  const addMonth = (id) => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }
  const lessMonth = (id) => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  useEffect(() => {
    setDateData([]);
    let week = 1;
    let weekData = [];
    let over = true;
    const monthData = [];
    const days = new Date(year, month, 0).getDate();
    for (let i = 1; i <= days; i += 1) {
      const date = new Date(year, month - 1, i);
      if (i === 1 && date.getDay() !== 0) {
        createOtherDdate('before', date.getDay(), weekData);
      }
      if (date.getTime() < now || date.getTime() > afterNinety) {
        over = true;
      } else {
        over = false;
      }
      weekData.push({
        note: 'now',
        over: over,
        weekDay: date.getDay(),
        monthDate: date.getDate(),
      });
      if (i === days && date.getDay() !== 6) {
        createOtherDdate('after', date.getDay(), weekData);
      }
      if (weekData.length === 7) {
        monthData.push({
          week: week,
          date: weekData,
        });
        setDateData(monthData);
        week += 1;
        weekData = [];
      }
    }
    if (rows) {
      openCalendar(id, monthData.length, null, 'monthChange');
    } else {
      setRows(monthData.length);
    }
  }, [month])
  return (
    <div className={styles.calendar} id={id}>
      <div className={styles.header}>
        <img src={arrow} alt="箭頭" className={styles.back} onClick={() => lessMonth(id)} />
        <p>{year} - {monthMapEng[month]}</p>
        <img src={arrow} alt="箭頭" className={styles.front} onClick={() => addMonth(id)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>
          {dateData.map(e => {
            return (
              <tr key={e.week}>
                {e.date.map((date, index) => {
                  switch (date.note) {
                    case 'before':
                      if (date.over) {
                        return (
                          <td key={index} data-type={date.note} data-over="over">{date.monthDate}</td>
                        );
                      }
                      return (
                        <td key={index} data-type={date.note}>{date.monthDate}</td>
                      );
                    case 'after':
                      if (date.over) {
                        return (
                          <td key={index} data-type={date.note} data-over="over">{date.monthDate}</td>
                        );
                      }
                      return (
                        <td key={index} data-type={date.note}>{date.monthDate}</td>
                      );
                    default:
                      if (date.over) {
                        return (
                          <td key={index} data-type={date.note} data-over="over">{date.monthDate}</td>
                        );
                      }
                      return (
                        <td key={index} data-type={date.note} data-year={year} data-month={month} data-date={date.monthDate} onClick={(element) => choose(element, id)}>{date.monthDate}</td>
                      );
                  }

                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ConvertDate(date) {
  if (!date) {
    return null
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

export default function Booking({ service, firstDate, lastDate, roomPrice, checkInInfo, descriptionShort, setSubmit }) {
  const icons = [
    {
      index: 1,
      icon: breakFast,
      iconAlt: '早餐',
      name: 'Breakfast',
    }, {
      index: 2,
      icon: miniBar,
      iconAlt: 'Mini Bar',
      name: 'Mini-Bar',
    }, {
      index: 3,
      icon: roomService,
      iconAlt: 'Room Service',
      name: 'Room-Service',
    }, {
      index: 4,
      icon: wifi,
      iconAlt: 'Wifi',
      name: 'Wi-Fi',
    }, {
      index: 5,
      icon: forChild,
      iconAlt: '適合兒童',
      name: 'Child-Friendly',
    }, {
      index: 6,
      icon: phone,
      iconAlt: '電話',
      name: 'Television',
    }, {
      index: 7,
      icon: goodView,
      iconAlt: '漂亮的視野',
      name: 'Great-View',
    }, {
      index: 8,
      icon: refrigerater,
      iconAlt: '冰箱',
      name: 'Refrigerator',
    }, {
      index: 9,
      icon: sofa,
      iconAlt: '沙發',
      name: 'Sofa',
    }, {
      index: 10,
      icon: forPet,
      iconAlt: '攜帶寵物',
      name: 'Pet-Friendly',
    }, {
      index: 11,
      icon: noSmoke,
      iconAlt: '全面禁菸',
      name: 'Smoke-Free',
    }, {
      index: 12,
      icon: airCondition,
      iconAlt: '空調',
      name: 'Air-Conditioner',
    }
  ];
  const steps = [
    {
      index: 1,
      src: first,
      alt: 'first step',
      content: '送出線上預約單'
    },
    {
      index: 2,
      src: second,
      alt: 'second step',
      content: '系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)'
    },
    {
      index: 3,
      src: third,
      alt: 'third step',
      content: '入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)'
    }
  ];
  const [weekday, setWeekday] = useState(0);
  const [weekend, setWeekend] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [rows, setRows] = useState();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [dateFirst, setDateFirst] = firstDate ? useState(new Date(firstDate)) : useState(0);
  const [dateLast, setDateLast] = lastDate ? useState(new Date(lastDate)) : useState(0);
  const calculateDateCount = () => {
    if (dateFirst !== 0 && dateLast !== 0) {
      const firstTime = dateFirst.getTime() / 1000;
      const lastTime = dateLast.getTime() / 1000;
      let tempWeekday = 0;
      let tempWeekend = 0;
      for (let i = 0; i < (lastTime - firstTime) / 86400; i += 1) {
        const day = new Date(new Date(dateFirst).setDate(new Date(dateFirst).getDate() + i)).getDay();
        switch (day) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            tempWeekday += 1;
            break;
          case 5:
          default:
            tempWeekend += 1;
            break;
        }
      }
      setWeekday(tempWeekday);
      setWeekend(tempWeekend);
    }
  }
  const close = () => {
    document.querySelector(`.${styles.booking}`).classList.toggle(`${styles.active}`);
  }
  const openCalendar = (id, rows, open, monthChange) => {
    let height;
    const calendars = Array.from(document.querySelectorAll(`.${styles.calendar}`));
    calendars.forEach(e => {
      e.style.height = '0px';
      e.style.transition = '0.5s';
    });
    if (!monthChange) {
      if (id === 'loginDate') {
        setOpenLogin((prev) => !prev);
        setOpenLogout(false);
      } else {
        setOpenLogout((prev) => !prev);
        setOpenLogin(false);
      }
    }
    const calendar = document.querySelector(`#${id}`);
    if (open) {
      height = `${0}px`;
    } else {
      height = `${document.querySelector(`#${id} .${styles.header}`).clientHeight + (35 * (rows + 1))}px`;
    }
    calendar.style.height = height;
    calendar.style.transition = '0.5s';
  }
  const checkInput = (e) => {
    switch (e.id) {
      case 'name':
        if (e.value === '') {
          document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '此欄位必填';
          document.querySelector(`#${e.id}`).classList.add(`${styles.error}`);
          return false;
        }
        document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '';
        document.querySelector(`#${e.id}`).classList.remove(`${styles.error}`);
        setName(e.value);
        return true;
      case 'phone':
        if (e.value === '') {
          document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '此欄位必填';
          document.querySelector(`#${e.id}`).classList.add(`${styles.error}`);
          return false;
        }
        document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '';
        document.querySelector(`#${e.id}`).classList.remove(`${styles.error}`);
        setPhoneNumber(e.value);
        return true;
      case 'check-in-date':
      case 'check-out-date':
        if (e.value === '') {
          document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '此欄位必填';
          document.querySelector(`#${e.id}`).classList.add(`${styles.error}`);
          return false;
        }
        document.querySelector(`#${e.id}`).nextElementSibling.innerHTML = '';
        document.querySelector(`#${e.id}`).classList.remove(`${styles.error}`);
        return true;
    }
  };
  const submit = () => {
    let validate = true;
    const inputList = Array.from(document.querySelectorAll('input'));
    inputList.forEach((e) => {
      const status = checkInput(e);
      if (!status) {
        validate = false;
      }
    });
    if (validate) {
      setSubmit(true);
      setWeekday(0);
      setWeekend(0);
      setDateFirst(0);
      setDateLast(0);
      const inputList = Array.from(document.querySelectorAll('input'));
      inputList.forEach(e => {
        e.value = '';
      });
      document.querySelector(`.${styles.booking}`).classList.remove(`${styles.active}`);
    }
  }
  useEffect(() => {
    if (dateFirst !== 0 && dateLast !== 0) {
      calculateDateCount();
    }
  }, [dateFirst, dateLast]);
  return (
    <div className={styles.booking}>
      <div className={styles.bookingForm}>
        <button className={styles.close} type="button" onClick={() => close()}></button>
        <div className={styles.bookerInfo}>
          <div className={styles.item}>
            <label htmlFor="name">
              <span>姓名</span>
              <input className={styles.inputData} type="text" placeholder="姓名" id="name" defaultValue={name} onChange={(e) => checkInput(e.target)} />
              <span className={styles.error}></span>
            </label>
          </div>
          <div className={styles.item}>
            <label htmlFor="phone">
              <span>手機號碼</span>
              <input className={styles.inputData} type="text" placeholder="手機號碼" id="phone" defaultValue={phoneNumber} onChange={(e) => checkInput(e.target)} />
              <span className={styles.error}></span>
            </label>
          </div>
          <div className={styles.item}>
            <label htmlFor="check-in-date">
              <span>入住日期</span>
              <input className={styles.inputData} type="text" id="check-in-date" defaultValue={ConvertDate(dateFirst) ? ConvertDate(dateFirst) : ''} placeholder="請選擇住宿日期" onClick={() => { openCalendar('loginDate', rows, openLogin) }} />
              <span className={styles.error}></span>
            </label>
            <Calendar id="loginDate" openCalendar={openCalendar} rows={rows} setRows={setRows} setOpen={setOpenLogin} setDate={setDateFirst} />
          </div>
          <div className={styles.item}>
            <label htmlFor="check-out-date">
              <span>退房日期</span>
              <input className={styles.inputData} type="text" id="check-out-date" defaultValue={ConvertDate(dateLast) ? ConvertDate(dateLast) : ''} placeholder="請選擇住宿日期" onClick={() => { openCalendar('logoutDate', rows, openLogout) }} />
              <span className={styles.error}></span>
            </label>
            <Calendar id="logoutDate" openCalendar={openCalendar} rows={rows} setRows={setRows} setOpen={setOpenLogout} setDate={setDateLast} />
          </div>
          <div className={`${styles.item} ${styles.dayCount}`}>
            <span>{(dateLast === 0 || dateFirst === 0) ? 0 : (dateLast - dateFirst) / 86400000 + 1}天，{weekday + weekend === 0 ? `${0}晚` : `${weekday}晚平日 ${weekend}晚假日`}</span>
          </div>
          <div className={`${styles.item} ${styles.money}`}>
            <span>總計</span>
            <span>${(roomPrice.normalDayPrice * weekday) + (roomPrice.holidayPrice * weekend)}</span>
          </div>
          <div className={styles.item}>
            <button type="button" onClick={() => submit()}>確認送出</button>
          </div>
          <p>此預約系統僅預約功能，並不會對您進行收費</p>
        </div>
        <div className={styles.bookRoomInfo}>
          <div className={`${styles.roomDetail} ${styles.item}`}>
            <div className={styles.title}>
              <span>Single Room</span>
            </div>
            <span>{(descriptionShort.GuestMax === descriptionShort.GuestMin) ? `${descriptionShort.GuestMax}人` : `最少${descriptionShort.GuestMin}人，最多${descriptionShort.GuestMax}人`}・ {descriptionShort.Bed}・ 衛浴{descriptionShort['Private-Bath']}間・{descriptionShort.Footage}平方公尺</span>
            <span>平日（一～四）價格：{roomPrice.normalDayPrice} / 假日（五〜日）價格：{roomPrice.holidayPrice}</span>
            <div className={styles.roomService}>
              {icons.map(e => {
                if (service[e.name]) {
                  return (
                    <div key={e.index} className={styles.iconItem}>
                      <img src={e.icon} alt={e.iconAlt} />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className={`${styles.roomInfo} ${styles.item}`}>
            <div className={styles.title}>
              <span>訂房資訊</span>
            </div>
            <ul>
              <li>入住時間：最早{checkInInfo.checkInEarly}，最晚{checkInInfo.checkInLate}；退房時間：{checkInInfo.checkOut}，請自行確認行程安排。</li>
              <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
              <li>好室旅店全面禁止吸菸。</li>
              <li>若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。</li>
            </ul>
          </div>
          <div className={`${styles.process} ${styles.item}`}>
            <div className={styles.title}>
              <span>預約流程</span>
            </div>
            {steps.map(e => {
              return (
                <div key={e.index} className={styles.steps}>
                  <div className={styles.head}>
                    <img src={e.src} alt={e.alt} />
                  </div>
                  <div className={styles.content}>
                    <span>{e.content}</span>
                  </div>
                  {(e.index === 1 || e.index === 2) ? <img className={styles.arrow} src={arrow} alt="箭頭" /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 