import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ReallyAdminPage.module.scss";

import { useState } from "react";


export default function ProfilePage() {

    const [isModalDataOpen, setIsModalDataOpen] = useState(false);
    const [isModalDangerOpen, setIsModalDangerOpen] = useState(false);

    function handleSave() {
        console.log("Сохранено");
        setIsModalDataOpen(false);
    }

    return (
        <div className={s.ProfilePage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}