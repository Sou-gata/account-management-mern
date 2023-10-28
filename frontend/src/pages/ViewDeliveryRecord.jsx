import axios from "axios";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import toast, { dateToString } from "../utils";
import Popup from "../components/Popup";

const ViewDeliveryRecord = () => {
    let today = new Date();
    const [date, setDate] = useState([
        new Date(today.getFullYear(), today.getMonth(), 1),
        today,
    ]);
    const [data, setData] = useState([]);
    const onChangeDate = (value) => {
        if (!value) {
            return;
        }
        let d1 = value[0].$d;
        let d2 = value[1].$d;
        setDate([d1, d2]);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.post(
                    "http://localhost:4000/api/pickup/get-delivery",
                    { date }
                );
                res = res.data;
                setData(res);
            } catch (error) {
                toast("error", error.message);
            }
        };
        fetchData();
    }, [date]);
    return (
        <div>
            <div className="flex-center flex-col gap-5 sticky top-0 left-0 bg-[#141b2d]">
                <div className="flex-center gap-5 mt-5">
                    <DatePicker.RangePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center justify-center">
                    <p className="text-lg mr-2 text-slate-100">
                        The selected date is :
                    </p>
                    <p className="text-lg font-semibold text-[#70d8bd]">
                        {dateToString(date[0])} - {dateToString(date[1])}
                    </p>
                </div>
                <table className="text-slate-100 w-full stripped-table border-b-[0.5px]">
                    <tbody>
                        <tr>
                            <td className="w-[20%] py-1 text-center font-semibold">
                                Name
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                OFD
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Delivered
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                OFP
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Pickup
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Undelivered
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Total
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Cash
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Online
                            </td>
                            <td className="w-[8.8%] py-1 text-center font-semibold">
                                Due
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-[#141b2d]">
                {data.map((item) => {
                    let total = {
                        ofd: 0,
                        delivered: 0,
                        ofp: 0,
                        pickup: 0,
                        total: 0,
                        cash: 0,
                        online: 0,
                        undelivered: 0,
                        due: 0,
                    };
                    item?.users.forEach((user) => {
                        total.ofd += user?.ofd || 0;
                        total.delivered += user.delivered || 0;
                        total.pickup += user.pickup || 0;
                        total.ofp += user.ofp || 0;
                        total.total += user.cost || 0;
                        total.cash += user.cash || 0;
                        total.online += user.online || 0;
                    });
                    total.due = total.total - (total.cash + total.online);
                    total.undelivered = total.ofd - total.delivered;
                    return (
                        <div key={item._id}>
                            <div className="bg-[#2e7c67] text-slate-100 flex-center gap-10">
                                <p className="text-lg font-semibold text-center">
                                    {dateToString(item.date)}
                                </p>
                                <div>
                                    <Popup record={item} total={total} />
                                </div>
                            </div>
                            <div>
                                <table className="text-slate-100 w-full stripped-table">
                                    <tbody>
                                        {item?.users?.map((user) => (
                                            <tr key={user._id}>
                                                <td className="w-[20%] py-1 text-center">
                                                    {user.name}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.ofd}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.delivered}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user?.ofp}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.pickup}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.ofd - user.delivered}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.cost}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.cash}
                                                </td>
                                                <td className="w-[8.8%] py-1 text-center">
                                                    {user.online}
                                                </td>
                                                <td
                                                    className={`w-[8.8%] py-1 text-center ${
                                                        user.cost -
                                                            (user.online +
                                                                user.cash) <
                                                        0
                                                            ? "text-[#70d8bd]"
                                                            : ""
                                                    }`}
                                                >
                                                    {user.cost -
                                                        (user.online +
                                                            user.cash)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewDeliveryRecord;
