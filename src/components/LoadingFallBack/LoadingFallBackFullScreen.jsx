import loading from "../../assets/imgs/vector/loading.svg";
import logo from '../../assets/imgs/vector/logo.svg';
import s from "./Loading.module.scss";

export default function LoadingFallBackFullScreen() {
    return (
        <div className={s.loadingFullScreen}>
            <div className={s.content}>
                <img src={loading} alt="" />
                Загрузка
            </div>
        </div>
    )
}