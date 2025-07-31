import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ControlAppealsPage.module.scss";

import warning from "../../../../assets/imgs/vector/warning.svg";

import { useState } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss";

import { useForm } from "react-hook-form";

import FollowButton from "../../../../components/FollowButton/FollowButton.jsx";

export default function ControlUsersPage() {

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

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

    const response = [
        {
            "id": 1,
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
        },
        {
            "id": 2,
            "email": "Почта",
            "phone": "+8 (800) 555 35 35",
        },
    ]

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
                                <table
                                >
                                    <thead>
                                        <tr>
                                            {
                                                Object.keys(response.at(0)).map((key) => {
                                                    return <th key={key}>{key}</th>;
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            response.map((item) => {
                                                return <tr onClick={() => setIsEditUserModalOpen(true)}>
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
                                <UniversalModal
                                    isOpen={isEditUserModalOpen}
                                    onClose={() => setIsEditUserModalOpen(false)}
                                    applyText="Принять"
                                    closeText="Игнорировать"
                                    content={
                                        <section className={modal_s.common}>
                                            <h5>Принять заявку?</h5>
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