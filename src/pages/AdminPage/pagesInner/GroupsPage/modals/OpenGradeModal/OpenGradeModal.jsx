import s from "../../../ProfilePage/modals/PlanEventModal/PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext, useEffect, useState } from "react";
import { OpenGradeModalContext } from "../../../../../../Contexts";

export default function OpenGradeModal() {
    const {isOpenedGradeModal, setIsOpenedGradeModal} = useContext(OpenGradeModal);

    function closeModal() {
        setIsOpenedGradeModal(false);
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0px";
    }


    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Добавить</h5>
                <div className={s.inner}>
                    <section className={s.personal__info}>
                        <h6>Группу</h6>
                        <div className={s.items}>
                            <div className={s.item}>
                                <p>Название</p>
                                <input 
                                    type="text"
                                />
                            </div>
                            <div className={s.item}>
                                <p>Год поступления</p>
                                <input 
                                    type="text"
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