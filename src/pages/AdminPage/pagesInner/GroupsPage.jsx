import AdminHeader from "../components/AdminHeader/AdminHeader.jsx";
import SideBar from "../components/SideBar/SideBar.jsx";

export default function GroupsPage() {
    return (
        <>
            <div className="GroupsPage" style={{display: "flex"}}>
                <SideBar />
                <div className="HeaderAndContent" style={{width: "100%"}}>
                    <AdminHeader />
                </div>
            </div>
        </>
    )
}