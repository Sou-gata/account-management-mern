import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import toast, { dateToString } from "../utils";
import { Context } from "../context/UserContext";

const DeliveryDetails = () => {
    const [date, setDate] = useState(new Date());
    const [pickup, setPickup] = useState({});
    const [workerData, setWorkerData] = useState({});
    const { user } = useContext(Context);
    const onChangeDate = (date) => {
        setDate(date?.$d ? date.$d : "");
        setWorkerData({});
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await axios.post(
                    "http://localhost:4000/api/pickup/get-pickup",
                    { date }
                );
                setPickup(data.data);
            } catch (error) {
                toast("error", error.message);
            }
        };
        fetchData();
    }, [date]);
    const handleChange = (e, type) => {
        if (type === "delivered") {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    delivered: parseFloat(e.target.value),
                    id: e.target.id,
                },
            });
        } else {
            setWorkerData({
                ...workerData,
                [e.target.name]: {
                    ...workerData[e.target.name],
                    [type]: parseFloat(e.target.value),
                },
            });
        }
    };

    const handleSave = async () => {
        if (!user?.admin) {
            toast("error", "You are not authorized to do this");
            return;
        }
        const objKeys = Object.keys(workerData);
        let tempData = [];
        for (let i = 0; i < objKeys.length; i++) {
            let delivered = workerData[objKeys[i]].delivered || 0;
            let pickedup = workerData[objKeys[i]].pickup || 0;
            let cost = workerData[objKeys[i]].cost || 0;
            let cash = workerData[objKeys[i]].cash || 0;
            let online = workerData[objKeys[i]].online || 0;
            let ofd, ofp;
            for (let j = 0; j < pickup?.users.length; j++) {
                if (pickup?.users[j].name === objKeys[i]) {
                    ofd = pickup?.users[j].ofd || 0;
                    ofp = pickup?.users[j].ofp || 0;
                    break;
                }
            }
            tempData.push({
                name: objKeys[i],
                delivered,
                ofd,
                ofp,
                pickup: pickedup,
                cost,
                cash,
                online,
                userId: workerData[objKeys[i]].id,
            });
        }
        let dataOfDate = {
            id: pickup._id,
            date,
            users: tempData,
            uid: user.id,
        };
        try {
            let data = await axios.post(
                "http://localhost:4000/api/pickup/add-delivery",
                dataOfDate
            );
            data = data.data;
            if (!data.error) {
                toast("success", "Data added successfully");
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };

    return (
        <div className="flex flex-col text-slate-100 w-full items-center justify-center">
            <div className="p-7 rounded-lg ">
                <div className="flex-center gap-3 mb-5">
                    <p>Select Date: </p>
                    <DatePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center justify-center">
                    <p className="text-lg mr-2">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">
                        {dateToString(date)}
                    </p>
                </div>
                <div className="flex-center flex-col">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    Name
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    OFD
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    Delivered
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    OFP
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    Pickup
                                </th>
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    Cost
                                </th>
                                <th
                                    colSpan={2}
                                    className="border border-gray-400 px-4 py-2"
                                >
                                    Payment
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">
                                    Cash
                                </th>
                                <th className="border border-gray-400 px-4 py-2">
                                    Online
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pickup?.users?.map((item) => (
                                <tr key={item.userId}>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {item.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {item.ofd}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <input
                                            name={item.name}
                                            type="number"
                                            className="custom-input w-[100px]"
                                            id={item.userId}
                                            onChange={(e) =>
                                                handleChange(e, "delivered")
                                            }
                                            value={
                                                workerData[item.name]
                                                    ?.delivered || ""
                                            }
                                        />
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {item.ofp}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <input
                                            name={item.name}
                                            type="number"
                                            className="custom-input w-[100px]"
                                            id={item.userId}
                                            onChange={(e) =>
                                                handleChange(e, "pickup")
                                            }
                                            value={
                                                workerData[item.name]?.pickup ||
                                                ""
                                            }
                                        />
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <input
                                            type="number"
                                            name={item.name}
                                            className="custom-input w-[100px]"
                                            onChange={(e) =>
                                                handleChange(e, "cost")
                                            }
                                            value={
                                                workerData[item.name]?.cost ||
                                                ""
                                            }
                                        />
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <input
                                            type="number"
                                            name={item.name}
                                            className="custom-input w-[100px]"
                                            onChange={(e) =>
                                                handleChange(e, "cash")
                                            }
                                            value={
                                                workerData[item.name]?.cash ||
                                                ""
                                            }
                                        />
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <input
                                            type="number"
                                            name={item.name}
                                            className="custom-input w-[100px]"
                                            onChange={(e) =>
                                                handleChange(e, "online")
                                            }
                                            value={
                                                workerData[item.name]?.online ||
                                                ""
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button
                            onClick={() => handleSave()}
                            className="custom-button mt-5"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryDetails;
