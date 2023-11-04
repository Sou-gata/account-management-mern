import { useState, useEffect, useContext } from "react";
import toast, { dateToString } from "../utils";
import axios from "axios";
import Card from "../components/Card";
import { Context } from "../context/UserContext";
import baseUrl from "../../baseUrl";
import { DatePicker, Select } from "antd";
import PageAnimation from "../components/PageAnimation";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const { user } = useContext(Context);
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState("month");

    let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const fetchData = async (day) => {
        try {
            let { data } = await axios.post(`${baseUrl}/api/pickup/get-dashboard`, {
                date: day,
                type,
            });
            if (!data.error) {
                setDashboard(data);
            } else {
                toast("error", data.message);
            }
        } catch (error) {
            toast("error", error.message);
        }
    };
    const handleChangeDate = (value) => {
        setDate(value.$d);
        fetchData(value.$d);
    };
    useEffect(() => {
        fetchData(date);
    }, []);

    return (
        <PageAnimation className="h-full w-full">
            <div className="flex-center py-5 gap-5">
                <Select
                    className="w-36"
                    value={type}
                    onChange={(value) => {
                        setType(value);
                        fetchData(date);
                    }}
                >
                    <Select.Option value="month">Month</Select.Option>
                    <Select.Option value="last">Last 30 Days</Select.Option>
                </Select>
                {type === "month" && <DatePicker picker="month" onChange={handleChangeDate} />}
            </div>
            {type === "last" && (
                <p className="text-center py-5 text-[#70d8bd] text-2xl">
                    {(() => {
                        let today = new Date();
                        let lastMonth = new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate() - 30
                        );
                        return `${dateToString(lastMonth)} - ${dateToString(today)}`;
                    })()}
                </p>
            )}
            {type === "month" && (
                <p className="text-center py-5 text-[#70d8bd] text-2xl">
                    {month[date?.getMonth()]}-{date?.getFullYear()}
                </p>
            )}
            <div className="flex p-10 pt-0 gap-7 justify-between items-center">
                {dashboard?.normalData?.map((item, i) => (
                    <Card
                        key={i}
                        currentTotal={item.current}
                        prevTotal={item.previous}
                        title={item.title}
                    />
                ))}
            </div>
            {user?.admin && (
                <div className="flex p-10 pt-0 gap-7 justify-between items-center">
                    {dashboard?.adminData?.map((item, i) => (
                        <Card
                            key={i}
                            currentTotal={item.current}
                            prevTotal={item.previous}
                            title={item.title}
                        />
                    ))}
                </div>
            )}
        </PageAnimation>
    );
};

export default Dashboard;
