const sgMail = require("@sendgrid/mail");

const sendMail = (data, foundUser, page, callback) => {
  const API_KEY = process.env.API_KEY_SENDGRID;
  sgMail.setApiKey(API_KEY);

  const date = `${data.date} ${data.time}`;
  const dateTime = new Date(date);
  const unixTimeStamp = Math.floor(dateTime.getTime() / 1000);
  const message = {
    to: foundUser.email,
    from: {
      name: "ReminderApp",
      email: "reminderappmailing@gmail.com",
    },
    subject: data.title,
    html: page,
    send_at: unixTimeStamp,
  };
  console.log("ffff");
  sgMail
    .send(message)
    .then(() => {
      console.log("5");
      callback(undefined, "Successfully sent mail");
    })
    .catch((error) => {
      console.log("6");
      callback("Sending mail has Faild!", undefined)
    });
};

module.exports = sendMail;
