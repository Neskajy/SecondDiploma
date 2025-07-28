import s from "../PlanEventModal/PlanEventModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext } from "react";

import { DangerZoneContext } from "../../../../../../Contexts";


export default function DangerZoneModal() {
    const {isModalDangerOpen, setIsModalDangerOpen} = useContext(DangerZoneContext);
    
    function closeModal() {
        setIsModalDangerOpen(false);
    }

    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Изменить информацию о себе</h5>
                <div className={s.inner}>
                    <section className={s.personal__info}>
                        <h6>Опасная зона</h6>
                        <div className={s.items}>
                            <div className={s.item}>
                                <p>Пароль</p>
                                <input type="text" placeholder="response"/>
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
                        <Close alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}