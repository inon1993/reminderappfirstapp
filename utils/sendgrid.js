const sgMail = require("@sendgrid/mail");

const sendMail = (data, foundUser, page, callback) => {
  console.log(data);
  const API_KEY = process.env.API_KEY_SENDGRID;
  sgMail.setApiKey(API_KEY);

  const date = `${data.date} ${data.time}`;
  console.log(date);
  const dateTime = new Date(date);
  console.log(dateTime);
  const unixTimeStamp = Math.floor(dateTime.getTime() / 1000);
  console.log(unixTimeStamp);
  console.log(foundUser.email);
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
      console.log("succ");
      callback(undefined, "Successfully sent mail");
    })
    .catch((error) => {
      console.log(error);
      console.log("err");
      callback("Sending mail has Faild!", undefined)
    });
};

module.exports = sendMail;
