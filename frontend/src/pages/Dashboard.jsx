import { useState, useEffect, useContext } from "react";
import toast from "../utils";
import axios from "axios";
import Card from "../components/Card";
import { Context } from "../context/UserContext";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState([]);
    const { user } = useContext(Context);

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
    let today = new Date();
    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.get(
                    "http://localhost:4000/api/pickup/get-dashboard"
                );
                if (!data.error) {
                    setDashboard(data);
                } else {
                    toast("error", data.message);
                }
            } catch (error) {
                toast("error", error.message);
            }
        })();
    }, []);

    return (
        <div className="h-full w-full">
            <div>
                <p className="text-center py-5 text-[#70d8bd] text-2xl">
                    {month[today.getMonth()]}-{today.getFullYear()}
                </p>
            </div>
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
        </div>
    );
};

export default Dashboard;
