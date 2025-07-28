import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./CalendarPage.module.scss";

import Arrow__no__stick from "../../../../assets/imgs/vector/actions/arrow__no__stick.svg?react";

import { response } from "./Response.jsx";
import { useState, useEffect } from "react";

import { PlanEventModalContext } from "../../../../Contexts.jsx";

import PlanEventModal from "../ProfilePage/modals/PlanEventModal/PlanEventModal.jsx";

export default function CalendarPage() {

    const [isActivePlanEventModal, setIsActivePlanEventModal] = useState(false);

    const [data, setData] = useState({});
    
    const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth;
    

    const scrollBarWidth = getScrollbarWidth();

    function returnPlanEventModal(arg) {
        setIsActivePlanEventModal(true);
        setData(arg)
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollBarWidth}px`;
    }


    return (
        <PlanEventModalContext.Provider value={{isActivePlanEventModal, setIsActivePlanEventModal}}>

            <div className={s.CalendarPage} style={{display: "flex"}}>
                <SideBar />
                <div className={s.HeaderAndContent} style={{width: "100%"}}>
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
                                        <button className={s.addEvent} onClick={returnPlanEventModal}>
                                            Добавить событие
                                        </button>
                                    </div>
                                    <time className={s.center}>
                                        <h6>{`${response.month} ${response.year}`}</h6>
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
                                                                
                                                                const time = {
                                                                    "year": response.year,
                                                                    "month": response.month,
                                                                    "day": int_day
                                                                }
                                                                return (
                                                                    <td 
                                                                        key={day__index} 
                                                                        className={`${isLastMonth ? s.lastMonth : ''} ${isNextMonth ? s.nextMonth : ''}`}
                                                                        onClick={() => returnPlanEventModal(time)}
                                                                    >
                                                                        {int_day}
                                                                    </td>
                                                                );
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {isActivePlanEventModal ? <PlanEventModal data__props={data}/> : ""}
        </PlanEventModalContext.Provider>
    )
}