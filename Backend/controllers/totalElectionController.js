const Vote = require("../models/voting_model");

const { validationResult } = require("express-validator");

const totalElectionController = async (req, res) => {
  const { email, time } = req.query;
  let invited = await Vote.find({
    invites: email,
  });
  let conducted = await Vote.find({
    adminEmail: email,
  });
  Vote.find()
    .then((elec) => {
      let count = 0;
      for (let i = 0; i < elec.length; i++) {
        if (elec[i].startTime < time && elec[i].endTime > time) count++;
      }
      res.json({
        electionSize: elec.length,
        invitedSize: invited.length,
        conductedSize: conducted.length,
        live: count,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        err,
      });
    });
};

module.exports = totalElectionController;
