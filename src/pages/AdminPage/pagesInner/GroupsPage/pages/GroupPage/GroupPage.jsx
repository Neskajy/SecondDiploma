import AdminHeader from "../../../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../../../components/SideBar/SideBar.jsx";
import s from "./GroupPage.module.scss";

import Search from "../../../../components/Search/Search.jsx";

import Plus from "../../../../../../assets/imgs/vector/plus.svg?react";

import { AddColumnModalContext } from "../../../../../../Contexts.jsx";
import { OpenGradeModalContext } from "../../../../../../Contexts.jsx";

import { useState } from "react";

import AddGroupModal from "../../modals/AddColumnModal/AddColumnModal.jsx";
import OpenGradeModal from "../../modals/OpenGradeModal/OpenGradeModal.jsx";

export default function GroupPage() {

    const [isActiveAddColumnModalContext, setIsActiveAddColumnModalContext] = useState(false); 
    const [isOpenedGradeModal, setIsOpenedGradeModal] = useState(false);

    const response = [
        {
            "id": 1,
            "ФИО": "hz hz hz",
            "10.09": "5",
            "17.09": "5",
            "24.09": "5",
            "30.09": "5",
            "ср.балл сентябрь": "5.00",
            "06.10": "5",
            "13.10": "5",
            "20.10": "5",
            "27.10": "5",
            "ср.балл октябрь": "5.00",
            "04.11": "5",
            "ср.балл ноябрь": "5.00"
        },
    ];

    function clickOnGrade(isGrade) {
        if (isGrade) {
            console.log("Ура")
        }
    }

    function openModal() {
        setIsActiveAddColumnModalContext(true);
    }



    return (
        <OpenGradeModalContext.Provider value={{isOpenedGradeModal, setIsOpenedGradeModal}}>
            <AddColumnModalContext.Provider value={{isActiveAddColumnModalContext, setIsActiveAddColumnModalContext}}>
                <div className={s.GroupPage} style={{ display: "flex" }}>
                    <SideBar />
                    <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                        <AdminHeader />
                        <main className={s.main}>
                            <div className={s.container}>
                                <h5>Управление группой</h5>
                                <div className={s.table__outer}>
                                    <div className={s.table__header}>
                                        <p>Группа 12/23 (Модуль 1 2025)</p>
                                    </div>
                                    <div className={s.table__abertka}>
                                        <table className={s.group__table}>
                                            <thead>
                                                <tr>
                                                    {
                                                        Object.entries(response.at(0)).map(([key, value]) => {
                                                            return <th key={key}>{key}</th>;
                                                        })
                                                    }
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    response.map((item) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                {Object.entries(item).map(([key, value]) => {
                                                                    // Определяем, является ли это ячейка оценкой
                                                                    const isGrade = /^\d{1,2}\.\d{2}$/.test(key) &&
                                                                        key !== 'ср.балл' &&
                                                                        !key.startsWith('ср.балл');

                                                                    return (
                                                                        <td
                                                                            key={key}
                                                                            onClick={() => {
                                                                                clickOnGrade(isGrade)
                                                                            }}
                                                                        >
                                                                            {value}
                                                                        </td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        );
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        <div className={s.add__button} onClick={openModal}>
                                            <Plus className={s.icon} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                
                {isActiveAddColumnModalContext ? <AddGroupModal /> : ""}
            </AddColumnModalContext.Provider>
        </OpenGradeModalContext.Provider>
    )
}