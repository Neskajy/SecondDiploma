import s from "./PersonalDataModal.module.scss";
import Close from "../../../../../../assets/imgs/vector/close.svg?react";
import { useContext } from "react";

import { ModalDataContext } from "../../../../../../Contexts";


export default function PersonalDataModal() {
    const {isModalDataOpen, setIsModalDataOpen} = useContext(ModalDataContext);
    
    function closeModal() {
        setIsModalDataOpen(false);
    }

    return (
        <div className={s.Modal}>
            <div className={s.container}>
                <h5>Изменить информацию о себе</h5>
                <section className={s.links}>
                    <h6>Социальные сети</h6>
                    <div className={s.items}>
                        <div className={s.item}>
                            <p>Telegram</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Github</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Youtube</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Rutube</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Instagram</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Facebook</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Tiktok</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>X</p>
                            <input type="text" placeholder="response"/>
                        </div>
                    </div>
                </section>
                <section className={s.personal__info}>
                    <h6>Персональные данные</h6>
                    <div className={s.items}>
                        <div className={s.item}>
                            <p>Имя</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Фамилия</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Отчество</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Почта</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>Телефон</p>
                            <input type="text" placeholder="response"/>
                        </div>
                        <div className={s.item}>
                            <p>О себе</p>
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
    )
}