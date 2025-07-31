import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./CalendarPage.module.scss";
import Arrow__no__stick from "../../../../assets/imgs/vector/actions/arrow__no__stick.svg?react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

import { useState } from "react";

import React from "react";

import { useEffect } from "react";

import warning from "../../../../assets/imgs/vector/warning.svg";

import { useForm } from "react-hook-form";

export default function CalendarPage() {
    const [response, setResponse] = useState({
        "year": 2025,
        "month": 7,
        "weekdays": ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
        "weeks": [
            [30, 1, 2, 3, 4, 5, 6],
            [7, 8, 9, 10, 11, 12, 13],
            [14, 15, 16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25, 26, 27],
            [28, 29, 30, 31, 1, 2, 3]
        ],
    });

    const [color, setColor] = useState("#8D79F3");

    const formatDateForCalendar = () => {
        const { year, month, day, week__index } = response;

        // Форматируем число: 1 → "01", 12 → "12"
        const pad = (num) => (num < 10 ? `0${num}` : `${num}`);

        let adjustedMonth = month;
        let adjustedYear = year;

        // Логика: если неделя "перетекает" в соседний месяц,
        // мы корректируем месяц (и год при переходе)
        if (week__index === 0 && day > 7) {
            // Начало недели, но день уже > 7 → вероятно, это не первая неделя месяца
            // Значит, реальный месяц — предыдущий
            adjustedMonth = month - 1;
            if (adjustedMonth === 0) {
                adjustedMonth = 12;
                adjustedYear -= 1;
            }
        } else if (response.week__index === 4 && day < 10) {
            // Конец недели, день <= 7 → возможно, уже следующий месяц
            adjustedMonth = month + 1;
            if (adjustedMonth === 13) {
                adjustedMonth = 1;
                adjustedYear += 1;
            }
        }
        // Иначе — оставляем текущие month и year

        return `${adjustedYear}-${pad(adjustedMonth)}-${pad(day)}`;
    };


    const formatDate = response.day ? formatDateForCalendar() : "";


    const [isActivePlanEventModal, setIsActivePlanEventModal] = useState(false);

    const NumberToMonth = {
        1: "Январь",
        2: "Февраль",
        3: "Март",
        4: "Апрель",
        5: "Май",
        6: "Июнь",
        7: "Июль",
        8: "Август",
        9: "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь"
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
        reset
    } = useForm({
        mode: "onBlur",
    });

    const mySubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    };

    function closeThisModal() {
        const { day, day__index, week__index, ...newObject } = response;
        setResponse(newObject);
        setIsActivePlanEventModal(false);
    }



    return (
        <div className={s.CalendarPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Добавить расписание</h5>
                        <div className={s.calendar}>
                            <header className={s.calendar__header}>
                                <div className={s.left}>
                                    <div className={s.time__remotes}>
                                        <div className={s.decrement__button}>
                                            <Arrow__no__stick className={s.icon} />
                                        </div>
                                        <div className={s.increment__button}>
                                            <Arrow__no__stick className={s.icon} />
                                        </div>
                                    </div>
                                    <button className={s.addEvent} onClick={() => setIsActivePlanEventModal(true)}>
                                        Добавить пару
                                    </button>
                                    <UniversalModal
                                        onClose={closeThisModal}
                                        isOpen={isActivePlanEventModal}
                                        title="Редактировать день"
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
                                                        <input
                                                            type="text"
                                                            {...register("group", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.group && <div className={s.message}><img src={warning} /><p>{errors?.group.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    {response.day__index !== undefined && (
                                                        <div className={modal_s.item}>
                                                            <p>
                                                                Выделить все недели в {NumberToWeekDay[response.day__index].toLowerCase()}?
                                                                Это позволит добавить пару или редактировать существующие занятия в этот день на всех неделях.
                                                                Время будет взято из формы.
                                                            </p>
                                                            <select
                                                                name="loop"
                                                                id=""
                                                                {...register("loop", {
                                                                    required: "Поле обязательно к заполнению",
                                                                })}
                                                            >
                                                                <option value="false">Нет</option>
                                                                <option value="true">Да</option>
                                                            </select>
                                                            <div className={modal_s.message}>
                                                                {errors?.loop && (
                                                                    <div className={s.message}>
                                                                        <img src={warning} alt="warning" />
                                                                        <p>{errors.loop.message || "Ошибка!"}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className={modal_s.item}>
                                                        <p>Цвет события</p>
                                                        <input type="color" className={modal_s.color__input} defaultValue={color} />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Дата события</p>
                                                        <input
                                                            type="date"
                                                            placeholder="response"
                                                            {...register("date", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                            defaultValue={formatDate}
                                                        />
                                                        <div className={modal_s.message}>{errors?.date && <div className={s.message}><img src={warning} /><p>{errors?.date.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Время начала пары</p>
                                                        <input
                                                            type="time"
                                                            {...register("time__start", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.time__start && <div className={s.message}><img src={warning} /><p>{errors?.time__start.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Время окончания пары</p>
                                                        <input
                                                            type="time"
                                                            {...register("time__end", {
                                                                required: "Поле обязательно к заполнению"
                                                            })}
                                                        />
                                                        <div className={modal_s.message}>{errors?.time__end && <div className={s.message}><img src={warning} /><p>{errors?.time__end.message || "Error!"}</p></div>}</div>
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                    />
                                </div>
                                <time className={s.center}>
                                    <h6>{`${NumberToMonth[response.month]} ${response.year}`}</h6>
                                </time>
                                <div className={s.right}>
                                    <ul className={s.time}>
                                        <li>Месяц</li>
                                        <li>Неделя</li>
                                        <li>День</li>
                                    </ul>
                                </div>
                            </header>
                            <FollowButton>

                                <table className={s.calendar__main}
                                >
                                    <thead>
                                        <tr>
                                            {
                                                response.weekdays.map((day, weekday__index) => {
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
                                            response.weeks.map((week, week__index) => {
                                                return (
                                                    <tr key={week__index}>
                                                        {
                                                            week.map((int_day, day__index) => {
                                                                const isLastMonth = (week__index === 0 && int_day > 7 ? s.lastMonth : "");
                                                                const isNextMonth = week__index === response.weeks.length - 1 && int_day < 10;


                                                                return (
                                                                    <td
                                                                        key={day__index}
                                                                        className={`${isLastMonth ? s.lastMonth : ''} ${isNextMonth ? s.nextMonth : ''}`}
                                                                        onClick={() => {
                                                                            setResponse({ ...response, "day": int_day, "week__index": week__index, "day__index": day__index });
                                                                            console.log(day__index)
                                                                            setIsActivePlanEventModal(true);
                                                                        }}
                                                                    >
                                                                        {int_day}
                                                                    </td >
                                                                );
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                            </FollowButton>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}