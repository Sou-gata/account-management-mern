import LeftSideBar from "./LeftSideBar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import { Context } from "../context/UserContext";
import { useEffect, useContext } from "react";
import axios from "axios";
import baseUrl from "../../baseUrl";
import Header from "./Header";

const Layout = () => {
    const { pathname } = useLocation();
    const { setUser } = useContext(Context);
    useEffect(() => {
        (async () => {
            let token = localStorage.getItem("token");
            if (token) {
                let verify = await axios.post(`${baseUrl}/api/user/verify`, {
                    token,
                });
                verify = verify.data;
                if (!verify.error) {
                    setUser({
                        id: verify.id,
                        name: verify.name,
                        admin: verify.admin,
                        mobile: verify.mobile,
                    });
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            id: verify.id,
                            name: verify.name,
                            admin: verify.admin,
                            mobile: verify.mobile,
                        })
                    );
                    localStorage.setItem("token", verify.token);
                } else {
                    setUser(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
        })();
    }, []);
    return (
        <div className="main-layout">
            <Header />
            <div className="flex">
                <div style={{ width: 255 + "px" }}>
                    <LeftSideBar />
                </div>
                <div className="main-section">
                    {pathname === "/" ? <Dashboard /> : <Outlet />}
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
};

export default Layout;
