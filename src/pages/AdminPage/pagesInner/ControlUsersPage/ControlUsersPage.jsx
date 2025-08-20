import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlUsersPage.module.scss";

import warning from "../../../../assets/imgs/vector/warning.svg";

import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import React, { useEffect } from "react";

import { useState, useRef } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

import { useLocation } from "react-router-dom";

export default function ControlUsersPage() {

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const location = useLocation();
    const { refresh, user_id } = location.state || {};

    const [response, setResponse] = useState([""]);
    const [groupsBackend, setGroups] = useState(null);
    const [rolesBackend, setRoles] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    function openEditableModal(userData) {
        resetEdit();
        setCurrentUser(userData);

        setValueEdit("id", userData.id);
        setValueEdit("name", userData.name);
        setValueEdit("surname", userData.surname);
        setValueEdit("patronymic", userData.patronymic);
        setValueEdit("email", userData.email);
        setValueEdit("phone", userData.phone);
        setValueEdit("basic_group", userData.basic_group);

        setValueEdit("group", userData.group);
        setValueEdit("role", userData.role);

        setIsEditUserModalOpen(true);
    }

    function openAddableModal() {
        setIsAddUserModalOpen(true);
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

    const {
        register: registerEdit,
        formState: {
            errors: errorsEdit,
        },
        handleSubmit: handleSubmitEdit,
        setValue: setValueEdit,
        reset: resetEdit
    } = useForm({
        mode: "onBlur",
    });

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function getUsers() {
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/users/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            }
        });

        const response_ = await request.json();

        setResponse(response_);
    }

    async function getGroups() {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/groups/justGroups", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            }
        });

        const response_ = await request.json();
        setGroups(response_);
    }

    

    async function editUsers(data) {
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        const userId = data.id;
        const { id, ...newData } = data;

        const fetchData = {};

        Object.entries(newData).map(([k, v]) => {
            Object.assign(fetchData, { [k]: String(v) });
        });

        const request = await fetch(api_url + `/api/users/update/${userId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            body: JSON.stringify(fetchData)
        });
        
        const response = await request.json();
        console.log(response)

        alert("Успешно");
        setIsEditUserModalOpen(false);

        getUsers();
    }

    async function addUsers(data) {
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        const { id, ...newData } = data;

        const fetchData = {};

        Object.entries(newData).map(([k, v]) => {
            Object.assign(fetchData, { [k]: String(v) });
        });

        const request = await fetch(api_url + `/api/users/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            body: JSON.stringify(fetchData)
        });

        const response = await request.json();
        console.log(response)

        if (response.message === "ok") {
            alert("Успешно");
            reset();
        } else {
            alert("Ошибка: ", response);
        }
        setIsAddUserModalOpen(false);

        getUsers();
    }


    useEffect(() => {
        const fetchData = async () => {
            await getGroups();
            await getRoles();
            await getUsers();
        };

    fetchData();
    }, [refresh, user_id]);

    useEffect(() => {
        if (refresh && user_id && response.length > 0) {
            console.log("response обновлён:", response);
            const user_data = response.find(obj => obj.id === user_id);
            if (user_data) {
            openEditableModal(user_data);
            }
        }
    }, [refresh, user_id, response]);

    async function getRoles() {
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/users/existingRoles", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            }
        });

        const response_ = await request.json();
        console.log(response)
        setRoles(response_);
    }


    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление пользователями</h5>
                        <button className={s.add} onClick={() => openAddableModal()}>
                            Добавить пользователя
                        </button>
                        {
                            Array.isArray(rolesBackend) ? (
                                <UniversalModal
                                    isOpen={isAddUserModalOpen}
                                    onClose={() => setIsAddUserModalOpen(false)}
                                    content={
                                        <form className={modal_s.common} onSubmit={handleSubmit(addUsers)}>
                                            <div className={s.inner}>
                                                <h5>Создать пользователя</h5>
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
                                                        <p>Группа</p>
                                                        <select
                                                            {...register("group", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        >
                                                            <option value="">--Выберите группу--</option>
                                                            {groupsBackend ? (
                                                                    groupsBackend.map((item) => (
                                                                        <option value={item.name} key={item.id}>
                                                                            {item.name}
                                                                        </option>
                                                                    ))
                                                                ) : ""
                                                            }
                                                        </select>
                                                        <div className={modal_s.message}>{errors?.group && <div className={s.message}><img src={warning} /><p>{errors?.group.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Роль</p>
                                                        <select
                                                            {...register("role", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        >
                                                            <option value="">--Выберите роль--</option>
                                                            {
                                                                rolesBackend.map((item) => {
                                                                    return <option value={item} key={item}>
                                                                        {item}
                                                                    </option>
                                                                })
                                                            }
                                                        </select>
                                                        <div className={modal_s.message}>{errors?.role && <div className={s.message}><img src={warning} /><p>{errors?.role.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Почта</p>
                                                        <input
                                                            type="text"
                                                            {...register("email", {
                                                                pattern: {
                                                                    value: /^[\w.][\w]+@[\w]+\.[a-zA-Z]{2,}$/,
                                                                    message: "Не правильный формат почты"
                                                                },
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.email && <div className={s.message}><img src={warning} /><p>{errors?.email.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Телефон</p>
                                                        <input
                                                            type="text"
                                                            {...register("phone", {
                                                                pattern: {
                                                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                                                    message: "Не правильный формат номера телефона"
                                                                },
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.phone && <div className={s.message}><img src={warning} /><p>{errors?.phone.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Группа основной специальности</p>
                                                        <input
                                                            type="text"
                                                            {...register("basic_group", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.basic_group && <div className={s.message}><img src={warning} /><p>{errors?.basic_group.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={modal_s.buttons}>
                                                <button className={modal_s.close} onClick={() => setIsEditUserModalOpen(false)}>
                                                    Закрыть
                                                </button>
                                                <button className={modal_s.apply} type="submit">
                                                    Сохранить
                                                </button>
                                            </div>
                                        </form>
                                    }
                                />
                            ) : ""
                        }
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
                                        {response.map((item) => (
                                            <tr onClick={() => openEditableModal(item)} key={item.id}>
                                                {Object.entries(item).map(([key, value]) => (
                                                    <td key={`${item.id}-${key}`}>{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </FollowButton>
                        {
                            Array.isArray(rolesBackend) ? (
                                <UniversalModal
                                    isOpen={isEditUserModalOpen}
                                    onClose={() => setIsEditUserModalOpen(false)}
                                    content={
                                        <form className={modal_s.common} onSubmit={handleSubmitEdit(editUsers)}>
                                            <h5>Редактировать пользователя</h5>
                                            <div className={modal_s.items}>
                                                <div className={modal_s.item}>
                                                    <p>id</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("id", {
                                                        })}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Имя</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("name", {
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.name && <div className={s.message}><img src={warning} /><p>{errorsEdit?.name.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Фамилия</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("surname", {
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.surname && <div className={s.message}><img src={warning} /><p>{errorsEdit?.surname.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Отчество</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("patronymic", {
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.patronymic && <div className={s.message}><img src={warning} /><p>{errorsEdit?.patronymic.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Группа</p>
                                                    <select
                                                        {...registerEdit("group")}
                                                    >
                                                        {groupsBackend ? (
                                                                groupsBackend.map((item) => (
                                                                    <option value={item.name} key={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))
                                                            ) : ""
                                                        }
                                                    </select>
                                                    <div className={modal_s.message}>{errorsEdit?.group && <div className={s.message}><img src={warning} /><p>{errorsEdit?.group.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Роль</p>
                                                    <select
                                                        {...registerEdit("role")}
                                                    >
                                                        {
                                                            rolesBackend.map((item) => {
                                                                return <option value={item} key={item}>
                                                                    {item}
                                                                </option>
                                                            })
                                                        }
                                                    </select>
                                                    <div className={modal_s.message}>{errorsEdit?.role && <div className={s.message}><img src={warning} /><p>{errorsEdit?.role.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Почта</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("email", {
                                                            pattern: {
                                                                value: /^[\w.][\w]+@[\w]+\.[a-zA-Z]{2,}$/,
                                                                message: "Не правильный формат почты"
                                                            }
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.email && <div className={s.message}><img src={warning} /><p>{errorsEdit?.email.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Телефон</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("phone", {
                                                            pattern: {
                                                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                                                message: "Не правильный формат номера телефона"
                                                            }
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.phone && <div className={s.message}><img src={warning} /><p>{errorsEdit?.phone.message || "Error!"}</p></div>}</div>
                                                </div>
                                                <div className={modal_s.item}>
                                                    <p>Группа основной специальности</p>
                                                    <input
                                                        type="text"
                                                        {...registerEdit("basic_group", {
                                                        })}
                                                    />
                                                    <div className={modal_s.message}>{errorsEdit?.basic_group && <div className={s.message}><img src={warning} /><p>{errorsEdit?.base__group.message || "Error!"}</p></div>}</div>
                                                </div>
                                            </div>
                                            <div className={modal_s.buttons}>
                                                <button className={modal_s.close} onClick={() => setIsEditUserModalOpen(false)}>
                                                    Закрыть
                                                </button>
                                                <button className={modal_s.apply} type="submit">
                                                    Сохранить
                                                </button>
                                            </div>
                                        </form>
                                    }
                                />
                            ) : ""
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}