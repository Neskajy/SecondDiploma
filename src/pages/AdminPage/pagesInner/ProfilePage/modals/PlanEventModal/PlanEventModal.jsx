import s from "./PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext, useEffect, useState } from "react";

import { PlanEventModalContext } from "../../../../../../Contexts";


export default function PlanEventModal({data__props}) {
    const {isActivePlanEventModal, setIsActivePlanEventModal} = useContext(PlanEventModalContext);
    
    const [color, setColor] = useState("#8D79F3");
    // value="#A271FE"

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    console.log(data__props);

    function closeModal() {
        setIsActivePlanEventModal(false);
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0px";
    }

    const NumberToMonth = {
        "1": "Январь",
        "2": "Февраль",
        "3": "Март",
        "4": "Апрель",
        "5": "Май",
        "6": "Июнь",
        "7": "Июль",
        "8": "Август",
        "9": "Сентябрь",
        "10": "Октябрь",
        "11": "Ноябрь",
        "12": "Декабрь"
    };

    const MonthToNumber = Object.fromEntries(
        Object.entries(NumberToMonth).map(([key, value]) => [value, key])
    );

    const formatMonth = () => {
        if (MonthToNumber[data__props.month] > 9) {
            return MonthToNumber[data__props.month];
        } else {
            return "0" + MonthToNumber[data__props.month]
        }
    };
    const formatDay = () => {
        if (data__props.day > 9) {
            return data__props.day;
        } else {
            return "0" + data__props.day;
        }
    };

    const [_month, _day] = [formatMonth(), formatDay()];

    const formatDate = `${data__props.year}-${_month}-${_day}`;


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
                                <input type="text"/>
                            </div>
                            <div className={s.item}>
                                <p>Цвет события</p>
                                <input type="color" className={s.color__input}  value={color} onChange={(e) => {handleColorChange(e)}}/>
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