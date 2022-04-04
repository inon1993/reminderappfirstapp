const User = require("../models/reminderDBUsers");
const passport = require("passport");

///---Passport config---///
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const signUpUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ username: data.username });

    if (!user) {
      await User.register(
        {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          username: data.username,
        },
        data.password,
        (err, user) => {
          if (err) {
            return res.status(500).send("Internal Server Error.");
          }
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
      );
    } else {
      res.json({ msg: "Username already exists" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const loginUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    await req.login(user, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      passport.authenticate("local")(req, res, async () => {
        const loginUser = await User.findOne({ username: user.username });
        res.json({
          fname: loginUser.fname,
          lname: loginUser.lname,
          email: loginUser.email,
          username: loginUser.username,
          msg: "Login was successfull",
        });
      });
    });
  } catch (err) {
    res.json({
      msg: "Username or password is incorrect.",
    });
  }
};

const authUser = (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email,
        username: req.user.username,
        msg: "User is authenticated.",
      });
    } else {
      res.json({ msg: "user is not auth!" });
    }
  }

  const logoutUser = (req, res) => {
    req.logout();
    res.json({ msg: "Logout is successfull." });
  }

module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;
module.exports.authUser = authUser;
module.exports.logoutUser = logoutUser;

