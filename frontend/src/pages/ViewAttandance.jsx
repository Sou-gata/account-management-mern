import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Select } from "antd";
const { Option } = Select;
import toast, { dateToString } from "../utils";
import Popup from "../components/Popup";

const PickerWithType = ({ type, onChange }) => {
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
};

const ViewAttandance = () => {
    const [type, setType] = useState("date");
    const [data, setData] = useState(new Date());
    const [attandance, setAttandance] = useState([]);

    const fetchData = async (day, typ) => {
        try {
            let res;
            if (typ === "date") {
                res = await axios.post(
                    `http://localhost:4000/api/attandance/day`,
                    {
                        date: day,
                    }
                );
            } else if (typ === "month") {
                res = await axios.post(
                    `http://localhost:4000/api/attandance/month`,
                    {
                        date: day,
                    }
                );
            } else if (typ === "year") {
                res = await axios.post(
                    `http://localhost:4000/api/attandance/year`,
                    {
                        date: day,
                    }
                );
            }
            console.log(res.data);
            setAttandance(res.data);
        } catch (error) {
            toast("error", error.message || "Something went wrong");
        }
    };
    const handleSelect = (value) => {
        setType(value);
        fetchData(data, value);
    };

    const onChangeDate = (value) => {
        if (!value) {
            return;
        }
        let d = value.$d;
        setData(d);
        fetchData(d, type);
    };

    useEffect(() => {
        fetchData(new Date(), "date");
    }, []);

    return (
        <>
            <div className="flex-center w-full flex-col">
                <p className="text-2xl font-semibold my-4 text-slate-100">
                    View Attandance
                </p>
                <div className="flex gap-2">
                    <Select size="large" value={type} onChange={handleSelect}>
                        <Option value="date">Date</Option>
                        <Option value="month">Month</Option>
                        <Option value="year">Year</Option>
                    </Select>
                    <PickerWithType type={type} onChange={onChangeDate} />
                </div>
                <div className="h-[85%] w-full">
                    {type === "date" && attandance?.users?.length > 0 && (
                        <>
                            <div className="mt-4 p-4">
                                <p className="text-lg font-semibold bg-[#2e7c67] text-slate-100 text-center">
                                    {dateToString(attandance?.date)}
                                </p>
                                <ul className="p-2 flex-center flex-col">
                                    {attandance?.users?.map((att) => (
                                        <li
                                            key={att._id}
                                            className="text-slate-100"
                                        >
                                            {att.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                    {(type === "month" || type === "year") &&
                        attandance?.length > 0 && (
                            <>
                                <div className="p-4">
                                    {attandance?.map((day) => (
                                        <div key={day._id}>
                                            <div className="bg-[#2e7c67] text-slate-100 flex-center gap-10">
                                                <p className="text-lg font-semibold text-center">
                                                    {dateToString(day?.date)}
                                                </p>
                                                <div>
                                                    <Popup record={day} />
                                                </div>
                                            </div>
                                            <ul className="flex gap-4 p-2 justify-center">
                                                {day?.users?.map((att) => (
                                                    <li
                                                        key={att._id}
                                                        className="text-slate-100"
                                                    >
                                                        {att.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                </div>
            </div>
        </>
    );
};

export default ViewAttandance;