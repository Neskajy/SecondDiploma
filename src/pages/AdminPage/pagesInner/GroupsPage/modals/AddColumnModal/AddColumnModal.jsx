import s from "../../../ProfilePage/modals/PlanEventModal/PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext, useEffect, useState } from "react";

import { AddColumnModalContext } from "../../../../../../Contexts";

export default function AddGroupModal() {
    const {isActiveAddColumnModalContext, setIsActiveAddColumnModalContext} = useContext(AddColumnModalContext);

    function closeModal() {
        setIsActiveAddColumnModalContext(false);
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0px";
    }

    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Добавить</h5>
                <div className={s.inner}>
                    <section className={s.personal__info}>
                        <h6>Дату</h6>
                        <p>Примечание: колонка добавиться до итоговой оценки месяца, к которому относится дата</p>
                        <div className={s.items}>
                            <div className={s.item}>
                                <p>Дата</p>
                                <input 
                                    type="text"
                                    placeholder="дд.мм"
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