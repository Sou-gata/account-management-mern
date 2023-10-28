import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import toast, { dateToString } from "../utils";

const ViewCashRecord = () => {
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
    function calculateData(res, user) {
        let tempData = [];
        for (let i = 0; i < user?.length; i++) {
            let online = 0;
            let cash = 0;
            let delivered = 0;
            let pickup = 0;
            let ofd = 0;
            let cost = 0;
            let ofp = 0;
            let name = user[i].name;
            for (let j = 0; j < res?.length; j++) {
                let user = res[j].users.find((u) => u.name === name);
                if (user) {
                    online += user.online || 0;
                    cash += user.cash || 0;
                    delivered += user.delivered || 0;
                    pickup += user.pickup || 0;
                    ofd += user.ofd || 0;
                    ofp += user.ofp || 0;
                    cost += user.cost || 0;
                }
            }
            tempData.push({
                name,
                total: online + cash,
                online,
                cash,
                delivered,
                pickup,
                ofd,
                ofp,
                cost,
            });
        }
        let online = 0;
        let cash = 0;
        let delivered = 0;
        let pickup = 0;
        let ofd = 0;
        let cost = 0;
        let ofp = 0;
        let name = "Total";
        for (let j = 0; j < tempData.length; j++) {
            online += tempData[j].online || 0;
            cash += tempData[j].cash || 0;
            delivered += tempData[j].delivered || 0;
            pickup += tempData[j].pickup || 0;
            ofd += tempData[j].ofd || 0;
            ofp += tempData[j].ofp || 0;
            cost += tempData[j].cost || 0;
        }
        tempData.push({
            name,
            total: online + cash,
            online,
            cash,
            delivered,
            pickup,
            ofd,
            ofp,
            cost,
        });
        setData(tempData);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.post(
                    "http://localhost:4000/api/pickup/get-delivery",
                    { date }
                );
                res = res.data;
                let user = await axios.get(
                    "http://localhost:4000/api/user/all"
                );
                user = user.data;
                calculateData(res, user);
            } catch (error) {
                toast("error", error.message);
            }
        };
        fetchData();
    }, [date]);
    return (
        <div className="flex flex-col w-full h-[100vh] items-center mt-5 relative">
            <h1 className="text-slate-100 text-3xl font-semibold">
                Cash Record
            </h1>
            <div className="w-full text-slate-100 py-10 px-5 rounded-lg">
                <div className="flex-center gap-3 mb-5">
                    <p>Select Date: </p>
                    <DatePicker.RangePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center justify-center">
                    <p className="text-lg mr-2">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">
                        {dateToString(date[0])} - {dateToString(date[1])}
                    </p>
                </div>
                <table className="w-full stripped-table divide-gray-200 shadow-lg bg-[#1f2a40] rounded-lg overflow-hidden">
                    <thead>
                        <tr className="w-full bg-[#2e7c67]">
                            <td className="w-[20%] text-center py-2 font-semibold">
                                Name
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                OFD
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Delivered
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                OFP
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Pickup
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Cost
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Cash
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Online
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Total
                            </td>
                            <td className="w-[8.8%] text-center py-2 font-semibold">
                                Due
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 1 &&
                            data.map((item, i) => (
                                <tr
                                    key={i}
                                    className={`w-full ${
                                        i == data.length - 1 ? "border-y-2" : ""
                                    }`}
                                >
                                    <td className="w-[20%] text-center text-lg py-2">
                                        {item.name}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.ofd}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.delivered}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.ofp}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.pickup}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.cost}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.cash}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.online}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.total}
                                    </td>
                                    <td className="w-[8.8%] text-center text-lg py-2">
                                        {item.cost - item.total}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewCashRecord;
