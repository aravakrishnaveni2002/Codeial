const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');


 router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-up',passport.checkUserNotSignedIn,userController.signup);

router.get('/sign-in',passport.checkUserNotSignedIn,userController.signin);

router.get('/sign-out',userController.signout);

router.post('/create',userController.create);

//use passport as a middle ware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
),userController.createSession);
module.exports = router;