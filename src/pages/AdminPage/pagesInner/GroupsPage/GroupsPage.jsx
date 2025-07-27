import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./GroupsPage.module.scss";


export default function GroupsPage() {
    return (
        <div className={s.GroupsPage} style={{display: "flex"}}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{width: "100%"}}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}></div>
                </main>
            </div>
        </div>
    )
}