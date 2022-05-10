const nodemailer = require("nodemailer");

const { validationResult } = require("express-validator");

const Vote = require("../models/voting_model");

const votingController = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.NodemailerPassword,
    },
  });
  const {
    name,
    desc,
    startTime,
    endTime,
    candidates,
    candidateDetails,
    invites,
    adminEmail,
    resultsDeclared,
  } = req.body.election;
  const vote = new Vote({
    name,
    desc,
    startTime,
    endTime,
    candidates,
    candidateDetails,
    invites,
    adminEmail,
    resultsDeclared,
  });
  console.log(candidateDetails);
  var stA = new Date(req.body.election.startTime).toString().split(" ");
  var start =
    stA[0] + ", " + stA[1] + " " + stA[2] + " " + stA[3] + " " + stA[4];
  var etA = new Date(req.body.election.endTime).toString().split(" ");
  var end = etA[0] + ", " + etA[1] + " " + etA[2] + " " + etA[3] + " " + etA[4];
  var mailOptions = {
    from: process.env.email,
    to: invites,
    subject: `Invites for Election ${req.body.election.name}`,
    html: `
        <html>
            <head>
            </head>
            <body style = "text-align: center; background-color: #3396FF;">
            <img src="https://i2.wp.com/www.yesmagazine.org/wp-content/uploads/2020/01/ranked-choice-voting-burton.jpg?fit=1400%2C840&quality=90&ssl=1" class="img-rounded">
            <div>
                <h1 style = "color: black;">
                    You are invited to vote in ${req.body.election.name}
                </h1>
                <h2 style = "color: black;">
                    ${req.body.election.desc}
                </h2>
                <h2 style = "color: black;">
                    The election is live between<br><b>${start}</b> and <b>${end}</b>
                </h2>
                <h2 style = "color: black;">
                    <a href = "http://localhost:1234" style = "color: black;">Click here</a> to vote
                </h2>
                <br>
                <br>
            </div>
            </body>
        </html>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  vote.save((err) => {
    if (err) {
      return res.status(400).json({
        errors: err,
      });
    } else {
      console.log("saved");
      return res.json({
        success: true,
        id: vote._id,
        candidateDetails: vote.candidateDetails,
        message: "saved",
      });
    }
  });
};

module.exports = votingController;
