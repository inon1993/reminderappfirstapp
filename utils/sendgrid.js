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
  sgMail
    .send(message)
    .then(() => {
      callback(undefined, "Successfully sent mail");
    })
    .catch((error) => callback("Sending mail has Faild!", undefined));
};

module.exports = sendMail;
