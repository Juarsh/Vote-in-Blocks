const router = require("express").Router();

const {
  totalElectionController,
  votingElectionController,
  votingController,
  conductedController,
  updateController,
} = require("../controllers");

router.post("/voting", votingController);

router.get("/conducted", conductedController);

router.get("/totalelection", totalElectionController);

router.get("/votingelection", votingElectionController);

router.put("/update", updateController);

module.exports = router;
