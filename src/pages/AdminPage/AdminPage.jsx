import AdminHeader from "./components/AdminHeader/AdminHeader.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";

export default function AdminPage() {

    return (
        <div className="AdminPage" style={{display: "flex"}}>
            <SideBar />
            <div className="HeaderAndContent" style={{width: "100%"}}>
                <AdminHeader />
            </div>
        </div>
    )
}