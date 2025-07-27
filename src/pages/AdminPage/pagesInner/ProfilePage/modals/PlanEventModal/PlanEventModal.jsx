import s from "./PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext, useState } from "react";

import { PlanEventModalContext } from "../../../../../../Contexts";


export default function PlanEventModal({}) {
    const {isActivePlanEventModal, setIsActivePlanEventModal} = useContext(PlanEventModalContext);
    
    const [color, setColor] = useState("#8430FA");
    // value="#A271FE"

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    function closeModal() {
        setIsActivePlanEventModal(false);
    }


    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Добавить или редактировать</h5>
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
                            <input type="date"/>
                        </div>
                        <div className={s.item}>
                            <p>Окончание события</p>
                            <input type="date"/>
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
    )
}