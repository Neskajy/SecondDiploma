import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlGroupsPage.module.scss";

import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useState, useEffect } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";

import { useForm } from "react-hook-form";

import { Link, useLocation } from "react-router-dom";
import warning from "../../../../assets/imgs/vector/warning.svg";
import LoadingFallBackFullScreen from "../../../../components/LoadingFallBack/LoadingFallBackFullScreen.jsx";

import { useApi } from "../../../../hooks/useApi.js";


export default function GroupsPage() {

    const [groups, setGroups] = useState(null);
    const [user, setUser] = useState(null);
    const api_url = import.meta.env.VITE_BACKEND_URL;

    const {makeRequest} = useApi();

    const path = useLocation().pathname;
    const [isAddGroupModalActive, setIsAddGroupModalActive] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm({
        mode: "onBlur",
    });

    const [isEditGroupModalActive, setIsEditGroupModalActive] = useState(false);


    const {
        register: registerEdit,
        formState: { errors: errorsEdit },
        handleSubmit: handleEditSubmit,
        reset: resetEdit,
        setValue: setEditValue,
        watch: watchEdit
    } = useForm({
        mode: "onBlur",
    });

    // --- Запросы через makeRequest ---

    // Добавление группы
    async function addGroup(data) {
        await makeRequest({
            method: "POST",
            route: `${api_url}/api/groups/create`,
            body: data,
        });
        getGroups();
        setIsAddGroupModalActive(false);
    }

    async function editGroup(data) {

        console.log(data);

        await makeRequest({
            method: "PATCH",
            route: `${api_url}/api/groups/update/${data.id}`,
            body: data,
        });
        getGroups();
        setIsEditGroupModalActive(false);
    }

    // Получение данных пользователя
    async function getUserData() {
        await makeRequest({
            method: "GET",
            route: `${api_url}/api/users/getUser`,
            setFunction: setUser,
        });
    }

    // Получение всех групп
    async function getGroups() {
        await makeRequest({
            method: "GET",
            route: `${api_url}/api/groups/`,
            setFunction: setGroups,
        });
    }

    const groupId = watchEdit("id")

    async function deleteGroup() {
        makeRequest({
            method: "DELETE",
            route: `${api_url}/api/groups/delete/${groupId}`
        });
        getGroups();
        setIsModalDataOpen(false);
    }

    // --- Загрузка данных ---
    useEffect(() => {
        getUserData();
        getGroups();
    }, []);

    return (
        <div className={s.GroupsPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Группы</h5>
                        {
                            user && Object.keys(user).length > 0 ? (
                                user["role"] == "admin" ? (
                                    <button className={s.add__group} onClick={() => { setIsAddGroupModalActive(true) }}>
                                        Добавить группу
                                    </button>
                                ) : ""
                            ) : ""
                        }
                        
                        <UniversalModal
                            isOpen={isAddGroupModalActive}
                            onClose={() => setIsAddGroupModalActive(false)}
                            title={"Добавить группу"}
                            content={
                                <form className={modal_s.common} onSubmit={handleSubmit(addGroup)}>
                                    <div className={modal_s.items}>
                                        <div className={modal_s.item}>
                                            <p>Имя группы</p>
                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.name && <div className={s.message}><img src={warning} /><p>{errors?.name.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Год поступления</p>
                                            <input
                                                type="number"
                                                {...register("year", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.year && <div className={s.message}><img src={warning} /><p>{errors?.year.message || "Error!"}</p></div>}</div>
                                        </div>
                                    </div>
                                    <div className={modal_s.buttons}>
                                        <button className={modal_s.apply} type="submit">
                                            Сохранить
                                        </button>
                                        <button className={modal_s.close} onClick={() => setIsModalDataOpen(false)}>
                                            Закрыть
                                        </button>
                                    </div>
                                </form>
                            }
                        />
                        <div className={s.group__list}>
                            {groups && typeof groups === "object" && Object.keys(groups).length > 0 ? (
                                Object.entries(groups).map(([k,v]) => {
                                    const groupList = Array.isArray(v) ? v : [];
                                    
                                    return (
                                        <div className={s.subgroup__list} key={[k]}>
                                            <h6>{[k]} курсы</h6>
                                            <ul className={s.groups}>
                                                {
                                                    groupList.map((group) => {
                                                        return (
                                                            <li className={s.group} key={group.name} onClick={() => {
                                                                resetEdit();
                                                                setEditValue("id", group.id);
                                                                setEditValue("name", group.name);
                                                                setEditValue("year", group.year);
                                                                setIsEditGroupModalActive(true);
                                                            }}>
                                                                <span className={s.absolute__top}>{group.status === "active" ? "Идет занятие" : ""}</span>
                                                                <p className={s.name}>{group.name}</p>
                                                                <div className={s.bottom}>
                                                                    <p className={s.year__of___receipt}>Год поступления: <span>{String(group.year)}</span></p>
                                                                    <p className={s.students__count}>Кол-во студентов: <span>{group.students_count}</span></p>
                                                                </div>
                                                                <Link to={`${path}/${group.id}`}>
                                                                    <button className={s.more} onClick={(e) => e.stopPropagation()}>Больше информации</button>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            ) : (
                                <LoadingFallBackFullScreen />
                            )}
                        </div>

                        <UniversalModal
                            isOpen={isEditGroupModalActive}
                            onClose={() => setIsEditGroupModalActive(false)}
                            title={"Редактировать группу"}
                            content={
                                <form className={modal_s.common} onSubmit={handleEditSubmit(editGroup)}>
                                    <div className={modal_s.items}>
                                        <div className={modal_s.item}>
                                            <p>id группы</p>
                                            <input
                                                type="text"
                                                readOnly
                                                {...registerEdit("id")}
                                            />
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Имя группы</p>
                                            <input
                                                type="text"
                                                {...registerEdit("name", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsEdit?.name && <div className={s.message}><img src={warning} /><p>{errorsEdit?.name.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Год поступления</p>
                                            <input
                                                type="number"
                                                {...registerEdit("year", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsEdit?.year && <div className={s.message}><img src={warning} /><p>{errorsEdit?.year.message || "Error!"}</p></div>}</div>
                                        </div>
                                    </div>
                                    <div className={modal_s.buttons}>
                                        <button className={modal_s.apply} type="submit">
                                            Сохранить
                                        </button>
                                        <button className={modal_s.close} onClick={deleteGroup}>
                                            Удалить
                                        </button>
                                    </div>
                                </form>
                            }
                        />

                    </div>
                </main>
            </div>
        </div>
    )
}