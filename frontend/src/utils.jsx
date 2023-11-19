import { toast } from "react-hot-toast";
export default function (type, message) {
    if (type === "success") {
        return toast.success(message, {
            style: {
                padding: "16px",
                background: "green",
                color: "#fff",
            },
            iconTheme: {
                primary: "white",
                secondary: "green",
            },
        });
    } else if (type === "error") {
        toast.error(message, {
            style: {
                padding: "16px",
                background: "#bb2d3b",
                color: "#fff",
            },
            iconTheme: {
                primary: "white",
                secondary: "#bb2d3b",
            },
        });
    }
}
const pad = (num) => {
    return num < 10 ? "0" + num : num;
};
export const dateToString = (date) => {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (isNaN(year)) return "";
    return `${pad(day)}/${pad(month)}/${year}`;
};

export const dateToTimeString = (date) => {
    if (!date) return;
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let meridian = "AM";
    if (hour >= 12) {
        hour = hour % 12;
        meridian = "PM";
    }
    if (hour == 0) {
        hour = 12;
    }
    if (isNaN(year)) return "";
    return `${pad(day)}/${pad(month)}/${year}  ${pad(hour)}:${pad(minute)} ${meridian}`;
};

const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : "";
export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
};
