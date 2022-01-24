const express = require('express');
const router = express.Router();
const passport = require('passport');
const friendshipController = require('../controllers/friendship_controller');

router.get('/toggle',friendshipController.toggleFriendship);
router.get('/remove',friendshipController.removeFriendship);

module.exports = router;