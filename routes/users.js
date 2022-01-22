const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


 router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
 router.post('/update/:id',passport.checkAuthentication,usersController.update);

router.get('/sign-up',passport.checkUserNotSignedIn,usersController.signup);

router.get('/sign-in',passport.checkUserNotSignedIn,usersController.signin);

router.get('/sign-out',usersController.signout);

router.post('/create',usersController.create);

//use passport as a middle ware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession);


router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email','']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/users/sign-in'}),usersController.createSession);

<<<<<<< HEAD
=======

>>>>>>> cc368930804fe851c8a1bca9d9ee0fc07617db62
module.exports = router;