const { Router } = require("express");
const router = Router();
const reminderCtr = require("../controlers/reminderCtr");
const userCtr = require('../controlers/userCtr');

///---Reminder methods---///

router
.get("/data", reminderCtr.getData)
.post('/save', reminderCtr.saveReminder)
.delete("/delete", reminderCtr.deleteReminder)
.patch("/edit", reminderCtr.editReminder);

///---User Methods---///

router
.post("/signup", userCtr.signUpUser)
.post("/login", userCtr.loginUser)
.get("/auth", userCtr.authUser)
.get("/logout", userCtr.logoutUser);

module.exports = router;