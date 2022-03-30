const Reminder = require("../models/reminderDB");

const getData = async (req, res) => {
  try {
    const data = await Reminder.find({ username: req.query.username });
    if (!data) {
      data = [];
      return res.json(data);
    }
    res.json(data);
  } catch (err) {
    res.status(500).send("Error: ", err);
  }
};

module.exports = getData;
