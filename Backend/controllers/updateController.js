const Vote = require("../models/voting_model");

const { validationResult } = require("express-validator");

const updateController = async (req, res) => {
  const { id } = req.body;
  console.log(req);
  let Found = await Vote.findOneAndUpdate(
    {
      _id: id,
    },
    { resultsDeclared: true },
    { new: true }
  );

  if (Found)
    return res.json({
      success: true,
      conducted: Found,
    });
  else
    return res.json({
      success: false,
    });
};

module.exports = updateController;
