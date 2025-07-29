import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./CalendarPage.module.scss";
import Arrow__no__stick from "../../../../assets/imgs/vector/actions/arrow__no__stick.svg?react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useState } from "react";

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
        } else if (week__index === 6 && day <= 7) {
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


    const formatDate = formatDateForCalendar();


    const [isActivePlanEventModal, setIsActivePlanEventModal] = useState(false);
    const [isActivePlanEventModal_2, setIsActivePlanEventModal_2] = useState(false);


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

    function handleSave() {
        alert("Успешно");
        setIsActivePlanEventModal(false);
    }


    return (
        <div className={s.CalendarPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Календарь</h5>
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
                                        Добавить событие
                                    </button>
                                    <UniversalModal
                                        onClose={() => setIsActivePlanEventModal(false)}
                                        isOpen={isActivePlanEventModal}
                                        onApply={handleSave}
                                        title="Событие"
                                        content={
                                            <section className={modal_s.common}>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>Кабинет</p>
                                                        <input
                                                            type="text"
                                                            defaultValue="1201"
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Группа</p>
                                                        <input
                                                            type="text"
                                                            defaultValue="1224"
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Цвет события</p>
                                                        <input type="color" className={modal_s.color__input} defaultValue={color} />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Нчало события</p>
                                                        <input
                                                            type="date"
                                                            defaultValue={formatDate}
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Окончание события</p>
                                                        <input
                                                            type="date"
                                                            defaultValue={formatDate}
                                                        />
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
                            <table className={s.calendar__main}>
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
                                                                        setIsActivePlanEventModal_2(true);
                                                                        setResponse({...response, "day": int_day})
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
                                    <UniversalModal
                                        onClose={() => setIsActivePlanEventModal_2(false)}
                                        isOpen={isActivePlanEventModal_2}
                                        onApply={handleSave}
                                        title="Событие"
                                        content={
                                            <section className={modal_s.common}>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>Кабинет</p>
                                                        <input
                                                            type="text"
                                                            defaultValue="1201"
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Группа</p>
                                                        <input
                                                            type="text"
                                                            defaultValue="1224"
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Цвет события</p>
                                                        <input type="color" className={modal_s.color__input} defaultValue={color}/>
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Нчало события</p>
                                                        <input
                                                            type="date"
                                                            defaultValue={formatDate}
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Окончание события</p>
                                                        <input
                                                            type="date"
                                                            defaultValue={formatDate}
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                    />
                                </tbody>

                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}