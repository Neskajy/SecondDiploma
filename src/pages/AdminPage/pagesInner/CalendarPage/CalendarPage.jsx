import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./CalendarPage.module.scss";
import Arrow__no__stick from "../../../../assets/imgs/vector/actions/arrow__no__stick.svg?react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

import { useState } from "react";

import { useEffect } from "react";

import warning from "../../../../assets/imgs/vector/warning.svg";

import { useForm } from "react-hook-form";

import { useRef } from "react";

export default function CalendarPage() {

    const api_url = import.meta.env.VITE_BACKEND_URL;

    const [calendarInfo, setCalendarInfo] = useState(null);
    const [lessons, setLessons] = useState(null);
    const [isActiveAddTimetableModal, setIsActiveAddTimetableModal] = useState(false);



    function getCalendarPage({ isNext, timeType, calendarInfo }) {
        if (!calendarInfo) console.log("Нет calendarInfo");
        const { year, month, weekdays, today, today__week__index } = calendarInfo;

        let newMonth = month;
        let newYear = year;
        let newDay = today;

        if (timeType == "month") {
            newMonth = isNext ? month + 1 : month - 1;
            newYear = year;

            if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            } else if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            }
        } else if (timeType == "day") {
            const newDay = isNext ? currentDay + 1 : currentDay - 1;
        }

        setCalendarInfo({
            "year": newYear,
            "month": newMonth,
            "weekdays": weekdays,
            "weeks": getDaysInMonth(newYear, newMonth),
            "today": today,
            "today__week__index": today__week__index
        });
    }


    function getDaysInMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const firstDayOfWeek = (firstDayOfMonth + 6) % 7;

        const prevMonthDays = new Date(year, month, 0).getDate();

        const days = [];

        // предыдущий месяц

        const pad = (num) => (Number(num) < 10 ? `0${num}` : `${num}`);

        if (month <= 0) {
            year--;
            month = 12;
        }

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                type: "prev",
                date: `${year}-${pad(month)}-${pad(prevMonthDays - i)}`
            });
        }

        // текущий месяц


        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day: day,
                type: "now",
                date: `${year}-${pad(month + 1)}-${pad(day)}`
            });
        }

        // следующий месяц

        let nextMonthDay = 1;
        if (month + 2 > 12) {
            year++;
            month = -1;
        }
        while (days.length % 7 !== 0) {
            days.push({
                day: nextMonthDay++,
                type: "next",
                date: `${year}-${pad(month + 2)}-${pad(nextMonthDay - 1)}`
            });
        }

        // разбивка на недели

        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }

        return weeks;
    }

    useEffect(() => {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth();
        const today__week__index = today.getDay();
        const day = today.getDate();


        getDaysInMonth(year, month);

        setCalendarInfo({
            "year": year,
            "month": month,
            "weekdays": ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
            "weeks": getDaysInMonth(year, month),
            "today": day,
            "today__week__index": today__week__index
        });
    }, []);

    function getRandomSymbol() {
        const lets = "0123456789ABCDEF";
        const random = Math.floor(Math.random() * lets.length);
        return lets[random];
    }
    function getRandomHex() {
        return "#" + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol();
    }


    const [color, setColor] = useState(getRandomHex());

    async function getLessons() {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const response_ = await fetch(api_url + "/api/lessons/", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            credentials: "include"
        });

        const data = await response_.json();
        console.log(data)
        setLessons(data);
    }
    

    useEffect(() => {
        getLessons();
        getGroups();
        getTimetables();
    }, [])

    async function createLesson(data) {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        console.log(JSON.stringify(data));

        const request = await fetch(api_url + "/api/lessons/create", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        });

        const response = await request.json();

        console.log(response);
    }


    const [isActiveAddEventModal, setIsActiveAddEventModal] = useState(false);
    const [isActiveEditEventModal, setIsActiveEditEventModal] = useState(false);

    const NumberToMonth = {
        0: "Январь",
        1: "Февраль",
        2: "Март",
        3: "Апрель",
        4: "Май",
        5: "Июнь",
        6: "Июль",
        7: "Август",
        8: "Сентябрь",
        9: "Октябрь",
        10: "Ноябрь",
        11: "Декабрь"
    };

    const NumberToWeekDay = {
        0: "Понедельнике",
        1: "Вторнике",
        2: "Среде",
        3: "Четверге",
        4: "Пятнице",
        5: "Субботе",
        6: "Воскресенье"
    };



    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
        setValue
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: registerPrepare,
        formState: {
            errors: errorsPrepare,
        },
        handleSubmit: handlePrepareSubmit,
        reset: resetPrepare
    } = useForm({
        mode: "onBlur",
    });

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

    const [groupsBackend, setGroups] = useState(null);

    const hexToRgba = (hex, alpha = 1) => {
        // Remove the '#' if present
        const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

        // Handle 3-digit hex codes (e.g., #fff)
        let r, g, b;
        if (cleanHex.length === 3) {
            r = parseInt(cleanHex[0] + cleanHex[0], 16);
            g = parseInt(cleanHex[1] + cleanHex[1], 16);
            b = parseInt(cleanHex[2] + cleanHex[2], 16);
        } else if (cleanHex.length === 6) {
            // Handle 6-digit hex codes (e.g., #ffffff)
            r = parseInt(cleanHex.slice(0, 2), 16);
            g = parseInt(cleanHex.slice(2, 4), 16);
            b = parseInt(cleanHex.slice(4, 6), 16);
        } else {
            // Return a default or handle invalid hex
            console.warn('Invalid hex color format');
            return null;
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

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

    const [timetables, setTimetables] = useState(null);

    async function getTimetables() {

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/timetable/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            }
        });

        const response = await request.json();

        setTimetables(response);
    }




    return (
        <div className={s.CalendarPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Добавить расписание</h5>
                        {
                            calendarInfo && Object.entries(calendarInfo).length > 0 && lessons ? (
                                <div className={s.calendar}>
                                    <header className={s.calendar__header}>
                                        <div className={s.left}>
                                            <div className={s.time__remotes}>
                                                <div className={s.decrement__button} onClick={() => getCalendarPage({ isNext: false, timeType: "month", calendarInfo })}>
                                                    <Arrow__no__stick className={s.icon} />
                                                </div>
                                                <div className={s.increment__button} onClick={() => getCalendarPage({ isNext: true, timeType: "month", calendarInfo })}>
                                                    <Arrow__no__stick className={s.icon} />
                                                </div>
                                            </div>
                                            <button className={s.addEvent} onClick={() => setIsActiveAddTimetableModal(true)}>
                                                Добавить Расписание
                                            </button>
                                            <UniversalModal
                                                onClose={() => setIsActiveAddTimetableModal(false)}
                                                isOpen={isActiveAddTimetableModal}
                                                title="Добавить расписание"
                                                content={
                                                    <form className={modal_s.common} onSubmit={handlePrepareSubmit(createLesson)}>
                                                        <div className={modal_s.items}>
                                                            <div className={modal_s.item}>
                                                                <p>Название расписания (без повторений)</p>
                                                                <input
                                                                    type="text"
                                                                    {...registerTimetable("name", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errorsTimetable?.name && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.name.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Автоматиски создать пары в расписании? Если да, то пары автоматически создадутся в каждой неделе в определенный день недели, начиная от даты старта расписания, заканчивая датой окончания расписания. Чтобы создать пары надо создать в любом случае расписание</p>
                                                                <div className={modal_s.checkboxes}>
                                                                    {['Нет', 'Да'].map((value) => (
                                                                        <div className={modal_s.checkbox} key={value}>
                                                                            <p>{value}</p>
                                                                            <input type="radio"
                                                                                name="isLoop"
                                                                                value={value}
                                                                                {...registerPrepare("choice")}
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
                                                                    {groupsBackend ? (
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
                                                                    {...registerTimetable("group")}
                                                                >
                                                                    <option value="">--Выберите учителя--</option>
                                                                    {groupsBackend ? (
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
                                                                <p>Цвет события</p>
                                                                <input type="color" className={modal_s.color__input} defaultValue={color} />
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Старт</p>
                                                                <input
                                                                    type="date"
                                                                    {...registerTimetable("start_date", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                    value={calendarInfo?.selectedDay?.date ? calendarInfo.selectedDay.date : ""}
                                                                />
                                                                <div className={modal_s.message}>{errorsTimetable?.date && <div className={s.message}><img src={warning} /><p>{errorsTimetable?.date.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Окончание</p>
                                                                <input
                                                                    type="date"
                                                                    {...registerTimetable("start_date", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                    value={calendarInfo?.selectedDay?.date ? calendarInfo.selectedDay.date : ""}
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
                                            <button className={s.addEvent} onClick={() => setIsActiveAddEventModal(true)}>
                                                Добавить пару
                                            </button>
                                        </div>
                                        <time className={s.center}>
                                            <h6>{`${NumberToMonth[calendarInfo.month]} ${calendarInfo.year}`}</h6>
                                        </time>
                                        <div className={s.right}>
                                            <ul className={s.time}>
                                                <li>Месяц</li>
                                                <li>Сегодня</li>
                                            </ul>
                                        </div>
                                    </header>
                                    <FollowButton>

                                        <table className={s.calendar__main}
                                        >
                                            <thead>
                                                <tr>
                                                    {
                                                        calendarInfo.weekdays.map((day, weekday__index) => {
                                                            return (
                                                                <th key={weekday__index}>
                                                                    {day}
                                                                </th>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    calendarInfo.weeks.map((week, week__index) => {
                                                        return (
                                                            <tr key={week__index}>
                                                                {
                                                                    week.map((int_day, day__index) => {
                                                                        const isLastMonth = int_day.type === "prev";
                                                                        const isNextMonth = int_day.type === "next";
                                                                        
                                                                        return (
                                                                            <td
                                                                                key={day__index}
                                                                                className={`${isLastMonth ? s.lastMonth : ''} ${isNextMonth ? s.nextMonth : ''}`}
                                                                                onClick={() => {
                                                                                    const { selectedDay, ...newInfo } = calendarInfo || {};
                                                                                    const updatedInfo = {
                                                                                        ...newInfo,
                                                                                        selectedDay: {
                                                                                            day: int_day.day,
                                                                                            date: int_day.date,
                                                                                            isLastMonth,
                                                                                            isNextMonth
                                                                                        }
                                                                                    };
                                                                                    setCalendarInfo(updatedInfo);
                                                                                    resetPrepare();
                                                                                    setIsActiveAddEventModal(true);
                                                                                }}
                                                                            >
                                                                                {int_day.day}
                                                                                {
                                                                                    lessons[0] ? (
                                                                                        <ul className={s.lessons}>
                                                                                            {
                                                                                                lessons.map((lesson) => {
                                                                                                    if (lesson.date === int_day.date) {
                                                                                                        return (
                                                                                                            <li className={s.lesson} style=
                                                                                                            {{ background: lesson?.color 
                                                                                                                ? hexToRgba(lesson.color, 0.5) 
                                                                                                                : "rgba(0, 128, 0, .5)" 
                                                                                                            }}
                                                                                                            onClick={
                                                                                                                (e) => {
                                                                                                                    const withoutSeconds = (time) => {
                                                                                                                        const [hour, minutes, seconds] = time.split(":");
                                                                                                                        return `${hour}:${minutes}`;
                                                                                                                    }
                                                                                                                    console.log(lesson.timetable_name);
                                                                                                                    setValue("cabinet", lesson.cabinet);
                                                                                                                    setValue("group", lesson.group);
                                                                                                                    setValue("timetable", lesson.timetable_name);
                                                                                                                    setValue("color", "#" + lesson.color);
                                                                                                                    setValue("date", lesson.date);
                                                                                                                    setValue("lesson_start", withoutSeconds(lesson.lesson_start));
                                                                                                                    setValue("lesson_end", withoutSeconds(lesson.lesson_end));
                                                                                                                    setIsActiveEditEventModal(true);
                                                                                                                    e.stopPropagation();
                                                                                                                }
                                                                                                            }
                                                                                                            >
                                                                                                            
                                                                                                                {
                                                                                                                    lesson.lesson_start
                                                                                                                }
                                                                                                                <span style={{ background: lesson?.color ?  hexToRgba(lesson.color, 1) : "rgba(0, 128, 0, 1)" }}></span>
                                                                                                            </li>
                                                                                                        )
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        </ul>
                                                                                    ) : ""
                                                                                }
                                                                            </td >
                                                                        );
                                                                    })
                                                                }
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>

                                            <UniversalModal
                                                onClose={() => setIsActiveAddEventModal(false)}
                                                isOpen={isActiveAddEventModal}
                                                title="Добавить пару"
                                                content={
                                                    <form className={modal_s.common} onSubmit={handlePrepareSubmit(createLesson)}>
                                                        <div className={modal_s.items}>
                                                            <p>Чтобы добавить пару, сначала создайте расписание или выберете существующее</p>
                                                            <div className={modal_s.item}>
                                                                <p>Кабинет</p>
                                                                <input
                                                                    type="text"
                                                                    {...registerPrepare("cabinet", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errorsPrepare?.cabinet && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.cabinet.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Группа</p>
                                                                <select
                                                                    {...registerPrepare("group")}
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
                                                                <div className={modal_s.message}>{errorsPrepare?.group && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.group.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Расписание</p>
                                                                <select
                                                                    {...registerPrepare("timetable")}
                                                                >
                                                                    <option value="">--Выберите расписание--</option>
                                                                    {timetables ? (
                                                                            timetables.map((item) => (
                                                                                <option value={item.name} key={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                            ))
                                                                        ) : ""
                                                                    }
                                                                </select>
                                                                <div className={modal_s.message}>{errorsPrepare?.group && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.group.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Цвет события</p>
                                                                <input type="color" className={modal_s.color__input} defaultValue={color} />
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Дата события</p>
                                                                <input
                                                                    type="date"
                                                                    {...registerPrepare("date", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                    value={calendarInfo?.selectedDay?.date ? calendarInfo.selectedDay.date : ""}
                                                                />
                                                                <div className={modal_s.message}>{errorsPrepare?.date && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.date.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Время начала пары</p>
                                                                <input
                                                                    type="time"
                                                                    {...registerPrepare("lesson_start", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errorsPrepare?.lesson_start && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.lesson_start.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Время окончания пары</p>
                                                                <input
                                                                    type="time"
                                                                    {...registerPrepare("lesson_end", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errorsPrepare?.time__end && <div className={s.message}><img src={warning} /><p>{errorsPrepare?.time__end.message || "Error!"}</p></div>}</div>
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

                                            <UniversalModal
                                                onClose={() => setIsActiveEditEventModal(false)}
                                                isOpen={isActiveEditEventModal}
                                                title="Изменить пару"
                                                content={
                                                    <section className={modal_s.common}>
                                                        <div className={modal_s.items}>
                                                            <div className={modal_s.item}>
                                                                <p>Кабинет</p>
                                                                <input
                                                                    type="text"
                                                                    {...register("cabinet", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errors?.cabinet && <div className={s.message}><img src={warning} /><p>{errors?.cabinet.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Группа</p>
                                                                <select
                                                                    {...register("group")}
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
                                                                <div className={modal_s.message}>{errorsPrepare?.group && <div className={s.message}><img src={warning} /><p>{errors?.group.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Расписание</p>
                                                                <select
                                                                    {...register("timetable")}
                                                                >
                                                                    <option value="">--Выберите расписание--</option>
                                                                    {timetables ? (
                                                                            timetables.map((item) => (
                                                                                <option value={item.name} key={item.id}>
                                                                                    {item.name}
                                                                                </option>
                                                                            ))
                                                                        ) : ""
                                                                    }
                                                                </select>
                                                                <div className={modal_s.message}>{errorsPrepare?.timetable && <div className={s.message}><img src={warning} /><p>{errors?.timetable.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Цвет события</p>
                                                                <input 
                                                                    type="color"
                                                                    className={modal_s.color__input}
                                                                    {...register("color")}
                                                                />
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Дата события</p>
                                                                <input
                                                                    type="date"
                                                                    {...register("date", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errors?.date && <div className={s.message}><img src={warning} /><p>{errors?.date.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Время начала пары</p>
                                                                <input
                                                                    type="time"
                                                                    {...register("lesson_start", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errors?.lesson_start && <div className={s.message}><img src={warning} /><p>{errors?.lesson_start.message || "Error!"}</p></div>}</div>
                                                            </div>
                                                            <div className={modal_s.item}>
                                                                <p>Время окончания пары</p>
                                                                <input
                                                                    type="time"
                                                                    {...register("lesson_end", {
                                                                        required: "Поле обязательно к заполнению"
                                                                    })}
                                                                />
                                                                <div className={modal_s.message}>{errors?.lesson_end && <div className={s.message}><img src={warning} /><p>{errors?.lesson_end.message || "Error!"}</p></div>}</div>
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
                                                    </section>
                                                }
                                            />


                                        </table>
                                    </FollowButton>
                                </div>
                            ) : ""
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}