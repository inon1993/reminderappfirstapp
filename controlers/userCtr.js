const User = require("../models/reminderDBUsers");

const signUp = async (req, res) => {
  const data = req.body;
  try {
    await User.findOne({ username: data.username }, (err, foundUser) => {
      if (!foundUser) {
         User.register(
          {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            username: data.username,
          },
          data.password,
          (err, user) => {
            if (err) {
              res.status(500).json({ msg: "Something went wrong in server." });
            } else {
              passport.authenticate("local")(req, res, () => {
                res.json({
                  fname: req.user.fname,
                  lname: req.user.lname,
                  email: req.user.email,
                  username: req.user.username,
                  msg: "Successfully saved user.",
                });
              });
            }
          }
        );
      } else if (foundUser) {
        res.json({ msg: "Username already exists" });
      }
    });
  } catch (err) {
      res.status(500).json({ msg: "An error!!!!!!" });
  }
};

module.exports = signUp;
