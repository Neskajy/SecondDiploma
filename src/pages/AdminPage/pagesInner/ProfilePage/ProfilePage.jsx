import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ProfilePage.module.scss";


import user404 from "../../../../assets/imgs/vector/user.svg";
import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import Tg from "../../../../assets/imgs/vector/social/tg.svg?react";

import { useEffect, useState } from "react";

import warning from "../../../../assets/imgs/vector/warning.svg";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import { makeRequest } from "../../../../api/apiClient.js";

export default function ProfilePage() {

    const [isModalDataOpen, setIsModalDataOpen] = useState(false);
    const [isModalDangerOpen, setIsModalDangerOpen] = useState(false);

    const [response, setResponse] = useState("");

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function getUserData() {
        makeRequest({
            method: "GET",
            route: api_url + "/api/users/getUser",
            setFunction: setResponse
        });
    }

    
    async function handleSave(data) {
        const userId = response["id"];
        
        makeRequest({
            method: "PATCH",
            route: api_url + `/api/users/update/${userId}`,
            body: data,
        })
        getUserData();
        setIsModalDataOpen(false);
        setIsModalDangerOpen(false);
    }
    useEffect(() => {
        getUserData();
    }, []);

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

    const {
        register: registerPassword,
        formState: {
            errors: errorsPassword,
        },
        handleSubmit: handleSubmitPassword,
        reset: resetPassword
    } = useForm({
        mode: "onBlur",
    });

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                {
                    response && (
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
                                                <p className={s.name}>{response.name}</p>
                                                <p className={s.bio}>{response.role}</p>
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
                                                content={
                                                    <form className={modal_s.common} onSubmit={handleSubmit(handleSave)}>
                                                        <h5>Добавить пользователя</h5>
                                                        <div className={modal_s.items}>
                                                            <div className={modal_s.item}>
                                                                <p>Имя</p>
                                                                <input
                                                                    type="text"
                                                                    {...register("name", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                    defaultValue={response.name}
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
                                                                    defaultValue={response.surname}
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
                                                                    defaultValue={response.patronymic}
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
                                                                    defaultValue={response.email}
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
                                                                    defaultValue={response.phone}
                                                                />
                                                                <div className={modal_s.message}>{errors?.phone && <div className={s.message}><img src={warning} /><p>{errors?.phone.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                        </div>
                                                        <div className={modal_s.buttons}>
                                                            <button className={modal_s.close} onClick={() => setIsModalDataOpen(false)}>
                                                                Закрыть
                                                            </button>
                                                            <button className={modal_s.apply} type="submit">
                                                                Сохранить
                                                            </button>
                                                        </div>
                                                    </form>
                                                }
                                            />

                                        </div>
                                    </div>
                                </section>

                                <section className={s.section__personal__information}>
                                    <h5>Персональная информация</h5>
                                    <section className={s.info}>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Имя</p>
                                            <p className={s.response}>{response["name"]}</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Фамилия</p>
                                            <p className={s.response}>{response["surname"]}</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Отчество</p>
                                            <p className={s.response}>{response["patronymic"]}</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Обо мне</p>
                                            <p className={s.response}>{response["role"]}</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Почта</p>
                                            <p className={s.response}>{response["email"]}</p>
                                        </div>
                                        <div className={s.info__block}>
                                            <p className={s.whatisit}>Телефон</p>
                                            <p className={s.response}>{response["phone"]}</p>
                                        </div>
                                        <button className={s.edit} onClick={() => setIsModalDataOpen(true)}>
                                            <Edit alt="" className={s.edit__icon} />
                                            Изменить
                                        </button>
                                    </section>
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
                                                content={
                                                    <form className={modal_s.common} onSubmit={handleSubmitPassword(handleSave)}>
                                                        <h6>Опасная зона</h6>
                                                        <div className={modal_s.items}>
                                                            <div className={modal_s.item}>
                                                                <p>Пароль</p>
                                                                <input 
                                                                    type="text"
                                                                    placeholder="Новый пароль"
                                                                    {...registerPassword("password", {
                                                                        required: "Поле обязательно к заполнению",
                                                                        pattern: {
                                                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){8,255}/,
                                                                            message: "Используйте не менее 8 символов, включая заглавную и строчную букву, а также цифру."
                                                                        }
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errorsPassword?.password && <div className={s.message}><img src={warning} /><p>{errorsPassword?.password.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                        </div>
                                                        <div className={modal_s.buttons}>
                                                            <button className={modal_s.close} onClick={() => setIsModalDangerOpen(false)}>
                                                                Закрыть
                                                            </button>
                                                            <button className={modal_s.apply} type="submit">
                                                                Сохранить
                                                            </button>
                                                        </div>
                                                    </form>
                                                }
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </main>
                    )
                }
            </div>
        </div>
    );
}