import s from "./PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext, useEffect, useState } from "react";

import { PlanEventModalContext } from "../../../../../../Contexts";


export default function PlanEventModal({data__props}) {
    const {isActivePlanEventModal, setIsActivePlanEventModal} = useContext(PlanEventModalContext);
    
    const [color, setColor] = useState("#8D79F3");

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    function closeModal() {
        setIsActivePlanEventModal(false);
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0px";
    }

    const formatDateForCalendar = () => {
        const { year, month, day, week__index } = data__props;

        // Форматируем число: 1 → "01", 12 → "12"
        const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

        let adjustedMonth = month;
        let adjustedYear = year;

        // Логика: если неделя "перетекает" в соседний месяц,
        // мы корректируем месяц (и год при переходе)
        if (week__index === 0 && day > 7) {
            // Начало недели, но день уже > 7 → вероятно, это не первая неделя месяца
            // Значит, реальный месяц — предыдущий
            adjustedMonth = month - 1;
            if (adjustedMonth === 0) {
                adjustedMonth = 12;
                adjustedYear -= 1;
            }
        } else if (week__index === 6 && day <= 7) {
            // Конец недели, день <= 7 → возможно, уже следующий месяц
            adjustedMonth = month + 1;
            if (adjustedMonth === 13) {
                adjustedMonth = 1;
                adjustedYear += 1;
            }
        }
        // Иначе — оставляем текущие month и year

        return `${adjustedYear}-${pad(adjustedMonth)}-${pad(day)}`;
    };


    const formatDate = formatDateForCalendar();


    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Добавить или редактировать</h5>
                <div className={s.inner}>
                    <section className={s.personal__info}>
                        <h6>Событие</h6>
                        <div className={s.items}>
                            <div className={s.item}>
                                <p>Название</p>
                                <input 
                                    type="text"
                                    value="хз, придумай че-нибудь"
                                />
                            </div>
                            <div className={s.item}>
                                <p>Тип события</p>
                                <input
                                    type="text"
                                    value="Занятие"
                                />
                            </div>
                            <div className={s.item}>
                                <p>Кабинет</p>
                                <input
                                    type="text"
                                    value="1201"
                                />
                            </div>
                            <div className={s.item}>
                                <p>Группа</p>
                                <input
                                    type="text"
                                    value="1224"
                                />
                            </div>
                            <div className={s.item}>
                                <p>Цвет события</p>
                                <input type="color" className={s.color__input} value={color} onChange={(e) => {handleColorChange(e)}}/>
                            </div>
                            <div className={s.item}>
                                <p>Нчало события</p>
                                <input 
                                    type="date"
                                    value={formatDate}
                                />
                            </div>
                            <div className={s.item}>
                                <p>Окончание события</p>
                                <input 
                                    type="date"
                                    value={formatDate}
                                />
                            </div>
                        </div>
                    </section>
                    <div className={s.buttons}>
                        <button className={s.close} onClick={closeModal}>
                            Закрыть
                        </button>
                        <button className={s.apply}>
                            Сохранить изменения
                        </button>
                    </div>
                    <div className={s.close__cross} onClick={closeModal}>
                        <Close alt="" onClick={closeModal}/>
                    </div>
                </div>
            </div>
        </div>
    )
}