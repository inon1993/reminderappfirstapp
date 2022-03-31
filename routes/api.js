const { Router } = require("express");
const passport = require("passport");
const router = Router();
const Reminder = require("../models/reminderDB");
const User = require("../models/reminderDBUsers");
const ejs = require("ejs");
const sendMail = require("../utils/sendgrid");
const { getData } = require("../controlers/reminderCtr");
const { faRetweet } = require("@fortawesome/free-solid-svg-icons");

///---Passport config---///
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/data", getData);

router.post('/save', async (req, res) => {
  const data = req.body;
  const newReminder = new Reminder(data);

  try {
    await newReminder.save();
    console.log("kkk");
    const user = await User.findOne({username: data.username});
    console.log("2");
    if(user) {
      const year = new Date();
      ejs.renderFile('views/index.ejs', {title: data.title, body: data.body, year: year.getFullYear()}, (err, page) => {
        if (err) {
          console.log("3");
          return res.status(500).json({ msg: "Sorry, internal server errors." });
        } else {
          console.log("4");
          sendMail(data, foundUser, page, (err, success) => {
            if (err) {
              console.log("GGGGG");
              return res.status(500).json({ msg: "Sorry, internal server errors." });
            } else {
              console.log("yess");
              res.json({msg: "We received your data!",});
            }
          });
        }
      })
    }
  } catch (err) {
    res.status(500).json({ msg: "Sorry, internal server errors." });
  }
})

// router.post("/save", async (req, res) => {
//   const data = req.body;
//   const newReminder = new Reminder(data);

//   try {
//     await newReminder.save( () => {
//       User.findOne({ username: data.username }, (err, foundUser) => {
//         if (!err) {
//           const year = new Date();
//           ejs.renderFile(
//             "views/index.ejs",
//             { title: data.title, body: data.body, year: year.getFullYear() },
//             (err, page) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 sendMail(data, foundUser, page, (error, success) => {
//                   if (error) {
//                     throw new Error(error);
//                   } else {
//                     return success;
//                   }
//                 });
//               }
//             }
//           );
//         }
//       });
//       res.json({
//         msg: "We received your data!",
//       });
//     });
//   } catch {
//     res.status(500).json({ msg: "Sorry, internal server errors." });
//   }
// });

router.delete("/delete", (req, res) => {
  const data = req.body.id;

  Reminder.findByIdAndRemove(data, (err) => {
    if (!err) {
      res.send("wrks");
    } else {
      throw new Error(err);
    }
  });
});

router.patch("/edit", (req, res) => {
  Reminder.findOne({ _id: req.body.id }, (err, foundReminder) => {
    if (foundReminder) {
      Reminder.updateOne(
        { _id: foundReminder._id },
        { title: req.body.title, body: req.body.body },
        (err) => {
          if (!err) {
            res.json({ msg: "Reminder updated successfully." });
          } else {
            throw new Error(err);
          }
        }
      );
    }
  });
});

////////// SIGN UP //////////////////

router.post("/signup", (req, res) => {
  const data = req.body;

  User.findOne({ username: data.username }, (err, foundUser) => {
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
    }

    if (foundUser) {
      res.json({ msg: "Username already exists" });
    }
    if (err) {
      res.status(500).json({ msg: "An error!!!!!!" });
    }
  });
});

router.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      throw new Error(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        User.findOne({ username: user.username }, (err, loginUser) => {
          if (!err) {
            res.json({
              fname: loginUser.fname,
              lname: loginUser.lname,
              email: loginUser.email,
              username: loginUser.username,
              msg: "Login was successfull",
            });
          } else {
            res.json({
              msg: "Username or password is incorrect.",
            });
          }
        });
      });
    }
  });
});

router.get("/auth", (req, res) => {
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
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ msg: "Logout is successfull." });
});

module.exports = router;
