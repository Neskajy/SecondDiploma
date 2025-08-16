import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlAppealsPage.module.scss";

import warning from "../../../../assets/imgs/vector/warning.svg";

import { useEffect, useState } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";
import { Exception } from "sass";

export default function ControlAppealsPage() {

    const Navigate = useNavigate();

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [appeals, setAppeals] = useState(null);
    const [currentAppeal, setCurrentAppeal] = useState(null);

    function openEditableModal(data) {
        setCurrentAppeal(data);
        setIsEditUserModalOpen(true);
    }

    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function getAppeals() {
        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];

        const request = await fetch(api_url + "/api/appeals/", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
            },
            credentials: "include"
        });

        const response = await request.json();
        setAppeals(response);
    }

    async function editAppeal(statusObj) {

        if (statusObj.new_status === currentAppeal.status) {
            alert("Вы не можете указать текущий статус");
            return;
        }

        const xsrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
        try {
            const request = await fetch(api_url + `/api/appeals/update/${currentAppeal.id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
                },
                body: JSON.stringify(statusObj)
            });

            
            if (!request.ok) {
                console.log(request);
                throw new Error("Ошибка при обновлении обращения");
            }

            const response = await request.json();

            getAppeals();
            if (response.user_id) {
                Navigate("/diploma/reallyadmin/usersControl", {
                    state: { refresh: true, user_id: response.user_id}
                });
            }
            setIsEditUserModalOpen(false);
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Не удалось обновить обращение");
        }
    }

    useEffect(() => {
        getAppeals();
    }, []);

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление заявками</h5>
                        <FollowButton>

                            <div className={s.table__abertka}>
                                {
                                    appeals && Object.keys(appeals).length > 0 ? (
                                        <table
                                        >
                                            <thead>
                                                <tr>
                                                    {
                                                        Object.keys(appeals.at(0)).map((key) => {
                                                            return <th key={key}>{key}</th>;
                                                        })
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    appeals.map((item) => {
                                                        return <tr onClick={() => openEditableModal(item)}>
                                                            {
                                                                Object.entries(item).map(([key, value]) => {
                                                                    return <td>{value}</td>
                                                                })
                                                            }
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    ) : <p>Заявок нет</p>
                                }
                                <UniversalModal
                                    isOpen={isEditUserModalOpen}
                                    onClose={() => setIsEditUserModalOpen(false)}
                                    content={
                                        <section className={modal_s.common}>
                                            <h5>Принять заявку?</h5>
                                            <div className={modal_s.buttons}>
                                                <button className={modal_s.apply} onClick={() => editAppeal({
                                                    "status": "accepted"
                                                })}>
                                                    Принять
                                                </button>
                                                <button className={modal_s.close} onClick={() => editAppeal({
                                                    "status": "in_progress"
                                                })}>
                                                    Поставить на рассмотрение
                                                </button>
                                                <button className={modal_s.close} onClick={() => editAppeal({
                                                    "status": "rejected"
                                                })}>
                                                    Отклонить
                                                </button>
                                            </div>
                                        </section>
                                    }
                                />
                            </div>
                        </FollowButton>
                    </div>
                </main>
            </div>
        </div>
    );
}