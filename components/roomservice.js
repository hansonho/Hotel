import styles from '../styles/RoomService.module.css';

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

export default function RoomService(service) {
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
  return (
    <>
      {icons.map(e => {
        if (service.service[e.name]) {
          return (
            <div key={e.index} className={styles.item}>
              <img className={styles.tick} src="/icon/tick.svg" alt="tick" />
              <img className={styles.service} src={e.icon} alt={e.iconAlt} />
              <span>{e.iconAlt}</span>
            </div>
          );
        }
        return (
          <div key={e.index} className={`${styles.item} ${styles.noService}`}>
            <img className={styles.cross} src="/icon/cross.svg" alt="cross" />
            <img className={styles.service} src={e.icon} alt={e.iconAlt} />
            <span>{e.iconAlt}</span>
          </div>
        );
      })}
    </>
  );
}