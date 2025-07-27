import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./ArticlesPage.module.scss";


export default function ArticlesPage() {
    return (
        <div className={s.ArticlesPage} style={{display: "flex"}}>
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