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

import { useApi } from "../../../../../../hooks/useApi.js";

import LoadingFallBackFullScreen from "../../../../../../components/LoadingFallBack/LoadingFallBackFullScreen.jsx";

import { useToast } from "../../../../../../components/Notification/Notification.jsx";

import warning from "../../../../../../assets/imgs/vector/warning.svg";

export default function GroupPage() {

    const {makeRequest} = useApi();

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
            setFunction: setFullGroupInfo,
            isToast: false
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

    function toDDMMYY(date) {
        const [yy, mm, dd] = date.split("-");
        return `${dd}.${mm}.${yy}`;
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

    const pad = (num) => (num < 10 ? `0${num}` : `${num}`);
    
    const today = new Date();
    const todayMonth = pad(today.getMonth() + 1);
    
    useEffect(() => {
        setTimeValue("month", todayMonth)
    }, []);

    async function returnExistingLessonsTime(data) {
        await makeRequest({
            method: "POST",
            route: api_url + "/api/lessons/returnExistingLessonsTime",
            setFunction: setExistingLessonsTime,
            body: data,
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
        returnExistingLessonsTime({
            "group_id": String(groupId)
        });
        getGroups();
        getTeachers();
        getTimetables();
    }, []);

    const [isStartLesson, setIsStartLesson] = useState(false);

    
    async function startLesson(data) {
        const newData = {
            "status": "in_progress"
        }
        await makeRequest({
            method: "PATCH",
            route: `${api_url}/api/lessons/update/${data.id}`,
            body: newData
        });
        getFullGroupInfo(currentMonth);
        setIsStartLesson(false);
    }

    const [currentLessonId, setCurrentLessonId] = useState(null);

    const [isActiveEditEventModal, setIsActiveEditEventModal] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        watch,
    } = useForm({ mode: "onBlur" });

    const [groupsBackend, setGroups] = useState(null);
    const [timetables, setTimetables] = useState(null);
    const [teachers, setTeachers] = useState(null);

    const lessonId = watch("id");
    const lessonStatus = watch("status");
    const isCancelled = watch("isCancelled");

    async function updateLessonInfo(data) {
        let { id, ...withoutId } = data;

        let updatedData;
        if (data.isCancelled) {
            updatedData = {...withoutId, status: "cancelled"}
        } else {
            updatedData = withoutId;
        }

        await makeRequest({
            method: "PATCH",
            route: `${api_url}/api/lessons/update/${id}`,
            body: updatedData,
        });
        getFullGroupInfo(currentMonth);
        setIsActiveEditEventModal(false);
    }

    async function getGroups() {
        await makeRequest({
            method: "GET",
            route: `${api_url}/api/groups/justGroups`,
            setFunction: setGroups,
        });
    }

    async function getTimetables() {
        await makeRequest({
            method: "GET",
            route: `${api_url}/api/timetable`,
            setFunction: setTimetables,
        });
    }

    async function getTeachers() {
        await makeRequest({
            method: "GET",
            route: `${api_url}/api/users/teachers`,
            setFunction: setTeachers,
        });
    }

    const withoutSeconds = (time) => {
        const [hour, minutes] = time.split(":");
        return `${hour}:${minutes}`;
    };


    return (
        <div className={s.GroupPage} style={{ display: "flex" }}>
            {
                existingLessonsTime && Object.keys(existingLessonsTime) > 0 && (
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
                    {
                        fullGroupInfo && Object.keys(fullGroupInfo).length > 0 &&
                        Array.isArray(fullGroupInfo.group_lessons) ? (
                        <div className={s.container}>
                            <h5>Управление группой</h5>
                            <div className={s.buttons}>
                                <button className={s.get} onClick={() => setIsOpenSelectMonth(true)}>
                                    Получить данные по месяцу
                                </button>
                            </div>
                            <div className={s.table__outer}>
                                <div className={s.table__header}>
                                    <p>Группа <span>{fullGroupInfo.group_name}</span> (Модуль n 0000)</p>
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
                                                            if (!["in_progress", "completed"].includes(v.status)) {
                                                                return;
                                                            }
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
                                                            
                                                            if (!["in_progress", "completed"].includes(lesson.status)) {
                                                                return;
                                                            }
                                                            
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
                                                <button className={modal_s.apply} type="submit">
                                                    Сохранить
                                                </button>
                                                <button className={modal_s.close}>
                                                    Закрыть
                                                </button>
                                            </div>
                                        </form>
                                    }
                                />
                            </div>
                            <div className={s.lessons}>
                                <h5>Информация о занятиях в этом месяце</h5>
                                {
                                    ['in_progress', 'planned', 'completed','cancelled'].map((category) => {
                                        return (
                                            <div className={s.category}>
                                                <h6>{category}</h6>
                                                <div className={s.lessons_container}>
                                                    {
                                                        fullGroupInfo.group_lessons.sort((a, b) => a.date.localeCompare(b.date)).map((lesson) => {
                                                            if (lesson.status === category) {
                                                                return (
                                                                    <li className={s.lesson} key={lesson.date} onClick={
                                                                        (e) => {
                                                                            console.log(lesson)
                                                                            setValue("id", lesson.id);
                                                                            setValue("cabinet", lesson.cabinet);
                                                                            setValue("group", lesson.group);
                                                                            setValue("timetable", lesson.timetable_name);
                                                                            setValue("color", "#" + lesson.color);
                                                                            setValue("date", lesson.date);
                                                                            setValue("lesson_start", withoutSeconds(lesson.lesson_start));
                                                                            setValue("lesson_end", withoutSeconds(lesson.lesson_end));
                                                                            setValue("isCancelled", lesson.is_cancelled);
                                                                            setValue("status", lesson.status);
                                                                            setValue("cancellation_reason", lesson.cancellation_reason);
                                                                            setIsActiveEditEventModal(true);
                                                                        }
                                                                    }>
                                                                        <span className={s.absolute__top}></span>
                                                                        <p className={s.name}>{toDDMMYY(lesson.date)}</p>
                                                                        <div className={s.bottom}>
                                                                            <p>Начало занятия: <span>{lesson.lesson_start}</span></p>
                                                                            <p>Окончание занятия: <span>{lesson.lesson_end}</span></p>
                                                                        </div>
                                                                        {
                                                                            lesson.status === "planned" && (
                                                                                <button 
                                                                                    className={s.more}
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        startLesson({
                                                                                            id: lesson.id
                                                                                        })
                                                                                    }}>
                                                                                    Начать занятие
                                                                                </button>
                                                                            )
                                                                        }
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <UniversalModal
                                    onClose={() => setIsActiveEditEventModal(false)}
                                    isOpen={isActiveEditEventModal}
                                    title="Изменить информацию о занятии"
                                    content={
                                        <form className={modal_s.common} onSubmit={handleSubmit(updateLessonInfo)}>
                                            <div className={modal_s.items}>
                                                <div className={modal_s.item}>
                                                    <p>id</p>
                                                    <input
                                                        type="text"
                                                        {...register("id")}
                                                        readOnly
                                                    />
                                                </div>
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
                                                        {groupsBackend && Array.isArray(groupsBackend) ? (
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
                                                    <p>Учитель</p>
                                                    <select
                                                        {...register("teacher_id")}
                                                    >
                                                        {teachers && Array.isArray(teachers) ? (
                                                            teachers.map((item) => (
                                                                <option value={item.id} key={item.id}>
                                                                    {item.full_name}
                                                                </option>
                                                            ))
                                                        ) : ""
                                                        }
                                                    </select>
                                                    <div className={modal_s.message}>{errors?.teachers && <div className={s.message}><img src={warning} /><p>{errors?.teachers.message || "Error!"}</p></div>}</div>
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
                                                {
                                                    (lessonStatus == "planned" || lessonStatus == "in_progress") && (
                                                        <div className={modal_s.item}>
                                                            <p>Отменить пару</p>
                                                            <input
                                                                type="checkbox"
                                                                {...register("isCancelled")}
                                                            />
                                                            {
                                                                isCancelled && (
                                                                    <div className={modal_s.item}>
                                                                        <p>Причина отмены</p>
                                                                        <textarea
                                                                            {...register("cancellation_reason", {
                                                                                required: "Поле обязательно к заполнению"
                                                                            })}
                                                                        />
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                isCancelled && (
                                                                    <div className={modal_s.message}>{errors?.cancellation_reason && <div className={s.message}><img src={warning} /><p>{errors?.cancellation_reason.message || "Error!"}</p></div>}</div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className={modal_s.buttons}>
                                                <button className={modal_s.apply} type="submit">
                                                    Сохранить
                                                </button>
                                                <button className={modal_s.close} onClick={() => deleteLesson(lessonId)}>
                                                    Удалить
                                                </button>
                                            </div>
                                        </form>
                                    }
                                />
                            </div>
                        </div> ) : <LoadingFallBackFullScreen />
                        }
                </main>
            </div>
        </div>
    )
}