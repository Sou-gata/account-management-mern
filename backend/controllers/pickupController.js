const Pickup = require("../models/PickupModel");
async function addPickup(req, res) {
    const { date, users, id } = req.body;
    let d = new Date(date);
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    d = new Date(y, m, day);
    try {
        const exist = await Pickup.find({
            date: { $gte: d, $lt: new Date(y, m, day + 1) },
        });
        if (exist.length === 0) {
            let user = new Pickup({
                date,
                users,
                createdBy: id,
            });
            let newUser = await user.save();
            res.json(newUser);
        } else {
            let a = [...users];
            let b = [...exist[0].users];
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < b.length; j++) {
                    if (a[i].userId === b[j].userId.toString()) {
                        a[i].delivered = b[j].delivered;
                        a[i].cost = b[j].cost;
                        a[i].cash = b[j].cash;
                        a[i].online = b[j].online;
                    }
                }
            }
            let user = await Pickup.findByIdAndUpdate(exist[0]._id, {
                date,
                users: a,
                updatedBy: id,
            });

            res.json(user);
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

async function getPickup(req, res) {
    const { date } = req.body;
    let d = new Date(date);
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    d = new Date(y, m, day);
    try {
        const exist = await Pickup.find({
            date: { $gte: d, $lt: new Date(y, m, day + 1) },
        })
            .populate("createdBy")
            .populate("updatedBy");
        if (exist.length > 0) {
            res.json(exist[0]);
        } else {
            res.json({ error: true, message: "No pickup found" });
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

async function addDelivery(req, res) {
    const { date, users, id, uid } = req.body;

    try {
        const user = await Pickup.findByIdAndUpdate(id, {
            date,
            users,
            updatedBy: uid,
        });
        res.json(user);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

async function getDelivery(req, res) {
    try {
        let { date } = req.body;
        let d1 = new Date(date[0]);
        let d2 = new Date(date[1]);
        let d1d = d1.getDate();
        let d1m = d1.getMonth();
        let d1y = d1.getFullYear();
        let d2d = d2.getDate() + 1;
        let d2m = d2.getMonth();
        let d2y = d2.getFullYear();
        d1 = new Date(d1y, d1m, d1d);
        d2 = new Date(d2y, d2m, d2d);
        let user = await Pickup.find({ date: { $lte: d2, $gte: d1 } })
            .populate("createdBy")
            .populate("updatedBy")
            .sort({ date: -1 });
        res.json(user);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

async function getDashboardDetails(req, res) {
    try {
        let { date, type } = req.body;
        date = new Date(date);

        let lastMonthFstDay;
        let lastMonthLstDay;
        let thisMonthLstDay;
        if (type == "last") {
            lastMonthFstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 61);
            lastMonthLstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 31);
            thisMonthLstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        } else {
            let m = date.getMonth();
            lastMonthFstDay = new Date(date.getFullYear(), m - 1, 1);
            lastMonthLstDay = new Date(date.getFullYear(), m, 1);
            thisMonthLstDay = new Date(date.getFullYear(), m + 1, 1);
        }
        const lastMonthData = await Pickup.find({
            date: { $lte: lastMonthLstDay, $gte: lastMonthFstDay },
        });
        const currentMonthData = await Pickup.find({
            date: { $lte: thisMonthLstDay, $gte: lastMonthLstDay },
        });
        let curOFD = 0;
        let prevOFD = 0;
        let curDel = 0;
        let prevDel = 0;
        let curPick = 0;
        let prevPick = 0;
        let curVal = 0;
        let prevVal = 0;
        let prevCash = 0;
        let curCash = 0;
        lastMonthData.forEach((item) => {
            item?.users?.forEach((user) => {
                prevOFD += user.ofd;
                prevDel += user.delivered;
                prevPick += user.pickup;
                prevVal += user.cost;
                prevCash += user.cash + user.online;
            });
        });
        currentMonthData.forEach((item) => {
            item?.users?.forEach((user) => {
                curOFD += user.ofd;
                curDel += user.delivered;
                curPick += user.pickup;
                curVal += user.cost;
                curCash += user.cash + user.online;
            });
        });
        let normalData = [
            {
                title: "Total OFD",
                current: curOFD,
                previous: prevOFD,
            },
            {
                title: "Total Delivered",
                current: curDel,
                previous: prevDel,
            },
            {
                title: "Total Pickup",
                current: curPick,
                previous: prevPick,
            },
        ];
        let adminData = [
            {
                title: "Total Value",
                current: curVal,
                previous: prevVal,
            },
            {
                title: "Total Earning",
                current: curCash,
                previous: prevCash,
            },
            {
                title: "Total Due",
                current: curVal - curCash,
                previous: prevCash - prevCash,
            },
        ];
        res.json({ normalData, adminData });
    } catch (error) {
        res.json({ error: true, error: error.message });
    }
}

async function getIndividualCash(req, res) {
    let { date, id } = req.body;
    let d1 = new Date(date[0]);
    let d2 = new Date(date[1]);
    let d1d = d1.getDate();
    let d1m = d1.getMonth();
    let d1y = d1.getFullYear();
    let d2d = d2.getDate() + 1;
    let d2m = d2.getMonth();
    let d2y = d2.getFullYear();
    d1 = new Date(d1y, d1m, d1d);
    d2 = new Date(d2y, d2m, d2d);
    try {
        let user = await Pickup.find({
            date: { $lte: d2, $gte: d1 },
            "users.userId": id,
        });
        let users = [];
        if (user.length > 0) {
            user.forEach((item) => {
                item.users.forEach((user) => {
                    if (user.userId.toString() === id) {
                        users.push({
                            ...user._doc,
                            date: item.date,
                            key: item._id,
                        });
                    }
                });
            });
        }
        res.json(users);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

module.exports = {
    addPickup,
    getPickup,
    addDelivery,
    getDelivery,
    getDashboardDetails,
    getIndividualCash,
};
