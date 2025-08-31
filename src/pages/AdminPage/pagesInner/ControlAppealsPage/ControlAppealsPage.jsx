import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlAppealsPage.module.scss";

import { useEffect, useState } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useNavigate } from "react-router-dom";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

import { useApi } from "../../../../hooks/useApi.js";

import LoadingFallBackFullScreen from "../../../../components/LoadingFallBack/LoadingFallBackFullScreen.jsx";

export default function ControlAppealsPage() {

    const {makeRequest} = useApi();

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
        makeRequest({
            method: "GET",
            route: api_url + "/api/appeals/",
            setFunction: setAppeals
        })
    }

    useEffect(() => {
        getAppeals();
    }, []);

    async function editAppeal(statusObj) {
        const result = await makeRequest({
            method: "PATCH",
            route: api_url + `/api/appeals/update/${currentAppeal.id}`,
            body: statusObj,
        })

        getAppeals();

        setIsEditUserModalOpen(false);
        
        if (result && result.user_id) {
            Navigate("/diploma/reallyadmin/usersControl", {
                state: { refresh: true, user_id: result.user_id}
            });
        }
    }

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        
                        <h5>Управление заявками</h5>
                        {
                            Array.isArray(appeals) && Object.keys(appeals).length > 0 ? (
                                <FollowButton>
                                    <div className={s.table__abertka}>
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
                                    </div>
                                </FollowButton>
                            ) : <LoadingFallBackFullScreen />
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
                </main>
            </div>
        </div>
    );
}