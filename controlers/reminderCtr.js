const Reminder = require("../models/reminderDB");
const User = require('../models/reminderDBUsers');
const sendMail = require("../utils/sendgrid");
const ejs = require("ejs");

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

const saveReminder = async (req, res) => {
    const data = req.body;
    const newReminder = new Reminder(data);
  
    try {
      await newReminder.save();
      const user = await User.findOne({username: data.username});
      if(user) {
        const year = new Date();
        ejs.renderFile('views/index.ejs', {title: data.title, body: data.body, year: year.getFullYear()}, (err, page) => {
            console.log(page);
          if (err) {
            return res.status(500).json({ msg: "Sorry, internal server errors." });
          } else {
            sendMail(data, user, page, (err, success) => {
              if (err) {
                  console.log("err check");
                return res.status(500).json({ msg: "Sorry, internal server errors." });
              } else {
                res.json({msg: "We received your data!",});
              }
            });
          }
        })
      }
    } catch (err) {
      res.status(500).json({ msg: "Sorry, internal server errors." });
    }
  }

  const deleteReminder = async (req, res) => {
    const data = req.body.id;
  
    try {
      await Reminder.findByIdAndRemove(data);
      return res.send();
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const editReminder = async (req, res) => {
    const updatedData = req.body;
  
    try {
      const reminder = await Reminder.findOne({_id: updatedData.id});
      if(reminder) {
        await Reminder.updateOne({_id: reminder._id}, {title: updatedData.title, body: updatedData.body});
        return res.json({ msg: "Reminder updated successfully." });
      } else {
        return res.status(404).send();
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

module.exports.getData = getData;
module.exports.saveReminder = saveReminder;
module.exports.deleteReminder = deleteReminder;
module.exports.editReminder = editReminder;