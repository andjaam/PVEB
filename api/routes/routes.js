const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');
const SocketController = require('../controllers/socketController');

const wordModel = require('../models/word');

/**
 * @description
 * route for creating new room on server
 */
router.post("/createRoom", Controller.createRoom);

/**
 * @description
 * dummy route
 */
router.get("/socketPort", (req, res, next) => {
    res.json({ url: (process.env.PORT || 3000) });
});

/**
 * @description
 * route for delivering name of private room with some id
 */
router.get("/getName/:idSobe", Controller.getNameOfRoom);

/**
 * @description
 * route which catches data from
 * dialog form
 */
router.patch("/sendRules", Controller.setRules);

/**
 * @description
 * route which takes words from databse
 * and sends only three to choose from
 */
// /:lang
router.get("/getWords/:idSobe", (req, res) => {
    let room = SocketController.rooms.find(x => x.roomId === req.params.idSobe);
    if (room.language == 'engleski') {
        (wordModel.eng).find({})
            .then((data) => {
                console.log(data.length);
                const index1 = Math.floor(Math.random() * data.length);
                const index2 = Math.floor(Math.random() * data.length);
                const index3 = Math.floor(Math.random() * data.length);

                const d1 = data[index1];
                const d2 = data[index2];
                const d3 = data[index3];

                res.json([d1, d2, d3]);
            })
            .catch((error) => {
                console.log('Error while getting words.')
            });
    } else if (room.language == 'srpski') {
        console.log('here');
        (wordModel.srb).find({})
            .then((data) => {
                console.log(data.length);
                const index1 = Math.floor(Math.random() * data.length);
                const index2 = Math.floor(Math.random() * data.length);
                const index3 = Math.floor(Math.random() * data.length);

                const d1 = data[index1];
                const d2 = data[index2];
                const d3 = data[index3];

                res.json([d1, d2, d3]);
            })
            .catch((error) => {
                console.log('Error while getting words.')
            });
    }
});

/**************************************/
router.get("/hallOfFame", (req, res, next) => {
    let array = SocketController.bestPlayers;
    try{
        res.status(200).json(array);
    }
    catch(error) {
        next(error);
    }
});


/**
 * @description
 * route for delivering data for users in private with params_id 
 */
router.get("/getPlayers/:roomId", Controller.getPlayers);
/**
 * @description
 * route for delivering dashes instead of words to clients 
 */
router.get("/getDashes/:roomId", Controller.getDashes);
module.exports = router;