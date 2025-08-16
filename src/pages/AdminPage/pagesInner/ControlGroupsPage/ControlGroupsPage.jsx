import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlGroupsPage.module.scss";

import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useState, useEffect } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";

import { useForm } from "react-hook-form";

import { Link, useLocation } from "react-router-dom";
import warning from "../../../../assets/imgs/vector/warning.svg";




export default function GroupsPage() {

    const [groups, setGroups] = useState(null);
    const [user, setUser] = useState(null);


    const path = useLocation().pathname;

    const [isAddGroupModalActive, setIsAddGroupModalActive] = useState(false);

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

    async function addGroup(data) {
        console.log(data);
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + `/api/groups/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            body: JSON.stringify(data)
        });

        const response = await request.json();
        setGroups(getGroups());
    }

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function getUserData() {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const response_ = await fetch(api_url + "/api/users/getUser", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            credentials: "include"
        });

        const data = await response_.json();
        console.log(data);
        setUser(data);
    }

    async function getGroups() {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/groups/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            }
        });

        const response = await request.json();
        setGroups(response);
    }

    useEffect(() => {
        getUserData();
        getGroups();
    },[]);

    const mySubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    };

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
                                        {/* <div className={modal_s.item}>
                                            <p>Год поступления группы</p>
                                            <input
                                                type="text"
                                                {...register("data__receipt", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errors?.data__receipt && <div className={s.message}><img src={warning} /><p>{errors?.data__receipt.message || "Error!"}</p></div>}</div>
                                        </div> */}
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
                        <div className={s.group__list}>
                            {groups && Object.keys(groups).length > 0 ? (
                                Object.entries(groups).map(([k,v]) => {
                                    return (
                                        <div className={s.subgroup__list} key={[k]}>
                                            <h6>{[k]} курсы</h6>
                                            <ul className={s.groups}>
                                                {
                                                    v.map((group) => {
                                                        return (
                                                            <li className={s.group} key={group.name}>
                                                                <Link to={`${path}/group`}>
                                                                    <span className={s.absolute__top}>{group.status === "active" ? "Идет занятие" : ""}</span>
                                                                    <p className={s.name}>{group.name}</p>
                                                                    <div className={s.bottom}>
                                                                        <p className={s.year__of___receipt}>Год поступления: <span>{String(group.created_at).slice(0, 4)}</span></p>
                                                                        <p className={s.students__count}>Кол-во студентов: <span>{group.students_count}</span></p>
                                                                    </div>
                                                                    <button className={s.more}>Больше информации</button>
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
                                <p>Загрузка групп или их нет</p>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}