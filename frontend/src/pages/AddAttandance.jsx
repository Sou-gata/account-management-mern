import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, DatePicker } from "antd";
import toast, { config, dateToString } from "../utils";
import { Context } from "../context/UserContext";
import baseUrl from "../../baseUrl";
import PageAnimation from "../components/PageAnimation";

const AddAttandance = () => {
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());
    const { user } = useContext(Context);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/api/user/active`);
                let attandance = await axios.post(`${baseUrl}/api/attandance/day`, { date });
                attandance = attandance.data;
                let tempData = [];
                if (attandance.users) {
                    data.forEach((element) => {
                        let isPresent = false;
                        for (let i = 0; i < attandance.users.length; i++) {
                            if (attandance.users[i].userId === element._id) {
                                isPresent = true;
                                break;
                            }
                        }
                        tempData.push({
                            key: element._id,
                            name: element.name,
                            isPresent,
                        });
                    });
                } else {
                    data.forEach((element) => {
                        tempData.push({
                            key: element._id,
                            name: element.name,
                            isPresent: false,
                        });
                    });
                }
                setUsers(tempData);
            } catch (error) {
                toast("error", error.message);
            }
        };
        getUsers();
    }, [date]);

    const handlePresent = (e) => {
        let tempUsers = [...users];
        for (let i = 0; i < tempUsers.length; i++) {
            if (tempUsers[i].key === e.target.id) {
                tempUsers[i].isPresent = e.target.checked;
                break;
            }
        }
        setUsers(tempUsers);
    };

    const onChangeDate = (date) => {
        setDate(date?.$d ? date.$d : "");
    };

    const handleSubmit = async () => {
        if (!user?.admin) {
            toast("error", "You are not authorized to add attandance");
        } else {
            try {
                const { data } = await axios.post(
                    `${baseUrl}/api/attandance/add`,
                    {
                        users,
                        date,
                        id: user.id,
                    },
                    config
                );
                if (!data.error) {
                    toast("success", "Attandance added successfully");
                } else {
                    toast("error", data.message);
                }
            } catch (error) {
                toast("error", error.message);
            }
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center justify-center w-full">
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        id={record.key}
                        checked={record.isPresent}
                        onChange={handlePresent}
                    />
                </div>
            ),
        },
    ];

    return (
        <PageAnimation className="flex flex-col  w-full  items-center justify-center">
            <h1 className="text-slate-100 text-3xl font-semibold my-5">Add Attandance</h1>
            <div className="p-7 bg-[#1f2a40] rounded-lg shadow-lg">
                <div className="flex-center gap-3 mb-5">
                    <p className="text-white">Select Date: </p>
                    <DatePicker onChange={onChangeDate} />
                </div>
                <div className="mb-5 flex items-center justify-center">
                    <p className="text-lg mr-2 text-slate-100">The selected date is :</p>
                    <p className="text-lg font-semibold text-[#70d8bd]">{dateToString(date)}</p>
                </div>
                <Table bordered pagination={false} columns={columns} dataSource={users} />
                <button onClick={handleSubmit} className="mt-5 custom-button">
                    Save
                </button>
            </div>
        </PageAnimation>
    );
};

export default AddAttandance;
