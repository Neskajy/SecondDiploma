import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ProfilePage.module.scss";


import user404 from "../../../../assets/imgs/vector/user.svg";
import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import Tg from "../../../../assets/imgs/vector/social/tg.svg?react";

import { useState } from "react";

import warning from "../../../../assets/imgs/vector/warning.svg";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

export default function ProfilePage() {

    const [isModalDataOpen, setIsModalDataOpen] = useState(false);
    const [isModalDangerOpen, setIsModalDangerOpen] = useState(false);

    function handleSave() {
        console.log("Сохранено");
        setIsModalDataOpen(false)
    }

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const mySubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    };

    return (
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
                                    <button className={s.edit} onClick={() => setIsModalDataOpen(true)}>
                                        <Edit alt="" className={s.edit__icon} />
                                        Изменить
                                    </button>

                                    <UniversalModal
                                        isOpen={isModalDataOpen}
                                        onClose={() => setIsModalDataOpen(false)}
                                        onApply={handleSave}
                                        content={
                                            <section className={modal_s.common}>
                                                <h5>Добавить пользователя</h5>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>Имя</p>
                                                        <input
                                                            type="text"
                                                            {...register("name", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.name && <div className={s.message}><img src={warning} /><p>{errors?.name.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Фамилия</p>
                                                        <input
                                                            type="text"
                                                            {...register("surname", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.surname && <div className={s.message}><img src={warning} /><p>{errors?.surname.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Отчество</p>
                                                        <input
                                                            type="text"
                                                            {...register("patronymic", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.patronymic && <div className={s.message}><img src={warning} /><p>{errors?.patronymic.message || "Error!"}</p></div>}</div>
                                                    </div>


                                                    <div className={modal_s.item}>
                                                        <p>Почта</p>
                                                        <input
                                                            type="text"
                                                            {...register("email", {
                                                                required: "Поле обязательно к заполнению",
                                                                pattern: {
                                                                    value: /^[\w.][\w]+@[\w]+\.[a-zA-Z]{2,}$/,
                                                                    message: "Не правильный формат почты"
                                                                }
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.email && <div className={s.message}><img src={warning} /><p>{errors?.email.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Телефон</p>
                                                        <input
                                                            type="text"
                                                            {...register("phone", {
                                                                required: "Поле обязательно к заполнению",
                                                                pattern: {
                                                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                                                    message: "Не правильный формат номера телефона"
                                                                }
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.phone && <div className={s.message}><img src={warning} /><p>{errors?.phone.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                    />

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
                                <button className={s.edit} onClick={() => setIsModalDataOpen(true)}>
                                    <Edit alt="" className={s.edit__icon} />
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
                                    <button className={s.edit} onClick={() => setIsModalDangerOpen(true)}>
                                        <Edit alt="" className={s.edit__icon} />
                                        Поменять пароль
                                    </button>
                                    <UniversalModal
                                        isOpen={isModalDangerOpen}
                                        onClose={() => setIsModalDangerOpen(false)}
                                        onApply={handleSave}
                                        content={
                                            <section className={modal_s.common}>
                                                <h6>Опасная зона</h6>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>Пароль</p>
                                                        <input type="text" placeholder="response" />
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}