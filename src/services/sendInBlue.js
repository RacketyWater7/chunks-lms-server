// const Sib = require("sib-api-v3-sdk");
// require("dotenv").config();

// const client = Sib.ApiClient.instance;
// const apiKey = client.authentications["api-key"];
// apiKey.apiKey =
//   process.env.SENDINBLUE_API_KEY

// const emailSender = (receivers, message) => {
//   const tranEmailApi = new Sib.TransactionalEmailsApi();
//   const sender = {
//     email: "haseebudeen@karigar.pk",
//     name: "Haseeb",
//   };

//   // const receivers = [
//   //   {
//   //     email: "hitmanonline17@gmail.com",
//   //   },
//   // ];

//   tranEmailApi
//     .sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: "The Chunks LMS Portal",
//       textContent: `{{params.message}}
//           `,
//       // htmlContent: `
//       //     <h1>Cules Coding</h1>
//       //     <a href="https://cules-coding.vercel.app/">Visit</a>
//       //             `,
//       params: {
//         message,
//       },
//     })
//     .then(() => {
//       return "Email sent successfully!";
//     })
//     .catch(() => {
//       return "Email was not sent due to some problem.";
//     });
// };
// module.exports.emailSender = emailSender;
