import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "../utils";
import { Context } from "../context/UserContext";

const FormDisabledDemo = () => {
    const navigate = useNavigate();
    const ctx = useContext(Context);
    useEffect(() => {
        if (!ctx?.user?.admin) {
            navigate("/workers");
        }
    }, []);

    const [user, setUser] = useState({
        name: "",
        address: "",
        age: "",
        mobile: "",
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const addData = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/user/add",
                { ...user, id: ctx.user.id }
            );
            if (!data.error) {
                toast("success", "Worker added successfully");
                navigate("/workers");
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    return (
        <div className="w-full flex-center flex-col">
            <div className="h-full flex-center flex-col p-5">
                <div className="mb-6">
                    <p className="text-3xl text-white">Add new worker</p>
                </div>
                <div className="flex h-[250px] bg-[#1f2a40] px-9 rounded-md shadow-lg justify-center">
                    <div className="flex flex-col justify-evenly items-end pr-5">
                        <p className="text-white">Name: </p>
                        <p className="text-white">Address: </p>
                        <p className="text-white">Age: </p>
                        <p className="text-white">Mobile No: </p>
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
                    </div>
                </div>
                <div className="flex w-full justify-around items-center bg-[#1f2a40] pb-6 shadow-lg rounded-md -mt-2">
                    <div>
                        <button
                            onClick={() => {
                                addData();
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
        </div>
    );
};
export default FormDisabledDemo;
