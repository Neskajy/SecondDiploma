import AdminHeader from "../../../../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../../../../components/SideBar/SideBar.jsx";
import s from "./GroupPage.module.scss";
import Plus from "../../../../../../assets/imgs/vector/plus.svg?react";

import UniversalModal from "../../../../../../components/UniversalModal/UniversalModal.jsx";
import modal_s from "../../../../../../components/UniversalModal/UniversalModal.module.scss";

import { useState } from "react";

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
            setIsOpenedGradeModal(true);
        }
    }

    function openModal() {
        setIsActiveAddColumnModalContext(true);
    }

    function handleSave() {
        alert("Успешно");
        setIsActiveAddColumnModalContext(false);
    }


    return (
        <div className={s.GroupPage} style={{ display: "flex" }}>
            <SideBar />
            <div className={s.HeaderAndContent} style={{ width: "100%" }}>
                <AdminHeader />
                <main className={s.main}>
                    <div className={s.container}>
                        <h5>Управление группой</h5>
                        <div className={s.table__outer}>
                            <div className={s.table__header}>
                                <p>Группа <span>12/23</span> (Модуль 1 2025)</p>
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
                                    <UniversalModal
                                        isOpen={isOpenedGradeModal}
                                        onClose={() => setIsOpenedGradeModal(false)}
                                        onApply={handleSave}
                                        title={"Изменить / поставить оценку"}
                                        content={
                                            <section className={modal_s.common}>
                                                <div className={modal_s.items}>
                                                    <div className={modal_s.item}>
                                                        <p>Заслужил</p>
                                                        <div className={modal_s.checkboxes}>
                                                            {['н', '2', '3', '4', '5'].map((value) => (
                                                                <div className={modal_s.checkbox} key={value}>
                                                                    <p>{value}</p>
                                                                    <input type="radio" name="grade" value={value} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        }
                                    />
                                </table>
                                <div className={s.add__button} onClick={openModal}>
                                    <Plus className={s.icon} />
                                </div>
                                <UniversalModal
                                    isOpen={isActiveAddColumnModalContext}
                                    onClose={() => setIsActiveAddColumnModalContext(false)}
                                    onApply={handleSave}
                                    title={"Добавить колонку"}
                                    content={
                                        <section className={modal_s.common}>
                                            <div className={modal_s.items}>
                                                <div className={modal_s.item}>
                                                    <p>Дата</p>
                                                    <span className={modal_s.note}>Примечание: колонка добавиться до итоговой оценки месяца</span>
                                                    <input
                                                        type="date"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}