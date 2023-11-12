import { BsFuelPumpDieselFill, BsGiftFill, BsFillClipboardDataFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem("Dashboard", "0", <BsFillClipboardDataFill />),
    getItem("Workers", "1", <FaUser />),
    getItem("Attandance", "2", <GiNotebook />, [
        getItem("Add Attandance", "21"),
        getItem("Show Attandance", "22"),
    ]),
    getItem("Fuel", "3", <BsFuelPumpDieselFill />, [
        getItem("Km Travel", "31"),
        getItem("Fuel Record", "32"),
    ]),
    getItem("Parcel Distribution", "4", <BsGiftFill />, [
        getItem("Pickup Details", "41"),
        getItem("Delivery Details", "42"),
        getItem("Show Record", "43"),
        getItem("Show Individual Record", "45"),
        getItem("Cash Record", "44"),
    ]),
];

const LeftSideBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [selected, setSelcted] = useState("0");
    const [openKeys, setOpenKeys] = useState([]);
    const rootSubmenuKeys = ["2", "3", "4"];
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    useEffect(() => {
        if (pathname === "/") {
            setSelcted("0");
        } else if (pathname === "/workers") {
            setSelcted("1");
        } else if (pathname === "/attandance") {
            setSelcted("21");
        } else if (pathname === "/attandance/view") {
            setSelcted("22");
        } else if (pathname === "/fuel") {
            setSelcted("31");
        } else if (pathname === "/fuel/record") {
            setSelcted("32");
        } else if (pathname === "/parcel/record") {
            setSelcted("41");
        } else if (pathname === "/parcel/delivery") {
            setSelcted("42");
        } else if (pathname === "/parcel/view") {
            setSelcted("43");
        } else if (pathname === "/parcel/cash") {
            setSelcted("44");
        } else if (pathname === "/parcel/view-individual") {
            setSelcted("45");
        } else {
            setSelcted(null);
        }
    }, [pathname]);
    const onClick = (e) => {
        if (e.key === "0") {
            navigate("/");
        } else if (e.key === "1") {
            navigate("/workers");
        } else if (e.key === "21") {
            navigate("/attandance");
        } else if (e.key === "22") {
            navigate("/attandance/view");
        } else if (e.key === "31") {
            navigate("/fuel");
        } else if (e.key === "32") {
            navigate("/fuel/record");
        } else if (e.key === "41") {
            navigate("/parcel/record");
        } else if (e.key === "42") {
            navigate("/parcel/delivery");
        } else if (e.key === "43") {
            navigate("/parcel/view");
        } else if (e.key === "44") {
            navigate("/parcel/cash");
        } else if (e.key === "45") {
            navigate("/parcel/view-individual");
        }
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: 250,
                height: "calc(100vh - 4rem)",
                position: "fixed",
                top: 64,
                left: 0,
            }}
            mode="inline"
            items={items}
            defaultSelectedKeys={["0"]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            selectedKeys={[selected + ""]}
            theme="dark"
        />
    );
};

export default LeftSideBar;
