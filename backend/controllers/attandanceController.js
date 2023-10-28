const Attandance = require("../models/AttandanceModel");

async function addAttandance(req, res) {
    try {
        const { users, date, id } = req.body;
        if (date === "") {
            res.json({ message: "Please slect the date again", error: true });
            return;
        }
        let presentUsers = [];
        for (let i = 0; i < users?.length; i++) {
            const { name, key, isPresent } = users[i];
            if (isPresent) {
                presentUsers.push({ name, userId: key });
            }
        }
        let d = new Date(date);
        let y = d.getFullYear();
        let m = d.getMonth();
        let day = d.getDate();
        d = new Date(y, m, day);
        const exist = await Attandance.find({
            date: { $gte: d, $lt: new Date(y, m, day + 1) },
        });
        if (exist.length > 0) {
            const update = await Attandance.findByIdAndUpdate(exist[0]._id, {
                users: presentUsers,
                updatedBy: id,
            });
            res.json(update);
        } else {
            const attandance = new Attandance({
                date,
                users: presentUsers,
                createdBy: id,
            });
            const newAttandance = await attandance.save();
            res.json(newAttandance);
        }
    } catch (error) {
        res.json({ message: error.message, error: true });
    }
}

async function getAttandance(req, res) {
    try {
        const users = await Attandance.find()
            .populate("createdBy")
            .populate("updatedBy");
        res.json(users);
    } catch (error) {
        res.json({ message: error.message, error: true });
    }
}
async function getDayAttandance(req, res) {
    try {
        let { date } = req.body;
        date = new Date(date);
        let d = date.getDate();
        let m = date.getMonth();
        let y = date.getFullYear();
        const users = await Attandance.find({
            date: { $gte: new Date(y, m, d), $lt: new Date(y, m, d + 1) },
        })
            .populate("createdBy")
            .populate("updatedBy");

        let data = {};
        if (users.length > 0) {
            data = users[0];
        }
        res.json(data);
    } catch (error) {
        res.json({ message: error.message, error: true });
    }
}
async function getMonthAttandance(req, res) {
    try {
        let { date } = req.body;
        date = new Date(date);
        let m = date.getMonth();
        let year = date.getFullYear();
        const users = await Attandance.find({
            date: { $gt: new Date(year, m), $lt: new Date(year, m + 1) },
        })
            .populate("createdBy")
            .populate("updatedBy")
            .sort({ date: -1 });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, error: true });
    }
}
async function getYearAttandance(req, res) {
    try {
        let { date } = req.body;
        date = new Date(date);
        let year = date.getFullYear();
        const users = await Attandance.find({
            date: { $gt: new Date(year, 0), $lt: new Date(year + 1, 0) },
        })
            .populate("createdBy")
            .populate("updatedBy")
            .sort({ date: -1 });
        res.json(users);
    } catch (error) {
        res.json({ message: error.message, error: true });
    }
}

module.exports = {
    addAttandance,
    getAttandance,
    getDayAttandance,
    getMonthAttandance,
    getYearAttandance,
};
