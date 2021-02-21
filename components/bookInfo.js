import style from '../styles/BookInfo.module.css';

export default function bookInfo({ status, setSubmit }) {
  const close = () => {
    setSubmit(false); document.getElementsByTagName('body')[0].classList.remove('fixed');
  }
  return (
    <div className={style.bookInfo}>
      <div className={style.bookingInfoContent}>
        <div className={style.bookInfoHeader}>
          <button className={style.closeBtn} onClick={() => close()}>
            <img src="/icon/close.svg" alt="關閉" />
          </button>
        </div>
        <div className={style.bookInfoBody}>
          {status ? <img src="/icon/success.png" alt="預約成功" /> : <img src="/icon/failed.svg" alt="預約失敗" />}
          {status ? <span>預約成功</span> : <span>預約失敗</span>}
          {status ? <span>請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您</span> : <span>哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧</span>}
        </div>
      </div>
    </div>
  );
}