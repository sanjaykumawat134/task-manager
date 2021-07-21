const sgMail = require("@sendgrid/mail");
const sendGridApiKey =
  "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";
sgMail.setApiKey(sendGridApiKey);
const sendEmailOnCreation = async (user) => {
  const response = await sgMail.send({
    from: "aswaniusha13@gmail.com",
    to: user.email,
    subject: "first email",
    text: "welcome to task manager",
  });
};
const sendEmailOnDeletion = async (user) => {
  await sgMail.send({
    from: "aswaniusha13@gmail.com",
    to: user.email,
    subject: "delete account",
    text: "your account has been deleted successfully",
  });
};
module.exports = {
  sendEmailOnCreation,
  sendEmailOnDeletion,
};
