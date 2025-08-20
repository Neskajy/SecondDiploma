import AdminHeader from "../../../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../../../components/SideBar/SideBar.jsx";
import s from "./GroupPage.module.scss";
import Plus from "../../../../../../assets/imgs/vector/plus.svg?react";

import UniversalModal from "../../../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../../../components/UniversalModal/UniversalModal.module.scss";

import FollowButton from "../../../../../../components/FollowButton/FollowButton.jsx";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function GroupPage() {

    const [isActiveAddColumnModalContext, setIsActiveAddColumnModalContext] = useState(false);
    const [isOpenedGradeModal, setIsOpenedGradeModal] = useState(false);

    const location = useLocation().pathname;
    const groupId = parseInt(location.split("/").slice(-1)[0]);
    const api_url = import.meta.env.VITE_BACKEND_URL;

    function getXsrfToken() {
        const token = document.cookie.split(";").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        return token;
    }

    const [fullGroupInfo, setFullGroupInfo] = useState(null);

    async function getFullGroupInfo() {
        const request = await fetch(api_url + "/api/groups/fullGroupInfo/" + groupId, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(getXsrfToken())
            },
            "credentials": "include",
        });

        const response = await request.json();
        setFullGroupInfo(response);
    }

    useEffect(() => {
        getFullGroupInfo();
    }, []);



    function clickOnGrade() {
        setIsOpenedGradeModal(true);
    }

    function openModal() {
        setIsActiveAddColumnModalContext(true);
    }

    function handleSave() {
        alert("Успешно");
        setIsActiveAddColumnModalContext(false);
    }


    return (
        <div className={s.GroupPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление группой</h5>
                        <div className={s.table__outer}>
                            <div className={s.table__header}>
                                <p>Группа <span>12/23</span> (Модуль 1 2025)</p>
                            </div>

                            <FollowButton>

                                <div className={s.table__abertka}>
                                    {
                                        fullGroupInfo !== null && Object.keys(fullGroupInfo).length > 0 ? (
                                            <table className={s.group__table}>
                                                <thead>
                                                    <tr>
                                                        <th>id</th>
                                                        <th>ФИО</th>
                                                        {
                                                            Object.entries(fullGroupInfo.group_lessons).map(([k, v]) => {
                                                                return <th>{v.date}</th>
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
                                                                    <td key={lesson.id} className={s.grade} onClick={clickOnGrade}>
                                                                        {grade?.value || "-"} / {attendance?.status || "—"}
                                                                    </td>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                </tbody>

                                                <UniversalModal
                                                    isOpen={isOpenedGradeModal}
                                                    onClose={() => setIsOpenedGradeModal(false)}
                                                    onApply={handleSave}
                                                    title={"Оценка / пропуск"}
                                                    content={
                                                        <form className={modal_s.common}>
                                                            <div className={modal_s.items}>
                                                                <div className={modal_s.item}>
                                                                    <p>Оценка за занятие</p>
                                                                    <select>
                                                                        {
                                                                            ["-", "2", "3", "4", "5"].map((grade) => {
                                                                                return <option value={grade}>{grade}</option>
                                                                            })
                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className={modal_s.item}>
                                                                    <p>Пропуск</p>
                                                                    <select>
                                                                        {
                                                                            ["—", "нб", "о", "н", "ув"].map((grade) => {
                                                                                return <option value={grade}>{grade}</option>
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
                                            </table>
                                        ) : ""
                                    }
                                </div>
                            </FollowButton>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}