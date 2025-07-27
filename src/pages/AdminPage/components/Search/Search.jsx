import search from "../../../../assets/imgs/vector/search.svg";
import s from "./Search.module.scss";

export default function Search () {
    return (
        <div className={s.Search}>
            <img src={search} alt="" />
            <input type="text" placeholder="Найти команду" />
        </div>
    )
}