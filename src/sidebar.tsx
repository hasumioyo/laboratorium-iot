import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/", {
            replace: true
        });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-title">
                <h2>DATA INVENTARIS</h2>
                <h3>LABORATORIUM IOT</h3>
            </div>
            <nav className="sidebar-menu">
                <button className="menu-item" onClick={() => navigate("/dashboard")}><i className="fas fa-home"></i>Dashboard</button>
                <p className="menu-title">MENU</p>
                <button className="menu-item" onClick={() => navigate("/inventaris")}><i className="fas fa-archive"></i>Manajemen Inventaris</button>
            </nav>
            <button className="logout-button" data-bs-toggle="modal" data-bs-target="#logoutModal"><i className="fas fa-sign-out-alt"></i> Logout</button>
            
            <div className="modal fade" id="logoutModal" tabIndex={-1} aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">Konfirmasi Logout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">Apakah kamu yakin ingin logout?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;