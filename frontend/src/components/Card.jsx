import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

const Card = ({ title, currentTotal, prevTotal }) => {
    let today = new Date();
    let lastMonthToalDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
    ).getDate();
    today = today.getDate();

    let pevTotal = prevTotal / lastMonthToalDay;
    let curTotal = currentTotal / today;

    let percent = 0;
    let up = false;
    if (pevTotal > curTotal) {
        percent = ((pevTotal - curTotal) * 100) / pevTotal;
    } else {
        up = true;
        percent = ((curTotal - pevTotal) * 100) / pevTotal;
    }
    percent = parseInt(percent);
    return (
        <div className="w-1/3 h-48 bg-[#001529] rounded-xl p-5 shadow-lg">
            <p className="text-[#70d8bd] text-center text-2xl capitalize">
                {title}
            </p>
            <div className="flex mt-12 items-center justify-around">
                <p className="text-white text-center text-4xl ">
                    {currentTotal}
                </p>
                <div className="flex-center gap-2">
                    <p className={up ? "text-green-500" : "text-red-500"}>
                        {isNaN(percent) ? 100 : percent}%
                    </p>
                    {up && <BsArrowUpRight color="#00ff00" fontSize={30} />}
                    {!up && <BsArrowDownRight color="#ff0000" fontSize={30} />}
                </div>
            </div>
        </div>
    );
};

export default Card;
