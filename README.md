# Codeial
It's a social media website.

Features - 
* Add post
* Delete a post which he/she posted olny
* Add comments to post
* Delete a comment which he/she commented only
* Can upload picture on his/her profile
* Can update username and emil id
* User gets a mail whenever he adds a new comment
* User can also signin using his/her google account
* User gets flex messages whenever he signsin, signsout, added or deleted a post, added or deleted a comment, updates his profile 

Some Key Points -  
* The whole source code is in MVC structure
* Made the authentication and authorisation using 'passport'
* Added google sigin-in using 'passport-google-oauth'
* Added flex messages using 'connect-flash' and 'Noty js'
* Used AJAX requests so that every time users adds deletes the posts and comments the whole page does not got refreshed
* Used 'Multar' so that one can add a profile pic 
* Created api for posts and users and setup authentication using 'passport-jwt' to delete a post
* Used 'Nodemailer' to send mails whenver user adds a new comments also used the concept of delayed jobs using 'Kue' and 'Redis'



