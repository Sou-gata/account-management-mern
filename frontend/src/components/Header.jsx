import { useContext, useState } from "react";
import { Context } from "../context/UserContext";
import { Modal, Dropdown } from "antd";
import axios from "axios";
import toast from "../utils";
import { Link } from "react-router-dom";
import baseUrl from "../../baseUrl";
import { motion } from "framer-motion";

const Header = () => {
    const { user, setUser } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({
        mobile: "",
        password: "",
    });
    const [hovered, setHovered] = useState(false);
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    const login = async () => {
        try {
            const { data } = await axios.post(`${baseUrl}/api/user/login`, details);
            if (!data.error) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: data.id,
                        name: data.name,
                        admin: data.admin,
                        mobile: data.mobile,
                        token: data.token,
                    })
                );
                setUser({
                    id: data.id,
                    name: data.name,
                    admin: data.admin,
                    mobile: data.mobile,
                    token: data.token,
                });
                setDetails({
                    mobile: "",
                    password: "",
                });
                setOpen(false);
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    const variants = {
        hover: {
            scale: [1, 1.5, 1],
        },
        initial: {
            scale: 1,
        },
    };
    const appName = [
        {
            label: "D",
            color: "#70d8bd",
        },
        {
            label: "o",
        },
        {
            label: "o",
        },
        {
            label: "r",
        },
        {
            label: " ",
        },
        {
            label: "T",
            color: "#70d8bd",
        },
        {
            label: "o",
        },
        {
            label: " ",
        },
        {
            label: "D",
            color: "#70d8bd",
        },
        {
            label: "o",
        },
        {
            label: "o",
        },
        {
            label: "r",
        },
    ];
    return (
        <>
            <div className="bg-[#001529] px-6 h-16 w-full flex items-center justify-between sticky top-0 right-0 z-50">
                <motion.div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="cursor-pointer"
                >
                    <Link to="/" className="text-slate-100 font-semibold text-3xl flex gap-1">
                        {appName.map((item, index) => (
                            <motion.p
                                variants={variants}
                                animate={hovered ? "hover" : "initial"}
                                key={index}
                                className={`${
                                    item.color ? "text-[" + item.color + "]" : ""
                                } cursor-pointer`}
                                transition={{
                                    delay: 0.075 * index,
                                    type: "tween",
                                }}
                            >
                                {item.label}
                            </motion.p>
                        ))}
                    </Link>
                </motion.div>
                <ul className="flex-center gap-5">
                    {!user?.admin && (
                        <li>
                            <button className="custom-button" onClick={() => setOpen(true)}>
                                Login
                            </button>
                        </li>
                    )}
                    {user?.admin && (
                        <>
                            <li className="text-slate-100 text-xl">
                                <Dropdown
                                    // trigger="click"
                                    menu={{
                                        items: [
                                            {
                                                label: (
                                                    <Link to="/change-password">
                                                        Change Password
                                                    </Link>
                                                ),
                                                key: "0",
                                            },
                                            {
                                                label: (
                                                    <button
                                                        onClick={logout}
                                                        className="text-slate-100 text-lg"
                                                    >
                                                        Logout
                                                    </button>
                                                ),
                                                key: "1",
                                            },
                                        ],
                                    }}
                                >
                                    <p className="cursor-pointer">{user?.name}</p>
                                </Dropdown>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <Modal
                title={null}
                open={open}
                onOk={(e) => {
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                okButtonProps={{ style: { background: "#bb2d3b" } }}
                footer={[
                    <div className="flex-center" key="footer">
                        <div>
                            <button key="submit" className="custom-button" onClick={login}>
                                Login
                            </button>
                        </div>
                    </div>,
                ]}
            >
                <div className="flex-center flex-col">
                    <p className="text-2xl font-semibold text-[#70d8bd]">Login</p>
                    <input
                        placeholder="Mobile no"
                        type="number"
                        className="custom-input mt-4"
                        value={details.mobile}
                        onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className="custom-input my-4"
                        value={details.password}
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                    />
                </div>
            </Modal>
        </>
    );
};

export default Header;
