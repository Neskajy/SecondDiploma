import AdminBurgerButton from "../AdminBurgerButton/AdminBurgerButton";
import s from "./AdminHeader.module.scss";
import Search from "../Search/Search.jsx";
import bell from "../../../../assets/imgs/vector/bell.svg";
import user404 from "../../../../assets/imgs/vector/user.svg";
import { Link } from "react-router-dom";

export default function AdminHeader() {
    return (
        <>
            <header className={s.AdminHeader}>
                <div className={s.container}>
                    <div className={s.left}>
                        <AdminBurgerButton />
                        <Search />
                    </div>
                    <div className={s.right}>
                        <div className={s.img}>
                            <img src={bell} alt="" className={s.bell} />
                        </div>
                        <Link to="/admin/profile" className={s.profile__preview}>
                            <img className={s.user__img} src={user404} alt="" />
                            <div className={s.user__name}>
                                <div className={s.text}>
                                    <span className={s.name}>Имя</span>
                                    <span className={s.status}>Методист</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}