import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import toast, { config, dateToString } from "../utils";
import { Context } from "../context/UserContext";
import baseUrl from "../../baseUrl";
import PageAnimation from "../components/PageAnimation";

const AddFuelDetails = () => {
    const [worker, setWorker] = useState([]);
    const [workerData, setWorkerData] = useState({});
    const [date, setDate] = useState(new Date());
    const { user } = useContext(Context);
    const fetchData = async (day) => {
        try {
            const res = await axios.post(`${baseUrl}/api/attandance/day`, {
                date: day,
            });

            setWorker(res.data);
        } catch (error) {
            toast("error", error.message);
        }
    };
    const updateData = async (d) => {
        try {
            let { data } = await axios.post(`${baseUrl}/api/fuel/view`, {
                date: [d, d],
            });
            if (data.length > 0) {
                data = data[0].users;
            }
            if (data) {
                let tempdata = {};
                for (let i = 0; i < data.length; i++) {
                    let id = data[i].userId || "0";
                    let start = data[i].start || "0";
                    let end = data[i].end || "0";
                    let name = data[i].name || "0";

                    tempdata[name] = {
                        id,
                        start,
                        end,
                    };
                }
                setWorkerData(tempdata);
            } else {
                setWorkerData({});
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    useEffect(() => {
        let d = new Date(Date.now());
        setDate(d);
        fetchData(d);
        updateData(d);
    }, []);
    const handleChange = (e, type) => {
        if (type === "start") {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    start: parseFloat(e.target.value),
                    id: e.target.id,
                },
            });
        } else {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    end: parseFloat(e.target.value),
                },
            });
        }
    };
    const onChangeDate = (date) => {
        setDate(date?.$d ? date.$d : "");
        if (date?.$d) {
            fetchData(date.$d);
        }
        updateData(date.$d);
    };
    const handleSave = async () => {
        if (!user?.admin) {
            toast("error", "You are not authorized to do this");
            return;
        }
        const objKeys = Object.keys(workerData);
        let tempData = [];
        for (let i = 0; i < objKeys.length; i++) {
            let start = workerData[objKeys[i]].start || "0";
            let end = workerData[objKeys[i]].end || "0";
            if (start > end) {
                toast("error", "Start can't be greater than end");
                return;
            }
            tempData.push({
                name: objKeys[i],
                start,
                end,
                userId: workerData[objKeys[i]].id,
            });
        }
        let dataOfDate = {
            date,
            users: tempData,
            id: user.id,
        };
        try {
            let res = await axios.post(`${baseUrl}/api/fuel/add`, dataOfDate, config);
            res = res.data;
            if (!res.error) {
                toast("success", "Data added successfully");
            } else {
                toast("error", res.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    return (
        <PageAnimation>
            <h1 className="text-center text-4xl font-semibold my-4 text-slate-100">KM Details</h1>
            <div className="flex items-center flex-col">
                <div className="flex-center gap-3 mb-5">
                    <p className="text-lg text-slate-100">Select Date: </p>
                    <DatePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center">
                    <p className="text-lg mr-2 text-slate-100">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">{dateToString(date)}</p>
                </div>
                {worker?.users?.length > 0 && (
                    <div className="bg-[#1f2a40] flex flex-col items-center pb-5 rounded-lg shadow-lg">
                        <table className=" rounded-lg overflow-hidden">
                            <thead className="bg-[#2e7c67]">
                                <tr>
                                    <th className="py-2 text-slate-100 font-normal">Name</th>
                                    <th className="py-2 text-slate-100 font-normal">Start</th>
                                    <th className="py-2 text-slate-100 font-normal">End</th>
                                </tr>
                            </thead>
                            <tbody className=" p-5">
                                {worker?.users?.map((w) => {
                                    return (
                                        <tr className="p-4" key={w.userId}>
                                            <td>
                                                <p className="mr-4 p-4 text-slate-100">{w.name}:</p>
                                            </td>
                                            <td className="px-2">
                                                <input
                                                    type="number"
                                                    className="custom-input w-28 text-center"
                                                    name={w.name}
                                                    id={w.userId}
                                                    onChange={(e) => handleChange(e, "start")}
                                                    value={workerData[w.name]?.start || ""}
                                                    placeholder="Start km"
                                                />
                                            </td>
                                            <td className="px-2">
                                                <input
                                                    type="number"
                                                    className="custom-input w-28 text-center"
                                                    name={w.name}
                                                    onChange={(e) => handleChange(e, "end")}
                                                    value={workerData[w.name]?.end || ""}
                                                    placeholder="End km"
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
        </PageAnimation>
    );
};

export default AddFuelDetails;
