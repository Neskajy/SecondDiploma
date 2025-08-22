import AdminBurgerButton from "../AdminBurgerButton/AdminBurgerButton";
import s from "./AdminHeader.module.scss";
import Search from "../Search/Search.jsx";
import bell from "../../../../assets/imgs/vector/bell.svg";
import user404 from "../../../../assets/imgs/vector/user.svg";
import { Link } from "react-router-dom";
import { makeRequest } from "../../../../api/apiClient.js";
import { useEffect, useState } from "react";

export default function AdminHeader() {

    const api_url = import.meta.env.VITE_BACKEND_URL;

    const [userData, setUserData] = useState(null);

    async function getUserData() {
        await makeRequest({
            method: "GET",
            route: api_url + "/api/users/getUser",
            setFunction: setUserData
        });
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <header className={s.AdminHeader}>
                <div className={s.container}>
                    <div className={s.left}>
                        <AdminBurgerButton />
                        <Search />
                    </div>
                    {
                        userData && (
                            <div className={s.right}>
                                <div className={s.img}>
                                    <img src={bell} alt="" className={s.bell} />
                                </div>
                                <Link to="/diploma/profile" className={s.profile__preview}>
                                    <img className={s.user__img} src={user404} alt="" />
                                    <div className={s.user__name}>
                                        <div className={s.text}>
                                            <span className={s.name}>{userData.name}</span>
                                            <span className={s.status}>{userData.role}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </header>
        </>
    )
}