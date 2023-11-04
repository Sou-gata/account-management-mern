import { useState, useEffect } from "react";
import { DatePicker, Select, Table } from "antd";
import toast, { dateToString } from "../utils";
import axios from "axios";
import baseUrl from "../../baseUrl";
import PageAnimation from "../components/PageAnimation";

const ViewIndividualCash = () => {
    let today = new Date();
    const [date, setDate] = useState([
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        today,
    ]);
    const [type, setType] = useState("active");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [worker, setWorker] = useState([]);
    const empty = {
        name: "Total",
        OFD: 0,
        delivered: 0,
        OFP: 0,
        pickup: 0,
        cost: 0,
        online: 0,
        cash: 0,
        due: 0,
    };
    const [total, setTotal] = useState(empty);
    const fetchData = async (id, dates) => {
        try {
            const res = await axios.post(`${baseUrl}/api/pickup/individual`, {
                id,
                date: dates,
            });
            setWorker(res.data);
            if (res.data.length === 0) {
                setTotal(empty);
                return;
            } else {
                let tempTotal = { ...empty };
                res.data.forEach((element) => {
                    tempTotal.OFD += element.ofd;
                    tempTotal.delivered += element.delivered;
                    tempTotal.OFP += element.ofp;
                    tempTotal.pickup += element.pickup;
                    tempTotal.cost += element.cost;
                    tempTotal.online += element.online;
                    tempTotal.cash += element.cash;
                });
                tempTotal.due = tempTotal.cost - tempTotal.online - tempTotal.cash;
                setTotal(tempTotal);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    const onChangeDate = (value) => {
        if (!value) {
            return;
        }
        let d1 = value[0].$d;
        let d2 = value[1].$d;
        fetchData(selectedUser, [d1, d2]);
        setDate([d1, d2]);
    };
    const onChangeType = async (t) => {
        try {
            let user = await axios.get(`${baseUrl}/api/user/all?type=${t}`);
            setUsers(user.data || []);
            if (user.data.length > 0) {
                setSelectedUser(user.data[0]._id);
                fetchData(user.data[0]._id, date);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    useEffect(() => {
        onChangeType(type);
    }, []);
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_, record) => <p>{dateToString(record.date)}</p>,
        },
        {
            title: "OFD",
            dataIndex: "ofd",
            key: "ofd",
            render: (_, record) => <p>{record.ofd}</p>,
        },
        {
            title: "Delivered",
            dataIndex: "delivered",
            key: "delivered",
            render: (_, record) => <p>{record.delivered}</p>,
        },
        {
            title: "OFP",
            dataIndex: "ofp",
            key: "ofp",
            render: (_, record) => <p>{record.ofp}</p>,
        },
        {
            title: "Pickup",
            dataIndex: "pickup",
            key: "pickup",
            render: (_, record) => <p>{record.pickup}</p>,
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
            render: (_, record) => <p>{record.cost}</p>,
        },
        {
            title: "Online",
            dataIndex: "online",
            key: "online",
            render: (_, record) => <p>{record.online}</p>,
        },
        {
            title: "Cash",
            dataIndex: "cash",
            key: "cash",
            render: (_, record) => <p>{record.cash}</p>,
        },
        {
            title: "Due",
            dataIndex: "due",
            key: "due",
            render: (_, record) => {
                let due = record.cost - record.online - record.cash;
                return (
                    <p className={due < 0 ? "text-teal-400" : due > 0 ? "text-red-400" : ""}>
                        {due}
                    </p>
                );
            },
        },
    ];
    return (
        <PageAnimation className="flex flex-col w-full items-center mt-5 relative text-slate-100">
            <div>
                <div className="flex gap-5 items-center">
                    <p>Type: </p>
                    <Select
                        size="large"
                        value={type}
                        onChange={(value) => {
                            onChangeType(value);
                            setType(value);
                        }}
                        className="w-40"
                    >
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="deactive">Deactive</Select.Option>
                    </Select>
                    <p>Name: </p>
                    <Select
                        size="large"
                        value={selectedUser}
                        onChange={(value) => {
                            setSelectedUser(value);
                            fetchData(value, date);
                        }}
                        className="w-56"
                    >
                        {users.map((user) => (
                            <Select.Option key={user._id} value={user._id}>
                                {user.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <p>Select Date: </p>
                    <DatePicker.RangePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center justify-center mt-5">
                    <p className="text-lg mr-2">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">
                        {dateToString(date[0])} - {dateToString(date[1])}
                    </p>
                </div>
            </div>
            <p className="text-slate-100">{worker.length > 0}</p>
            <div className="p-5">
                {worker.length > 0 && (
                    <div className="w-full">
                        <div>
                            <table className="w-full total-table">
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>Total</td>
                                        <td>OFD</td>
                                        <td>Delivered</td>
                                        <td>OFP</td>
                                        <td>Pickup</td>
                                        <td>Cost</td>
                                        <td>Cash</td>
                                        <td>Online</td>
                                        <td>Due</td>
                                    </tr>
                                    <tr>
                                        <td>{total.OFD}</td>
                                        <td>{total.delivered}</td>
                                        <td>{total.OFP}</td>
                                        <td>{total.pickup}</td>
                                        <td>{total.cost}</td>
                                        <td>{total.cash}</td>
                                        <td>{total.online}</td>
                                        <td>{total.due}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Table
                            bordered
                            pagination={false}
                            columns={columns}
                            dataSource={worker}
                            scroll={{
                                y: 329,
                            }}
                        />
                    </div>
                )}
            </div>
        </PageAnimation>
    );
};

export default ViewIndividualCash;
