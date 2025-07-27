import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ProfilePage.module.scss";

import user404 from "../../../../assets/imgs/vector/user.svg";
import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import Tg from "../../../../assets/imgs/vector/social/tg.svg?react";

import PersonalDataModal from "./modals/PersonalDataModal/PersonalDataModal.jsx";
import DangerZoneModal from "./modals/DangerZoneModal/DangerZoneModal.jsx";

import { createContext, useState } from "react";

import { ModalDataContext } from "../../../../Contexts.jsx";
import { DangerZoneContext } from "../../../../Contexts.jsx";

export default function ProfilePage() {

    const [isModalDataOpen, setIsModalDataOpen] = useState(false);
    const [isModalDangerOpen, setIsModalDangerOpen] = useState(false);

    function openDataModal() {
        setIsModalDataOpen(true);
    }
    function openDangerModal() {
        setIsModalDangerOpen(true);
    }

    return (
        <DangerZoneContext.Provider value={{isModalDangerOpen, setIsModalDangerOpen}}>
            
            <ModalDataContext.Provider value={{isModalDataOpen, setIsModalDataOpen}}>
                <div className={s.ProfilePage} style={{ display: "flex" }}>
                    <SideBar />
                    <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                        <AdminHeader />
                        <main className={s.main}>
                            <div className={s.container}>
                                <section className={s.section__social}>
                                    <h5>Профиль</h5>
                                    <div className={s.main_}>
                                        <div className={s.user}>
                                            <div className={s.avatar}>
                                                <img src={user404} alt="Аватар" />
                                            </div>
                                            <div className={s.text}>
                                                <p className={s.name}>Имя</p>
                                                <p className={s.bio}>Методист</p>
                                            </div>
                                        </div>
                                        <div className={s.right}>
                                            <div className={s.social__icons}>
                                                <div className={s.social__icon}>
                                                    <Tg alt="" className={s.icon} />
                                                </div>
                                            </div>
                                            <button className={s.edit} onClick={openDataModal}>
                                                <Edit alt="" className={s.edit__icon}/>
                                                Изменить
                                            </button>
                                        </div>
                                    </div>
                                </section>

                                <section className={s.section__personal__information}>
                                    <h5>Персональная информация</h5>
                                    <div className={s.info}>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Имя</p>
                                            <p className={s.response}>Имя</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Фамилия</p>
                                            <p className={s.response}>Фамилия</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Отчество</p>
                                            <p className={s.response}>Отчество</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Обо мне</p>
                                            <p className={s.response}>Методист</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Почта</p>
                                            <p className={s.response}>example@mail.ru</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Телефон</p>
                                            <p className={s.response}>+8 800 555 35 35</p>
                                        </div>
                                        <button className={s.edit} onClick={openDataModal}>
                                            <Edit alt="" className={s.edit__icon}/>
                                            Изменить
                                        </button>
                                    </div>
                                </section>


                                <section className={s.section__danger__zone}>
                                    <h5>Опасная зона</h5>
                                    <div className={s.info}>
                                        <div className={s.item}>
                                            <div className={s.text}>
                                                <p className={s.whatisit}>Поменять пароль</p>
                                                <p className={s.response}>Описание</p>
                                            </div>
                                            <button className={s.edit} onClick={openDangerModal}>
                                                <Edit alt="" className={s.edit__icon}/>
                                                Поменять пароль
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>
                    {isModalDataOpen ? <PersonalDataModal /> : ""}
                    {isModalDangerOpen ? <DangerZoneModal /> : ""}
                </div>
            </ModalDataContext.Provider>
        </DangerZoneContext.Provider>
    );
}