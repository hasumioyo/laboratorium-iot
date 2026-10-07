import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import "./layout.css"

const Layout = () => {
    return(
        <>
            <div className="layout-container">
                <SideBar/>
                <main className="layout-content">
                    <Outlet/>
                </main>
            </div>
        </>
    )
}
export default Layout;