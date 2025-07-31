import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlUsersPage.module.scss";

import warning from "../../../../assets/imgs/vector/warning.svg";

import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import React from "react";

import { useState } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

export default function ControlUsersPage() {

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

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

    const response = [
        {
            "id": 1,
            "surname": "Фамилия",
            "name": "Имя",
            "patronymic": "Отчество",
            "group": "12/23",
            "role": "methodist",
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
            "basic_group": "335"
        },
        {
            "id": 2,
            "surname": "Фамилия",
            "name": "Имя",
            "patronymic": "Отчество",
            "group": "12/23",
            "role": "methodist",
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
            "basic_group": "335"
        },
        {
            "id": 3,
            "surname": "Фамилия",
            "name": "Имя",
            "patronymic": "Отчество",
            "group": "12/23",
            "role": "methodist",
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
            "basic_group": "335"
        },
        {
            "id": 4,
            "surname": "Фамилия",
            "name": "Имя",
            "patronymic": "Отчество",
            "group": "12/23",
            "role": "methodist",
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
            "basic_group": "335"
        },
        {
            "id": 5,
            "surname": "Фамилия",
            "name": "Имя",
            "patronymic": "Отчество",
            "group": "12/23",
            "role": "methodist",
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
            "basic_group": "335"
        },
    ]

    const groups__backend = [
        {
            "id": 1,
            "group": "12/23"
        },
        {
            "id": 2,
            "group": "12/23"
        },
        {
            "id": 3,
            "group": "12/23"
        },
        {
            "id": 4,
            "group": "12/23"
        }
    ];

    const role__backend = [
        {
            "id": 1,
            "role": "Гость"
        },
        {
            "id": 2,
            "role": "Учитель"
        },
        {
            "id": 3,
            "role": "Методист"
        },
        {
            "id": 4,
            "role": "Админ"
        }
    ]

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление пользователями</h5>
                        <button className={s.add} onClick={() => setIsAddUserModalOpen(true)}>
                            Добавить пользователя
                        </button>
                        <UniversalModal
                            isOpen={isAddUserModalOpen}
                            onClose={() => setIsAddUserModalOpen(false)}
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
                                            <div className={modal_s.message}>{errors?.name && <div className={s.message}><img src={warning}/><p>{errors?.name.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Фамилия</p>
                                            <input 
                                                type="text"
                                                {...register("surname", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.surname && <div className={s.message}><img src={warning}/><p>{errors?.surname.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Отчество</p>
                                            <input 
                                                type="text"
                                                {...register("patronymic", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.patronymic && <div className={s.message}><img src={warning}/><p>{errors?.patronymic.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Группа</p>
                                            <select name="roles" id="" 
                                                {...register("group", {
                                                    required: "Поле обязательно к заполнению",
                                                })}>
                                                <option value="">--Выберите группу--</option>
                                                {
                                                    groups__backend.map((item) => {
                                                        return <option value={item.group}>
                                                            {item.group}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            <div className={modal_s.message}>{errors?.group && <div className={s.message}><img src={warning}/><p>{errors?.group.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Роль</p>
                                            <select name="roles" id="" 
                                                {...register("role", {
                                                    required: "Поле обязательно к заполнению",
                                                })}>
                                                <option value="">--Выберите роль--</option>
                                                {
                                                    role__backend.map((item) => {
                                                        return <option value={item.role}>
                                                            {item.role}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            <div className={modal_s.message}>{errors?.role && <div className={s.message}><img src={warning}/><p>{errors?.role.message || "Error!"}</p></div>}</div>
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
                                            <div className={modal_s.message}>{errors?.email && <div className={s.message}><img src={warning}/><p>{errors?.email.message || "Error!"}</p></div>}</div>
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
                                            <div className={modal_s.message}>{errors?.phone && <div className={s.message}><img src={warning}/><p>{errors?.phone.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Группа основной специальности</p>
                                            <input 
                                                type="text"
                                                {...register("base__group", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.base__group && <div className={s.message}><img src={warning}/><p>{errors?.base__group.message || "Error!"}</p></div>}</div>
                                        </div>
                                    </div>
                                </section>
                            }
                        />
                        <FollowButton>

                            <div className={s.table__abertka}>
                                <table
                                >
                                    <thead>
                                        <tr>
                                            {
                                                Object.keys(response.at(0)).map((key) => {
                                                    return <th key={key}>{key}</th>;
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            response.map((item) => {
                                                return <tr onClick={() => setIsEditUserModalOpen(true)}>
                                                    {
                                                        Object.entries(item).map(([key, value]) => {
                                                            return <td>{value}</td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                <UniversalModal
                                    isOpen={isEditUserModalOpen}
                                    onClose={() => setIsEditUserModalOpen(false)}
                                    content={
                                        <section className={modal_s.common}>
                                            <h5>Редактировать пользователя</h5>
                                            <div className={modal_s.items}>
                                                <div className={modal_s.item}>
                                                    <p>Имя</p>
                                                    <input 
                                                        type="text"
                                                        {...register("name", {
                                                            required: "Поле обязательно к заполнению"
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errors?.name && <div className={s.message}><img src={warning}/><p>{errors?.name.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Фамилия</p>
                                                    <input 
                                                        type="text"
                                                        {...register("surname", {
                                                            required: "Поле обязательно к заполнению"
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errors?.surname && <div className={s.message}><img src={warning}/><p>{errors?.surname.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Отчество</p>
                                                    <input 
                                                        type="text"
                                                        {...register("patronymic", {
                                                            required: "Поле обязательно к заполнению"
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errors?.patronymic && <div className={s.message}><img src={warning}/><p>{errors?.patronymic.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Группа</p>
                                                    <select name="roles" id="" 
                                                        {...register("group", {
                                                            required: "Поле обязательно к заполнению",
                                                        })}>
                                                        <option value="">--Выберите группу--</option>
                                                        {
                                                            groups__backend.map((item) => {
                                                                return <option value={item.group}>
                                                                    {item.group}
                                                                </option>
                                                            })
                                                        }
                                                    </select>
                                                    <div className={modal_s.message}>{errors?.group && <div className={s.message}><img src={warning}/><p>{errors?.group.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Роль</p>
                                                    <select name="roles" id="" 
                                                        {...register("role", {
                                                            required: "Поле обязательно к заполнению",
                                                        })}>
                                                        <option value="">--Выберите роль--</option>
                                                        {
                                                            role__backend.map((item) => {
                                                                return <option value={item.role}>
                                                                    {item.role}
                                                                </option>
                                                            })
                                                        }
                                                    </select>
                                                    <div className={modal_s.message}>{errors?.role && <div className={s.message}><img src={warning}/><p>{errors?.role.message || "Error!"}</p></div>}</div>
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
                                                    <div className={modal_s.message}>{errors?.email && <div className={s.message}><img src={warning}/><p>{errors?.email.message || "Error!"}</p></div>}</div>
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
                                                    <div className={modal_s.message}>{errors?.phone && <div className={s.message}><img src={warning}/><p>{errors?.phone.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Группа основной специальности</p>
                                                    <input 
                                                        type="text"
                                                        {...register("base__group", {
                                                            required: "Поле обязательно к заполнению"
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errors?.base__group && <div className={s.message}><img src={warning}/><p>{errors?.base__group.message || "Error!"}</p></div>}</div>
                                                </div>
                                            </div>
                                        </section>
                                    }
                                />
                            </div>
                        </FollowButton>
                    </div>
                </main>
            </div>
        </div>
    );
}