import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import toast, { dateToString } from "../utils";
import { Context } from "../context/UserContext";

const AddPickupDetails = () => {
    const [date, setDate] = useState("");
    const [worker, setWorker] = useState([]);
    const [workerData, setWorkerData] = useState({});
    const { user } = useContext(Context);
    const fetchData = async (day) => {
        try {
            const res = await axios.post(
                "http://localhost:4000/api/attandance/day",
                {
                    date: day,
                }
            );
            setWorker(res.data);
        } catch (error) {
            toast("error", error.message);
        }
    };
    const onChangeDate = (date) => {
        setDate(date?.$d ? date.$d : "");
        if (date?.$d) {
            fetchData(date.$d);
        }
        setWorkerData({});
    };
    useEffect(() => {
        let d = new Date(Date.now());
        setDate(d);
        fetchData(d);
    }, []);
    const handleSave = async () => {
        if (!user?.admin) {
            toast("error", "You are not authorized to do this");
            return;
        }
        const objKeys = Object.keys(workerData);
        let tempData = [];
        for (let i = 0; i < objKeys.length; i++) {
            let ofd = workerData[objKeys[i]].ofd;
            let ofp = workerData[objKeys[i]].ofp;
            tempData.push({
                name: objKeys[i],
                ofd,
                ofp,
                userId: workerData[objKeys[i]].id,
            });
        }
        let dataOfDate = {
            date,
            users: tempData,
            id: user.id,
        };
        try {
            let res = await axios.post(
                "http://localhost:4000/api/pickup/add",
                dataOfDate
            );
            res = res.data;
            if (!res.error) {
                toast("success", "Data added successfully");
                setWorkerData({});
            } else {
                toast("error", res.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    const handleChange = (e, type) => {
        if (type == "ofd") {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    ofd: parseFloat(e.target.value),
                    id: e.target.id,
                },
            });
        } else {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    ofp: parseFloat(e.target.value),
                    id: e.target.id,
                },
            });
        }
    };
    return (
        <div className="flex items-center flex-col py-5">
            <div className="flex-center gap-3 mb-5">
                <p className="text-lg text-slate-100">Select Date: </p>
                <DatePicker onChange={onChangeDate} />
            </div>
            <div className="mb-5 flex items-center">
                <p className="text-lg mr-2 text-slate-100">
                    The selected date is :
                </p>
                <p className="text-lg font-semibold text-[#70d8bd]">
                    {dateToString(date)}
                </p>
            </div>
            {worker?.users?.length > 0 && (
                <div className="bg-[#1f2a40] flex flex-col items-center pb-5 rounded-lg shadow-lg">
                    <table className="rounded-lg overflow-hidden">
                        <thead className="bg-[#2e7c67]">
                            <tr>
                                <td className="p-2 pl-4 text-white ">Name</td>
                                <td className="py-2 text-white w-48 text-center">
                                    OFD
                                </td>
                                <td className="py-2 text-white w-36 text-center">
                                    OFP
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {worker?.users?.map((w) => {
                                return (
                                    <tr
                                        className="text-slate-100"
                                        key={w.userId}
                                    >
                                        <td className="p-2 pl-4">{w.name}:</td>
                                        <td className="p-2 flex justify-center">
                                            <input
                                                type="number"
                                                className="custom-input w-28 text-center"
                                                name={w.name}
                                                id={w.userId}
                                                placeholder="OFD"
                                                onChange={(e) =>
                                                    handleChange(e, "ofd")
                                                }
                                                value={
                                                    workerData[w.name]?.ofd ||
                                                    ""
                                                }
                                            />
                                        </td>
                                        <td className="pl-2 ">
                                            <input
                                                type="number"
                                                className="custom-input w-28 text-center"
                                                placeholder="OFP"
                                                name={w.name}
                                                id={w.userId}
                                                onChange={(e) =>
                                                    handleChange(e, "ofp")
                                                }
                                                value={
                                                    workerData[w.name]?.ofp ||
                                                    ""
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="mt-5">
                        <button onClick={handleSave} className="custom-button">
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPickupDetails;
