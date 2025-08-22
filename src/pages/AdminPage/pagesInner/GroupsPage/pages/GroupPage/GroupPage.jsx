import AdminHeader from "../../../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../../../components/SideBar/SideBar.jsx";
import s from "./GroupPage.module.scss";
import Plus from "../../../../../../assets/imgs/vector/plus.svg?react";

import UniversalModal from "../../../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../../../components/UniversalModal/UniversalModal.module.scss";

import FollowButton from "../../../../../../components/FollowButton/FollowButton.jsx";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { makeRequest } from "../../../../../../api/apiClient.js";

export default function GroupPage() {

    const [isOpenedGradeModal, setIsOpenedGradeModal] = useState(false);

    const location = useLocation().pathname;
    const groupId = parseInt(location.split("/").slice(-1)[0]);
    const api_url = import.meta.env.VITE_BACKEND_URL;

    const [fullGroupInfo, setFullGroupInfo] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null);

    async function getFullGroupInfo(data) {
        await makeRequest({
            method: "POST",
            route: api_url + "/api/groups/fullGroupInfo/" + groupId,
            body: data,
            setFunction: setFullGroupInfo
        })
        setCurrentMonth(data);
        setIsOpenSelectMonth(false);
    }

    const {
        register: registerGrade,
        formState: {
            errors: errorsGrade
        },
        handleSubmit: handleGradeSubmit,
        reset: resetGrade,
        watch: watchGrade,
        setValue: setGradeValue
    } = useForm({
        "mode": "onBlur",
    });

    const watch_grade = watchGrade("grade_id");
    const watch_attendance = watchGrade("attendance_id");

    async function updateLesson(data) {
        const hasGrade = data.grade && data.grade !== "-" && data.grade !== null;
        const hasAttendance = data.status && data.status !== "—" && data.status !== null;

        try {
            if (hasGrade) {
                if (data.grade_id) {
                    await makeRequest({
                        method: "PATCH",
                        route: `${api_url}/api/grades/update/${data.grade_id}`,
                        body: { grade: data.grade },
                    });
                } else {
                    await makeRequest({
                        method: "POST",
                        route: `${api_url}/api/grades/create`,
                        body: {
                            grade: data.grade,
                            lesson_id: String(data.lesson_id),
                            student_id: String(data.student_id),
                        },
                    });
                }
            } if (hasAttendance) {
                const status = data.status;
                if (!status) {
                    console.error("Unknown attendance status:", data.status);
                    return;
                }
                if (data.attendance_id) {
                    await makeRequest({
                        method: "PATCH",
                        route: `${api_url}/api/attendances/update/${data.attendance_id}`,
                        body: { status },
                    });
                } else {
                    await makeRequest({
                        method: "POST",
                        route: `${api_url}/api/attendances/create`,
                        body: {
                            lesson_id: String(data.lesson_id),
                            student_id: String(data.student_id),
                            status: data.status,
                        },
                    });
                }
            }
        } catch (error) {
            console.error("Failed to update lesson:", error);
            throw error;
        }

        getFullGroupInfo(currentMonth);
        setIsOpenedGradeModal(false)
    }



    function clickOnGrade() {
        setIsOpenedGradeModal(true);
    }


    function toDDMM(date) {
        const [yy, mm, dd] = date.split("-");
        return `${dd}.${mm}`;
    }

    const [isOpenSelectMonth, setIsOpenSelectMonth] = useState(true);
    const [existingLessonsTime, setExistingLessonsTime] = useState(null);

    const {
        register: registerTime,
        formState: {
            errors: errorsTime
        },
        handleSubmit: handleTimeSubmit,
        reset: resetTime,
        watch: watchTime,
        setValue: setTimeValue
    } = useForm({
        "mode": "onBlur",
    });

    const watchTYear = watchTime("year");

    async function returnExistingLessonsTime() {
        await makeRequest({
            method: "GET",
            route: api_url + "/api/lessons/returnExistingLessonsTime",
            setFunction: setExistingLessonsTime
        })
    }

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

    useEffect(() => {
        returnExistingLessonsTime();
    }, []);



    return (
        <div className={s.GroupPage} style={{ display: "flex" }}>
            {
                existingLessonsTime && (
                    <UniversalModal
                        isOpen={isOpenSelectMonth}
                        onClose={() => setIsOpenSelectMonth(false)}
                        title={"Выбор года и месяца"}
                        content={
                            <form className={modal_s.common} onSubmit={handleTimeSubmit(getFullGroupInfo)}>
                                <div className={modal_s.items}>
                                    <div className={modal_s.item}>
                                        <p>Выберите год</p>
                                        <select
                                            {...registerTime("year")}
                                        >
                                            {
                                                Object.keys(existingLessonsTime).map((year) => {
                                                    return <option value={year}>{year}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    {
                                        watchTYear && (
                                            <div className={modal_s.item}>
                                                <p>Выберите месяц</p>
                                                <select
                                                    {...registerTime("month")}
                                                >
                                                    {
                                                        existingLessonsTime[watchTYear].map((month) => {
                                                            return <option value={month}>{NumberToMonth[parseInt(month) - 1]}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={modal_s.buttons}>
                                    <button className={modal_s.close}>
                                        Закрыть
                                    </button>
                                    <button className={modal_s.apply} type="submit">
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        }
                    />
                )
            }
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление группой</h5>
                        <button className={s.get} onClick={() => setIsOpenSelectMonth(true)}>
                            Получить данные по месяцу
                        </button>
                        {
                            fullGroupInfo && Object.keys(fullGroupInfo).length > 0 &&
                            Array.isArray(fullGroupInfo.group_lessons) && (
                                <div className={s.table__outer}>
                                    <div className={s.table__header}>
                                        <p>Группа <span>12/23</span> (Модуль 1 2025)</p>
                                    </div>
                                    <FollowButton>
                                        <div className={s.table__abertka}>
                                            <table className={s.group__table}>
                                                <thead>
                                                    <tr>
                                                        <th>id</th>
                                                        <th>ФИО</th>
                                                        {
                                                            Object.entries(fullGroupInfo.group_lessons).map(([k, v]) => {
                                                                return <th key={[k, v]}>{toDDMM(v.date)}</th>
                                                            })
                                                        }
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {fullGroupInfo.students.map((student) => (
                                                        <tr key={student.id}>
                                                            <td>{student.id}</td>
                                                            <td>{student.full_name}</td>
                                                            {fullGroupInfo.group_lessons.map((lesson) => {
                                                                const grade = lesson.grades.find(g => g.student_id === student.id);
                                                                const attendance = lesson.attendances.find(a => a.student_id === student.id);
                                                                return (
                                                                    <td key={lesson.id} className={s.grade} onClick={() => {
                                                                        resetGrade();
                                                                        clickOnGrade();
                                                                        if (grade) {
                                                                            setGradeValue("grade_id", grade.id);
                                                                            setGradeValue("grade", grade.value);
                                                                        } if (attendance) {
                                                                            setGradeValue("attendance_id", attendance.id);
                                                                            setGradeValue("status", attendance.status);
                                                                        }
                                                                        setGradeValue("student_id", student.id);
                                                                        setGradeValue("student_full_name", student.full_name);
                                                                        setGradeValue("lesson_id", lesson.id);
                                                                        setGradeValue("lesson_date", lesson.date);
                                                                    }}>
                                                                        {grade?.value || "-"} / {attendance?.status || "—"}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                </tbody>

                                            </table>
                                        </div>
                                    </FollowButton>
                                    <UniversalModal
                                        isOpen={isOpenedGradeModal}
                                        onClose={() => setIsOpenedGradeModal(false)}
                                        title={"Оценка / пропуск"}
                                        content={
                                            <form className={modal_s.common} onSubmit={handleGradeSubmit(updateLesson)}>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>id урока</p>
                                                        <input
                                                            {...registerGrade("lesson_id")}
                                                            type="text"
                                                            readOnly
                                                            className={modal_s.id}
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>Дата урока</p>
                                                        <input
                                                            {...registerGrade("lesson_date")}
                                                            type="text"
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>id студента</p>
                                                        <input
                                                            {...registerGrade("student_id")}
                                                            type="text"
                                                            readOnly
                                                            className={modal_s.id}
                                                        />
                                                    </div>
                                                    <div className={modal_s.item}>
                                                        <p>ФИО студента</p>
                                                        <input
                                                            {...registerGrade("student_full_name")}
                                                            type="text"
                                                            readOnly
                                                        />
                                                    </div>
                                                    {
                                                        watch_grade && (
                                                            <div className={modal_s.item}>
                                                                <p>id оценки</p>
                                                                <input
                                                                    {...registerGrade("grade_id")}
                                                                    type="text"
                                                                    readOnly
                                                                    className={modal_s.id}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <div className={modal_s.item}>
                                                        <p>Оценка за занятие</p>
                                                        <select
                                                            {...registerGrade("grade")}>
                                                            {
                                                                ["-", "2", "3", "4", "5"].map((grade) => {
                                                                    return <option key={grade} value={grade === "-" ? null : grade}>{grade}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    {
                                                        watch_attendance && (
                                                            <div className={modal_s.item}>
                                                                <p>id пропуска</p>
                                                                <input
                                                                    {...registerGrade("attendance_id")}
                                                                    type="text"
                                                                    readOnly
                                                                    className={modal_s.id}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    <div className={modal_s.item}>
                                                        <p>Пропуск</p>
                                                        <select
                                                            {...registerGrade("status")}
                                                        >
                                                            {
                                                                ["—", "нб", "нб_ув", "оп"].map((status) => {
                                                                    return <option key={status} value={status}>{status}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={modal_s.buttons}>
                                                    <button className={modal_s.close}>
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
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}