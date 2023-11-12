const Fuel = require("../models/FuelModel");

async function addFuelDetails(req, res) {
    const { date, users, id } = req.body;
    let d = new Date(date);
    let y = d.getFullYear();
    let m = d.getMonth();
    let day = d.getDate();
    d = new Date(y, m, day);
    try {
        const exist = await Fuel.find({
            date: { $gte: d, $lt: new Date(y, m, day + 1) },
        });
        if (exist.length === 0) {
            let user = new Fuel({
                date,
                users,
                createdBy: id,
            });
            let newUser = await user.save();
            res.json(newUser);
        } else {
            let user = await Fuel.findByIdAndUpdate(exist[0]._id, {
                date,
                users,
                updatedBy: id,
            });
            res.json(user);
        }
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

async function viewFuelDetails(req, res) {
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
        let user = await Fuel.find({ date: { $lte: d2, $gte: d1 } })
            .populate("createdBy")
            .populate("updatedBy")
            .sort({ date: -1 });
        res.json(user);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}
async function deleteFuelDetails(req, res) {
    try {
        let { id } = req.params;
        let user = await Fuel.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
}

module.exports = { addFuelDetails, viewFuelDetails, deleteFuelDetails };
