import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./TimetablesPage.module.scss";

import warning from "../../../../assets/imgs/vector/warning.svg";

import Edit from "../../../../assets/imgs/vector/actions/edit.svg?react";

import React, { useEffect } from "react";

import { useState, timetableef } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

import { useLocation } from "react-router-dom";
import { makeRequest } from "../../../../api/apiClient.js";

export default function timetablesPage() {

    const [isAddTimetableModalOpen, setIsAddTimetableModalOpen] = useState(false);
    const [isEditTimetableModalOpen, setIsEditTimetableModalOpen] = useState(false);
    const location = useLocation();

    const [response, setResponse] = useState(null);
    const [groupsBackend, setGroups] = useState(null);
    const [rolesBackend, setRoles] = useState([]);
    const [currenttimetable, setCurrenttimetable] = useState(null);

    function openEditableModal(data) {
        setCurrenttimetable(data.id);
        setIsEditTimetableModalOpen(true);
    }

    function openAddableModal() {
        setIsAddTimetableModalOpen(true);
    }

    const {
        register: registerTimetable,
        formState: {
            errors: errorsTimetable,
        },
        handleSubmit: handleTimetableSubmit,
        reset: resetTimetable
    } = useForm({
        mode: "onBlur",
    });

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function getTimetables() {
        makeRequest({
            method: "GET",
            route: api_url + "/api/timetable/",
            setFunction: setResponse
        })
    }

    async function getGroups() {
        makeRequest({
            method: "GET",
            route: api_url + "/api/groups/justGroups",
            setFunction: setGroups
        })
    }

    useEffect(() => {
        getTimetables();
        getGroups();
        getTeachers();
        getRoles();
    }, []);

    async function getRoles() {
        makeRequest({
            method: "GET",
            route: api_url + "/api/users/existingRoles",
            setRoles: setResponse
        })
    }

    const [teachers, setTeachers] = useState(null);

    async function getTeachers() {
        makeRequest({
            method: "GET",
            route: api_url + "/api/users/teachers",
            setFunction: setTeachers
        })
        setTeachers(response);
    }

    async function createTimetable(data) {
        makeRequest({
            method: "POST",
            route: api_url + "/api/timetable/create",
            body: data
        })
        getTimetables();
        setIsAddTimetableModalOpen(false);
    }

    async function deleteTimetable(id) {
        makeRequest({
            method: "DELETE",
            route: api_url + "/api/timetable/delete/" + id,
            setFunction: setResponse
        })
        getTimetables();
        setIsEditTimetableModalOpen();
    }


    function getRandomBrightHSL() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 90 + Math.floor(Math.random() * 20);
        const lightness = 49 + Math.floor(Math.random() * 15);
        return { hue, saturation, lightness };
    }

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    // Безопасная деструктуризация
    const { hue, saturation, lightness } = getRandomBrightHSL();
    const initialColor = hslToHex(hue, saturation, lightness);

    const [color, setColor] = useState(initialColor);

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление расписаниями</h5>
                        <button className={s.add} onClick={() => openAddableModal()}>
                            Добавить расписание
                        </button>
                        <UniversalModal
                            onClose={() => (setIsAddTimetableModalOpen(false))}
                            isOpen={isAddTimetableModalOpen}
                            title="Добавить расписание"
                            content={
                                <form className={modal_s.common} onSubmit={handleTimetableSubmit(createTimetable)}>
                                    <div className={modal_s.items}>
                                        <div className={modal_s.item}>
                                            <p>Название расписания (новое)</p>
                                            <input
                                                type="text"
                                                {...registerTimetable("name", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.name && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.name.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <span>Автоматиски создать пары в расписании? Если да, то пары автоматически создадутся в каждой неделе в определенный день недели, начиная от даты старта расписания, заканчивая датой окончания расписания. Чтобы создать пары, надо создать в любом случае расписание</span>
                                            <div className={modal_s.checkboxes}>
                                                {['Нет', 'Да'].map((value) => (
                                                    <div className={modal_s.checkbox} key={value}>
                                                        <p>{value}</p>
                                                        <input type="radio"
                                                            name="isLoop"
                                                            value={value}
                                                            {...registerTimetable("createLessons")}
                                                        />
                                                    </div>
                                                ))}
                                                <div className={modal_s.message}>{errorsTimetable?.choice && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.choice.message || "Error!"}</p></div>}</div>
                                            </div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Кабинет</p>
                                            <input
                                                type="text"
                                                {...registerTimetable("cabinet", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.cabinet && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.cabinet.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Группа</p>
                                            <select
                                                {...registerTimetable("group")}
                                            >
                                                <option value="">--Выберите группу--</option>
                                                {Array.isArray(groupsBackend) && groupsBackend.length > 0 ? (
                                                    groupsBackend.map((item) => (
                                                        <option value={item.name} key={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                ) : ""
                                                }
                                            </select>
                                            <div className={modal_s.message}>{errorsTimetable?.group && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.group.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Учитель</p>
                                            <select
                                                {...registerTimetable("teacher_id")}
                                            >
                                                <option value="">--Выберите учителя--</option>
                                                {Array.isArray(teachers) ? (
                                                    teachers.map((item) => (
                                                        <option value={item.id} key={item.id}>
                                                            {item.full_name}
                                                        </option>
                                                    ))
                                                ) : ""
                                                }
                                            </select>
                                            <div className={modal_s.message}>{errorsTimetable?.group && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.group.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Цвет события</p>
                                            <input type="color"
                                                className={modal_s.color__input}
                                                defaultValue={color}
                                                {...registerTimetable("color", {
                                                    "required": "Поле обязательно к заполнению"
                                                })}
                                            />
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Старт</p>
                                            <input
                                                type="date"
                                                {...registerTimetable("start_date", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.date && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.date.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Окончание</p>
                                            <input
                                                type="date"
                                                {...registerTimetable("end_date", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.date && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.date.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Время начала пары</p>
                                            <input
                                                type="time"
                                                {...registerTimetable("lesson_start", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.lesson_start && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.lesson_start.message || "Error!"}</p></div>}</div>
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Время окончания пары</p>
                                            <input
                                                type="time"
                                                {...registerTimetable("lesson_end", {
                                                    required: "Поле обязательно к заполнению"
                                                })}
                                            />
                                            <div className={modal_s.message}>{errorsTimetable?.time__end && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.time__end.message || "Error!"}</p></div>}</div>
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
                        {
                            Array.isArray(response) && (
                                <FollowButton>
                                    <div className={s.table__abertka}>
                                        <table
                                        >
                                            <thead>
                                                <tr>
                                                    {
                                                        Array.isArray(response) && response.length > 0 && (
                                                            Object.keys(response.at(0)).map((key) => {
                                                                return <th key={key}>{key}</th>;
                                                            })
                                                        )
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
                                            <UniversalModal
                                                isOpen={isEditTimetableModalOpen}
                                                onClose={() => setIsEditTimetableModalOpen(false)}
                                                title="Удалить расписание"
                                                content={
                                                    <form className={modal_s.common}>
                                                        <div className={modal_s.items}>
                                                        </div>
                                                        <div className={modal_s.buttons}>
                                                            <button
                                                                className={modal_s.close}
                                                                onClick={() => deleteTimetable(currenttimetable)}
                                                                type="button"
                                                            >
                                                                Удалить расписание id={currenttimetable}
                                                            </button>
                                                        </div>
                                                    </form>
                                                }
                                            />
                                        </table>
                                    </div>
                                </FollowButton>
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}