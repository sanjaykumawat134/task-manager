const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routers/users");
const taskRoutes = require("./routers/task");
const app = express();
const port = process.env.PORT;
// app.use((req, res, next) => {
//   res.status(503).send("site is currently unavailable ! check soon !");
// });
app.use(express.json());
app.use(userRoutes); //user router
app.use(taskRoutes); //task router
app.listen(port, () => {
  console.log("Sever started on port" + port);
});

// const mail = require('sib-api-v3-sdk')
// const defaultClient = mail.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey="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";
// const apiInstance = new mail.EmailCampaignsApi();
// const emailCampaigns = new mail.CreateEmailCampaign();
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {"name": "From name", "email":"sanjaykumawat134@gmail.com"};
// emailCampaigns.type = "classic";

// apiInstance.createEmailCampaign(emailCampaigns).then((data)=>{onsole.log('API called successfully. Returned data: ' + data);},(error)=>{
//   console.log(error)
// // })
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = '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';
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {"name": "From name", "email":"sanjaykumawat134@gmail.com"};
// emailCampaigns.type = "classic";
// emailCampaigns.htmlContent = 'Congratulations! You successfully sent this example campaign via the Sendinblue API.',
// emailCampaigns.to =[
//   {
//     "name":'suraj k',
//     "email":"surajkumawat668@gmail.com"
//   }
// ]
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
// console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
// console.error(error);
// });

// Y