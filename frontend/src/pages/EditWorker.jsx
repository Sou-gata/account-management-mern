import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import toast from "../utils";
import { Context } from "../context/UserContext";

const EditWorker = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ctx = useContext(Context);
    const [user, setUser] = useState({
        name: "",
        address: "",
        age: "",
        mobile: "",
        isActive: true,
        isAdmin: false,
    });
    const [originalUser, setOriginalUser] = useState({ isAdmin: false });
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (!ctx?.user?.admin) {
            navigate("/workers");
        } else {
            const getWorker = async () => {
                try {
                    const { data } = await axios.get(
                        `http://localhost:4000/api/user/get/${id}`
                    );
                    setUser(data);
                    setOriginalUser(data);
                } catch (error) {
                    toast("error", error.message);
                }
            };
            getWorker();
        }
    }, []);
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const submitData = async () => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/user/update/${id}`,
                { ...user, uid: ctx.user.id }
            );
            if (!data.error) {
                toast("success", "Data updated successfully");
                navigate("/workers");
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    const updateData = async () => {
        if (
            user.name == "" ||
            user.address == "" ||
            user.age == "" ||
            user.mobile.toString().length != 10
        ) {
            toast("error", `Please fill all the details correctly`);
            return;
        }
        let allowed = true;
        if (user.isAdmin !== originalUser.isAdmin) {
            allowed = false;
            setOpen(true);
        }
        if (allowed) {
            submitData();
        }
    };
    const verifyPassword = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:4000/api/user/verify-password`,
                { id: ctx.user.id, password }
            );
            if (!data.error) {
                setOpen(false);
                submitData();
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    return (
        <div className="w-full flex-center flex-col">
            <div className="h-full flex-center flex-col">
                <h1 className="text-slate-100 text-3xl font-semibold my-5">
                    Edit User
                </h1>
                <div className="flex h-[350px] bg-[#1f2a40] px-9 rounded-md shadow-lg justify-center">
                    <div className="flex flex-col justify-evenly items-end pr-5 text-slate-100">
                        <p>Name: </p>
                        <p>Address: </p>
                        <p>Age: </p>
                        <p>Mobile No: </p>
                        <p>Is Working : </p>
                        <p>Is Admin : </p>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <input
                            type="text"
                            name="name"
                            className="custom-input"
                            placeholder="Name"
                            value={user.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="address"
                            className="custom-input"
                            placeholder="Address"
                            value={user.address}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="age"
                            className="custom-input"
                            placeholder="Age"
                            value={user.age}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="mobile"
                            className="custom-input"
                            placeholder="Mobile No"
                            value={user.mobile}
                            onChange={handleChange}
                        />
                        <select
                            name=""
                            id=""
                            className="custom-input"
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    isActive: e.target.value === "yes",
                                });
                            }}
                            value={user.isActive ? "yes" : "no"}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <select
                            name=""
                            id=""
                            className="custom-input"
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    isAdmin: e.target.value === "yes",
                                });
                            }}
                            value={user.isAdmin ? "yes" : "no"}
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
                <div className="flex w-full justify-around items-center bg-[#1f2a40] pb-6 shadow-lg rounded-md -mt-2">
                    <div>
                        <button
                            onClick={() => {
                                updateData();
                            }}
                            className="custom-button"
                        >
                            Save
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                navigate("/workers");
                            }}
                            className="custom-button"
                        >
                            Cancle
                        </button>
                    </div>
                </div>
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
                            <button
                                key="submit"
                                className="custom-button"
                                onClick={verifyPassword}
                            >
                                Verify
                            </button>
                        </div>
                    </div>,
                ]}
            >
                <div className="flex-center flex-col">
                    <p className="text-2xl font-semibold text-[#70d8bd]">
                        Please enter your password to continue
                    </p>
                    <input
                        placeholder="Password"
                        type="password"
                        className="custom-input mt-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default EditWorker;
