import { useState, useEffect } from 'react';

import styles from '../styles/Calendar.module.css';

import arrow from '../public/icon/arrow.svg';

function createCalendar() {
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
  const calendarArray = [];
  const nowDate = new Date();
  let nowYear = nowDate.getFullYear();
  let nowMonth = nowDate.getMonth() + 1;
  for (let i = 0; i < 4; i += 1) {
    const calendarDateArray = [];
    let calendarWeekArray = [];
    const nowMonthDate = new Date(nowYear, nowMonth, 0).getDate();
    for (let dateCount = 1; dateCount <= nowMonthDate; dateCount += 1) {
      const dateInfo = new Date(nowYear, nowMonth - 1, dateCount);
      const day = dateInfo.getDay();
      const date = dateInfo.getDate();
      calendarWeekArray.push({
        date: date,
        day: day,
      });
      if (day === 6) {
        if (calendarWeekArray.length < 7) {
          const lostCount = calendarWeekArray[0].day;
          for (let j = 0; j < lostCount; j += 1) {
            calendarWeekArray.splice(j, 0, {
              date: '',
              day: j,
            });
          }
        }
        calendarDateArray.push({
          weekData: calendarWeekArray
        });
        calendarWeekArray = [];
      } else if (dateCount === nowMonthDate) {
        if (calendarWeekArray.length < 7) {
          for (let j = calendarWeekArray[calendarWeekArray.length - 1].day + 1; j < 7; j += 1) {
            calendarWeekArray.splice(j, 0, {
              date: '',
              day: j,
            });
          }
        }
        calendarDateArray.push({
          weekData: calendarWeekArray
        });
        calendarWeekArray = [];
      }
    }
    calendarArray.push({
      year: nowYear,
      month: monthMapEng[nowMonth],
      monthNumber: nowMonth,
      calendarDateArray,
    });
    if (nowMonth === 12) {
      nowMonth = 1;
      nowYear += 1;
    } else {
      nowMonth += 1;
    }
  }
  return calendarArray;
}

function changeMonth(status, windowSize) {
  let monthMove;
  const activeArray = Array.from(document.querySelectorAll(`.${styles.active}`));
  const monthArray = Array.from(document.querySelectorAll(`.${styles.month}`));
  if (windowSize >= 768) {
    monthMove = status ? parseInt(activeArray[0].dataset.index) - 2 : parseInt(activeArray[0].dataset.index) + 2;
    if (monthMove === 2) {
      document.querySelector(`.${styles.nextBtn}`).classList.add(`${styles.close}`);
      document.querySelector(`.${styles.prevBtn}`).classList.remove(`${styles.close}`);
    } else {
      document.querySelector(`.${styles.prevBtn}`).classList.add(`${styles.close}`);
      document.querySelector(`.${styles.nextBtn}`).classList.remove(`${styles.close}`);
    }
  } else {
    monthMove = status ? parseInt(activeArray[0].dataset.index) - 1 : parseInt(activeArray[0].dataset.index) + 1;
    if (monthMove === 3) {
      document.querySelector(`.${styles.nextBtn}`).classList.add(`${styles.close}`);
    } else if (monthMove === 0) {
      document.querySelector(`.${styles.prevBtn}`).classList.add(`${styles.close}`);
    } else {
      document.querySelector(`.${styles.prevBtn}`).classList.remove(`${styles.close}`);
      document.querySelector(`.${styles.nextBtn}`).classList.remove(`${styles.close}`);
    }
  }
  activeArray.forEach(e => {
    e.classList.remove(`${styles.active}`);
  })
  const nextMonth = monthArray.find(e => {
    return parseInt(e.dataset.index) === monthMove;
  });
  if (windowSize >= 768) {
    nextMonth.classList.add(`${styles.active}`);
    nextMonth.nextElementSibling.classList.add(`${styles.active}`);
  } else {
    nextMonth.classList.add(`${styles.active}`);
  }
}

export default function Calendar({ setNightNumber, setMoney, roomprice, firstDate, setFirstDate, lastDate, setLastDate }) {
  const now = new Date();
  const after = new Date().setDate(now.getDate() + 90);
  const calendar = createCalendar();
  const [windowSize, setWindwoSize] = useState();
  const [status, setStatus] = useState(true);
  const drawActive = (dom, bigDate, smallData) => {
    const date = new Date(dom.dataset.year, dom.dataset.month - 1, dom.dataset.date).getTime();
    if (date > smallData && date < bigDate) {
      dom.classList.add(`${styles.clickActive}`);
    }
    if (date === smallData) {
      dom.classList.remove(`${styles.clickActiveFirst}`);
      dom.classList.add(`${styles.clickActiveSmall}`);
    }
    if (date === bigDate) {
      dom.classList.add(`${styles.clickActiveBig}`);
    }
  }
  const chooseDate = (e) => {
    let money = 0;
    const clickActiveArray = Array.from(document.querySelectorAll(`.${styles.clickActive}`));
    if (clickActiveArray.length > 0) {
      clickActiveArray.map(e => {
        e.classList.remove(`${styles.clickActive}`);
      });
    }
    if (document.querySelector(`.${styles.clickActiveSmall}`)) {
      document.querySelector(`.${styles.clickActiveSmall}`).classList.remove(`${styles.clickActiveSmall}`);
    }
    if (document.querySelector(`.${styles.clickActiveBig}`)) {
      document.querySelector(`.${styles.clickActiveBig}`).classList.remove(`${styles.clickActiveBig}`);
    }
    const year = e.target.dataset.year;
    const month = e.target.dataset.month;
    const date = e.target.dataset.date;
    const lastDate = new Date(year, month - 1, date).getTime();
    if (status) {
      setFirstDate(new Date(year, month - 1, date).getTime());
      setStatus(false);
      e.target.classList.add(`${styles.clickActiveFirst}`);
    } else if (firstDate !== lastDate) {
      setLastDate(new Date(year, month - 1, date).getTime());
      document.querySelector(`.${styles.clickActiveFirst}`).classList.remove(`${styles.clickActiveFirst}`);
      const noBookDate = Array.from(document.querySelectorAll(`.${styles.noBook}`));
      noBookDate.map(dom => {
        if (firstDate > lastDate) {
          drawActive(dom, firstDate, lastDate);
        } else {
          drawActive(dom, lastDate, firstDate);
        }
      });
      const dateCount = firstDate > lastDate ? (firstDate - lastDate) / 86400000 : (lastDate - firstDate) / 86400000;
      for (let i = 0; i < dateCount; i += 1) {
        let first = firstDate > lastDate ? new Date(lastDate) : new Date(firstDate);
        first = new Date(first.setDate(first.getDate() + i)).getDay();
        switch (first) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            money += roomprice.normalDayPrice;
            break;
          case 5:
          default:
            money += roomprice.holidayPrice;
            break;
        }
      }
      setNightNumber(dateCount);
      setMoney(money)
      // setFirstDate();
      setStatus(true)
    }
  }
  useEffect(() => {
    if (!windowSize) {
      setWindwoSize(window.innerWidth);
    } else {
      window.addEventListener('resize', () => {
        setWindwoSize(window.innerWidth)
      })
    }
  })
  if (windowSize >= 768) {
    return (
      <div className={styles.calendar}>
        <button className={`${styles.prevBtn} ${styles.close}`} onClick={e => changeMonth(true, windowSize)}>
          <img src={arrow} alt='箭頭' />
        </button>
        {calendar.map((data, index) => {
          if (index === 0 || index === 1) {
            return (
              <div className={`${styles.month} ${styles.active}`} data-index={index} key={index}>
                <span>{data.month} {data.year}</span>
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
                    {data.calendarDateArray.map((week, index) => {
                      return (
                        <tr key={index}>
                          {week.weekData.map(date => {
                            const dateTime = date.date !== '' ? new Date(data.year, data.monthNumber - 1, date.date).getTime() : null;
                            if (!dateTime) {
                              return (
                                <td key={date.day}>{date.date}</td>
                              );
                            }
                            if (dateTime < now.getTime()) {
                              return (
                                <td key={date.day} className={`${styles.normal} ${styles.before}`}>{date.date}</td>
                              );
                            } else if (dateTime > after) {
                              return (
                                <td key={date.day} className={`${styles.normal} ${styles.after}`}>{date.date}</td>
                              );
                            }
                            return (
                              <td key={date.day} className={`${styles.normal} ${styles.noBook}`} data-year={data.year} data-month={data.monthNumber} data-date={date.date} onClick={e => chooseDate(e)}>{date.date}</td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
          return (
            <div className={styles.month} data-index={index} key={index}>
              <span>{data.month} {data.year}</span>
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
                  {data.calendarDateArray.map((week, index) => {
                    return (
                      <tr key={index}>
                        {week.weekData.map(date => {
                          const dateTime = date.date !== '' ? new Date(data.year, data.monthNumber - 1, date.date).getTime() : null;
                          if (!dateTime) {
                            return (
                              <td key={date.day}>{date.date}</td>
                            );
                          }
                          if (dateTime < now.getTime()) {
                            return (
                              <td key={date.day} className={`${styles.normal} ${styles.before}`}>{date.date}</td>
                            );
                          } else if (dateTime > after) {
                            return (
                              <td key={date.day} className={`${styles.normal} ${styles.after}`}>{date.date}</td>
                            );
                          }
                          return (
                            <td key={date.day} className={`${styles.normal} ${styles.noBook}`} data-year={data.year} data-month={data.monthNumber} data-date={date.date} onClick={e => chooseDate(e)}>{date.date}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
        <button className={styles.nextBtn} onClick={e => changeMonth(false, windowSize)}>
          <img src={arrow} alt='箭頭' />
        </button>
      </div>
    );
  }
  return (
    <div className={styles.calendar}>
      <button className={`${styles.prevBtn} ${styles.close}`} onClick={e => changeMonth(true, windowSize)}>
        <img src={arrow} alt='箭頭' />
      </button>
      {calendar.map((data, index) => {
        if (index === 0) {
          return (
            <div className={`${styles.month} ${styles.active}`} data-index={index} key={index}>
              <span>{data.month} {data.year}</span>
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
                  {data.calendarDateArray.map((week, index) => {
                    return (
                      <tr key={index}>
                        {week.weekData.map(date => {
                          const dateTime = date.date !== '' ? new Date(data.year, data.monthNumber - 1, date.date).getTime() : null;
                          if (!dateTime) {
                            return (
                              <td key={date.day}>{date.date}</td>
                            );
                          }
                          if (dateTime < now.getTime()) {
                            return (
                              <td key={date.day} className={`${styles.normal} ${styles.before}`}>{date.date}</td>
                            );
                          } else if (dateTime > after) {
                            return (
                              <td key={date.day} className={`${styles.normal} ${styles.after}`}>{date.date}</td>
                            );
                          }
                          return (
                            <td key={date.day} className={`${styles.normal} ${styles.noBook}`} data-year={data.year} data-month={data.monthNumber} data-date={date.date} onClick={e => chooseDate(e)}>{date.date}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <div className={styles.month} data-index={index} key={index}>
            <span>{data.month} {data.year}</span>
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
                {data.calendarDateArray.map((week, index) => {
                  return (
                    <tr key={index}>
                      {week.weekData.map(date => {
                        const dateTime = date.date !== '' ? new Date(data.year, data.monthNumber - 1, date.date).getTime() : null;
                        if (!dateTime) {
                          return (
                            <td key={date.day}>{date.date}</td>
                          );
                        }
                        if (dateTime < now.getTime()) {
                          return (
                            <td key={date.day} className={`${styles.normal} ${styles.before}`}>{date.date}</td>
                          );
                        } else if (dateTime > after) {
                          return (
                            <td key={date.day} className={`${styles.normal} ${styles.after}`}>{date.date}</td>
                          );
                        }
                        return (
                          <td key={date.day} className={`${styles.normal} ${styles.noBook}`} data-year={data.year} data-month={data.monthNumber} data-date={date.date} onClick={e => chooseDate(e)}>{date.date}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      <button className={styles.nextBtn} onClick={e => changeMonth(false, windowSize)}>
        <img src={arrow} alt='箭頭' />
      </button>
    </div>
  );
}