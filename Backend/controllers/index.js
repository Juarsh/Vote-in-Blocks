const registerController = require('./registerController');
const loginController = require('./loginController');
const totalElectionController = require('./totalElectionController');
const votingElectionController = require('./votingElectionController');
const votingController = require('./votingController');
const conductedController = require('./conductedController');
const passportGoogleCallback = require('./passportGoogleCallback');
const updateController = require('./updateController');

module.exports = { 
    registerController, 
    loginController, 
    totalElectionController, 
    votingElectionController, 
    votingController, 
    conductedController, 
    updateController, 
    passportGoogleCallback 
};