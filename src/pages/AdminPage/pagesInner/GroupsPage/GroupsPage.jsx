import AdminHeader from "../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import s from "./GroupsPage.module.scss";

import modal_s from "../../../../components/UniversalModal/UniversalModal.module.scss"; 

import { useState } from "react";

import UniversalModal from "../../../../components/UniversalModal/UniversalModal.jsx";

import { Link, useLocation } from "react-router-dom";


export default function GroupsPage() {

    const path = useLocation().pathname;

    const [isAddGroupModalActive, setIsAddGroupModalActive] = useState(false);

    const handleSave = () => {
        alert("сохранено");
        setIsAddGroupModalActive(false);
    }
    // const response = [
    //     {

    //     }
    // ];

    // Данные приходят с сортировкой в порядке возврастания по курсам. Внутри каждого курса группы сортируются по их числу в порядке возврастания. Сначала, например, 1223, затем 1224 и т.д. 

    return (
        <div className={s.GroupsPage} style={{display: "flex"}}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{width: "100%"}}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Группы</h5>
                        <button className={s.add__group} onClick={() => {setIsAddGroupModalActive(true)}}>
                            Добавить группу
                        </button>
                        <UniversalModal 
                            isOpen={isAddGroupModalActive}
                            onClose={() => setIsAddGroupModalActive(false)}
                            onApply={handleSave}
                            title={"Добавить группу"}
                            content={
                                <section className={modal_s.common}>
                                    <div className={modal_s.items}>
                                        <div className={modal_s.item}>
                                            <p>Название</p>
                                            <input 
                                                type="text"
                                            />
                                        </div>
                                        <div className={modal_s.item}>
                                            <p>Год поступления</p>
                                            <input 
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </section>
                            }
                            applyText="Сохранить"
                            closeText="Закрыть"
                        /> 
                        <div className={s.group__list}>
                            <div className={s.subgroup__list}>
                                <h6>1 курсы</h6>
                                <ul className={s.groups}>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}>Идет занятие</span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}></span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={s.subgroup__list}>
                                <h6>2 курсы</h6>
                                <ul className={s.groups}>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}></span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}>Идет занятие</span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={s.subgroup__list}>
                                <h6>3 курсы</h6>
                                <ul className={s.groups}>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}>Идет занятие</span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                    <li className={s.group}>
                                        <Link to={`${path}/group`}>
                                            <span className={s.absolute__top}></span>
                                            <p className={s.name}>???</p>
                                            <div className={s.bottom}>
                                                <p className={s.year__of___receipt}>Год поступления: <span>2025</span></p>
                                                <p className={s.students__count}>Кол-во студентов: <span>999</span></p>
                                            </div>
                                            <button className={s.more}>Больше информации</button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
    )
}