const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


 router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',passport.checkUserNotSignedIn,usersController.signup);

router.get('/sign-in',passport.checkUserNotSignedIn,usersController.signin);

router.get('/sign-out',usersController.signout);

router.post('/create',usersController.create);

//use passport as a middle ware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),usersController.createSession);



module.exports = router;