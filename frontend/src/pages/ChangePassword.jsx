import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/UserContext";
import axios from "axios";
import toast from "../utils";

const ChangePassword = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!ctx?.user?.admin) {
            navigate(-1);
        }
    }, []);
    const [pass, setPass] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });
    const handleSave = async () => {
        try {
            if (!ctx?.user?.id) {
                toast("error", "Please login first");
                return;
            }
            if (pass.newPass !== pass.confirm) {
                toast(
                    "error",
                    "New password and confirm password must be same"
                );
                return;
            }
            if (pass.newPass.length < 8 || pass.current == "") {
                toast("error", "Password must be atleast 8 characters long");
                return;
            }
            const { data } = await axios.post(
                `http://localhost:4000/api/user/change-password`,
                {
                    currentPassword: pass.current,
                    newPassword: pass.newPass,
                    id: ctx.user.id,
                }
            );
            if (!data.error) {
                toast("success", "Password changed successfully");
                setPass({
                    current: "",
                    newPass: "",
                    confirm: "",
                });
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    return (
        <div className="w-full flex-center flex-col">
            <h1 className="text-slate-100 text-3xl font-semibold my-5">
                Change Password
            </h1>
            <div className="px-5 py-9 bg-[#1f2a40] rounded-xl">
                <table className="text-slate-100">
                    <tbody>
                        <tr>
                            <td className="p-2">Current Password:</td>
                            <td className="py-2">
                                <input
                                    type="password"
                                    className="custom-input"
                                    placeholder="Current Password"
                                    value={pass.current}
                                    onChange={(e) =>
                                        setPass({
                                            ...pass,
                                            current: e.target.value,
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">New Password:</td>
                            <td className="py-2">
                                <input
                                    type="password"
                                    className="custom-input"
                                    placeholder="New Password"
                                    value={pass.newPass}
                                    onChange={(e) =>
                                        setPass({
                                            ...pass,
                                            newPass: e.target.value,
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">Confirm Password:</td>
                            <td className="py-2">
                                <input
                                    type="password"
                                    className="custom-input"
                                    placeholder="Confirm Password"
                                    value={pass.confirm}
                                    onChange={(e) =>
                                        setPass({
                                            ...pass,
                                            confirm: e.target.value,
                                        })
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex-center mt-6">
                    <div>
                        <button onClick={handleSave} className="custom-button">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
