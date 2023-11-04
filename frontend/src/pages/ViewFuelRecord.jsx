import axios from "axios";
import { useState, useEffect } from "react";
import { DatePicker, Modal } from "antd";
import toast, { dateToString } from "../utils";
import Popup from "../components/Popup";
import baseUrl from "../../baseUrl";
import PageAnimation from "../components/PageAnimation";

const ViewFuelRecord = () => {
    let today = new Date();
    const [date, setDate] = useState([new Date(today.getFullYear(), today.getMonth(), 1), today]);
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [rate, setRate] = useState(12);

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onChangeDate = (value) => {
        if (!value) {
            return;
        }
        let d1 = value[0].$d;
        let d2 = value[1].$d;
        setDate([d1, d2]);
    };

    const fetchData = async () => {
        try {
            let data = await axios.post(`${baseUrl}/api/fuel/view`, {
                date,
            });
            data = data.data;
            setData(data);
        } catch (error) {
            toast("error", error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, [date]);
    const calculateTotal = () => {
        let users = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let j = 0; j < element.users.length; j++) {
                let el = element.users[j];
                let user = {
                    name: el.name,
                    id: el.userId,
                    total: 0,
                };
                let found = 0;
                for (let k = 0; k < users.length; k++) {
                    if (users[k].id === user.id) {
                        found = 1;
                        break;
                    }
                }
                if (found === 0) users.push(user);
            }
        }
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < data.length; j++) {
                for (let k = 0; k < data[j].users.length; k++) {
                    if (users[i].id === data[j].users[k].userId) {
                        users[i].total += data[j].users[k].end - data[j].users[k].start;
                    }
                }
            }
        }
        setDetails(users);
    };

    return (
        <PageAnimation>
            <div className="flex-center flex-col bg-[#141b2d] gap-5 sticky -top-12 left-0">
                <div className="flex-center gap-5 mt-5">
                    <DatePicker.RangePicker className="" onChange={onChangeDate} />
                    <div>
                        <button className="custom-button" onClick={showModal}>
                            Show details
                        </button>
                    </div>
                </div>
                <div className=" flex items-center justify-center">
                    <p className="text-lg mr-2 text-slate-100">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">
                        {dateToString(date[0])} - {dateToString(date[1])}
                    </p>
                </div>
                <table className="w-full stripped-table">
                    <tbody>
                        <tr className="text-slate-100">
                            <td className="w-1/2 py-1 text-center font-semibold">Name</td>
                            <td className="w-[16.66%] py-1 text-center font-semibold">Start</td>
                            <td className="w-[16.66%] py-1 text-center font-semibold">End</td>
                            <td className="w-[16.66%] py-1 text-center font-semibold">
                                Total journy
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {data.map((item) => (
                    <div key={item._id}>
                        <div className="bg-[#2e7c67] text-slate-100 flex-center gap-10">
                            <p className="text-lg font-semibold text-center">
                                {dateToString(item.date)}
                            </p>
                            <div>
                                <Popup record={item} />
                            </div>
                        </div>
                        <div>
                            <table className="w-full stripped-table">
                                <tbody>
                                    {item.users.map((user) => (
                                        <tr className="text-slate-100" key={user._id}>
                                            <td className="w-1/2 py-1 text-center">{user.name}</td>
                                            <td className="w-[16.66%] py-1 text-center">
                                                {user.start}
                                            </td>
                                            <td className="w-[16.66%] py-1 text-center">
                                                {user.end}
                                            </td>
                                            <td className="w-[16.66%] py-1 text-center">
                                                {user.end - user.start}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
            <Modal open={open} title="Details" onCancel={handleCancel} footer={null}>
                <div>
                    <div className="flex-center gap-2 text-slate-100">
                        <p className="text-lg">Enter rate for per km</p>
                        <input
                            placeholder="Rate/km"
                            type="number"
                            className="custom-input text-center w-[120px]"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                        <div>
                            <button onClick={() => calculateTotal()} className="custom-button">
                                Set
                            </button>
                        </div>
                    </div>
                    <table className="w-full stripped-table text-slate-100 mt-4 border-[1px] border-[#94e2cd]">
                        <tbody>
                            <tr>
                                <td className="w-1/2 py-2 text-center font-semibold">Name</td>
                                <td className="w-1/4 py-2 text-center font-semibold">
                                    Total journy
                                </td>
                                <td className="w-1/4 py-2 text-center font-semibold">
                                    Total amount
                                </td>
                            </tr>
                            {details.map((user) => (
                                <tr key={user.userId}>
                                    <td className="w-1/4 text-center py-2">{user.name}</td>
                                    <td className="w-1/4 text-center py-2">{user.total}</td>
                                    <td className="w-1/4 text-center py-2">
                                        {user.total *
                                            (isNaN(parseFloat(rate)) ? 0 : parseFloat(rate))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </PageAnimation>
    );
};

export default ViewFuelRecord;
