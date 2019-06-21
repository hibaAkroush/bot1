
// Imports dependencies and set up http server
const
    express = require('express'),
      = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

const request = require('request');

var admin = require("firebase-admin");

var serviceAccount = require("./basket-bot1-firebase-adminsdk-oxpjh-666025a607.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://basket-bot1.firebaseio.com"
});



let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
//let PAGE_ACCESS_TOKEN  ='EAAJM4NcgsGEBAEcTPiZCbYUZBtPfLhZB1Yn8r4OcVDdArvT5P62awlZAG0mGQZC53cv61aXWfEmeXaycmRDpwohxtKblEjG8TZAKZAZARyIQyQv4v990MCoO2c26ofH9a7JfHhRHdgrvebGnzyF1xIZBmqSL0GReUVbZAp4qJee5SKQGRHU50yZBEX7YwA8dEhSXGgZD';
let PAGE_ACCESS_TOKEN   = process.env.PAGE_ACCESS_TOKEN;


let messageTime1 =   Number( process.env.messageTime1); 
let messageTime2 =   Number( process.env.messageTime2);
let messageTime3 =  Number(  process.env.messageTime3);
let messageTime4 =  Number(  process.env.messageTime4);
let messageTime5 =   Number( process.env.messageTime5);

    // console.log(messageTime1);
    // console.log(messageTime2);
    // console.log(messageTime3);
    // console.log(messageTime5);
    // console.log(messageTime5);


let messageTitle1 = process.env.messageTitle1;
let messageTitle2 = process.env.messagetitle2;
let messageTitle3 = process.env.messageTitle2;
let messageTitle4 = process.env.messageTitle4;
let messageTitle5 = process.env.messageTitle5;



// console.log(messageTitle1);
// console.log(messageTitle2);
// console.log(messageTitle3);
// console.log(messageTitle3);
// console.log(messageTitle13);



let messageSubTitle1 = process.env.messageSubTitle1;
let messageSubTitle2 = process.env.messageSubTitle2;
let messageSubTitle3 = process.env.messageSubTitle3;
let messageSubTitle4 = process.env.messageSubTitle4;
let messageSubTitle5 = process.env.messageSubTitle5;


let messageImage1 = process.env.messageImage1;
let messageImage2 = process.env.messageImage2;
let messageImage3 = process.env.messageImage3;
let messageImage4 = process.env.messageImage4;
let messageImage5 = process.env.messageImage5;



let messageButtonName1 = process.env.messageButtonName1;
let messageButtonName2 = process.env.messageButtonName2;
let messageButtonName3 = process.env.messageButtonName3;
let messageButtonName4 = process.env.messageButtonName4;
let messageButtonName5 = process.env.messageButtonName5;




let NotificationData = [];


admin.database().ref(`notification`).once('value').then(data => {
    if (data.exists()) {
        let obj = data.val();
        NotificationData = Object.keys(obj);
    }
});



app.post('/webhook', (req, res) => {

    let body = req.body;
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach((entry) => {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);


            let times_tamp = webhook_event.timestamp;

            // console.log('Times Tamp: ' + times_tamp);


            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            // Get the sender PSID


            //--------GamePlay-----------

            if (webhook_event.game_play) {

                //      console.log("Game Play Now");


        






     
                //   console.log('Game ID: ' + game_id);


                let userTime = (Math.round((times_tamp / 1000) / 60)) * 1000 * 60;


                // let game_name = '';
                var message_time = [];




                    message_time[0] = messageTime1 ;
                    message_time[1] = messageTime2 ;
                    message_time[2] = messageTime3 ;
                    message_time[3] = messageTime4 ;
                    message_time[4] = messageTime5 ;





                    // message_time[0] = 23 * 60;
                    // message_time[1] = 47 * 60;
                    // message_time[2] = 96 * 60;
                    // message_time[3] = 144 * 60;
                    // message_time[4] = 191 * 60;




                   // console.log(message_time);

                    if (NotificationData.length >= 0) {

                        NotificationData.forEach((time) => {

                            let oldTime = time;
                            let userid = sender_psid;

                            admin.database().ref(`notification/` + oldTime + '/' + userid).once('value').then(day => {
                                if (day.exists()) {

                                    admin.database().ref(`notification/` + oldTime + '/' + userid).remove();



                                    for (var i = 0; i < 5; i++) {

                                        var __time_message = userTime + 60000 * parseInt(message_time[i]);
                                        NotificationData.push(__time_message);

                                        var db = admin.database();
                                        var notiref = db.ref(`notification/`);
                                        var timeRef = notiref.child(userTime + (60000 * parseInt(message_time[i])) + '/' + sender_psid);
                                        timeRef.set({
                                            textSentTime: '',
                                        });

                                    }

                                }

                            });


                        });



                    }
                    else {
                          console.log("not found");
                        for (var i = 0; i < 5; i++) {

                            var __time_message = 60000 * parseInt(message_time[i]);

                         //   console.log("time:  " + __time_message);
                            NotificationData.push(__time_message);

                            //  console.log(MessageData[i].message_time);

                            var db = admin.database();
                            var notiref = db.ref(`notification/`);
                            var timeRef = notiref.child(userTime + (60000 * parseInt(message_time[i])) + '/' + sender_psid);
                            timeRef.set({
                                textSentTime: '',
                            });

                        }
                    }


                    admin.database().ref(`users/` + sender_psid).once('value').then(day => {
                        if (day.exists()) {

                            //    console.log("Old User");

                            let dayCount = parseInt(day.val().Day);
                            var db = admin.database();
                            var ref = db.ref(`users/`);
                            var usersRef = ref.child(sender_psid);
                            usersRef.set({
                                Day: dayCount,
                            });



                            for (var i = 0; i < 5; i++) {

                                var __time_message = userTime + 60000 * parseInt(message_time[i]);
                                NotificationData.push(__time_message);

                         //   console.log("time:  " + __time_message);


                                var db = admin.database();
                                var notiref = db.ref(`notification/`);
                                var timeRef = notiref.child(userTime + (60000 * parseInt(message_time[i])) + '/' + sender_psid);
                                timeRef.set({
                                    textSentTime: '',
                                });

                            }

                        }

                        else {

                            //    console.log("New User");

                            var db = admin.database();
                            var ref = db.ref(`users/`);
                            var usersRef = ref.child(sender_psid);
                            usersRef.set({
                                Day: "0"
                            });


                            for (var i = 0; i < 5; i++) {

                                var __time_message = userTime + 60000 * parseInt(message_time[i]);
                                NotificationData.push(__time_message);

                        //    console.log("time:  " + __time_message);


                                var db = admin.database();
                                var notiref = db.ref(`notification/`);
                                var timeRef = notiref.child(userTime + (60000 * parseInt(message_time[i])) + '/' + sender_psid);
                                timeRef.set({
                                    textSentTime: '',
                                });

                            }
                        }

                    });



                

            }

            //---------------------GmaePlay End---------------


            else if (webhook_event.message) {
                //      console.log("Message");
            }

            else {
                //       console.log("no Message and no game");

            }


        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});




function callSendAPI(sender_psid, response, game_page_access_token) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": game_page_access_token },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!  Id: ' + sender_psid)
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}



function check() {
//   console.log("checking ......");
    let currentTime = (Math.round((new Date().getTime() / 1000) / 60)) * 1000 * 60;


  //  console.log('Now: ' + currentTime);

    admin.database().ref(`notification/${currentTime}`).once('value').then(data => {
        if (data.exists()) {
            let obj = data.val();
            let IdArray = Object.keys(obj);
            //console.log("count " +count);
            var db = admin.database();

            IdArray.forEach((id) => {

                let userID = id;


                admin.database().ref(`users/${userID}`).once('value').then(day => {
                    if (day.exists()) {

                        let dayCount = parseInt(day.val().Day);

                      MessageSent(userID, dayCount);


                        if (dayCount >= 4) {

                            var ref = db.ref(`users/`);
                            var usersRef = ref.child(userID);
                            usersRef.set({
                                Day: "0",
                            });
                        }

                        else {

                            var ref = db.ref(`users/`);
                            var usersRef = ref.child(userID);
                            usersRef.set({
                                Day: dayCount + 1,
                            });

                        }
                    }

                });


                admin.database().ref(`notification/`).child(currentTime).remove();

            });


            //  console.log(timeArray);
        }
        else {
            //   console.log("not found");
        }


        //   console.log(currentTime);
    });



}




function MessageSent(sender_psid, day) {

    if (day === 0) {
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": messageTitle1,
                            "image_url": messageImage1,
                            "subtitle": messageSubTitle1,
                            "default_action": {
                                "type": "game_play",
                            },
                            "buttons": [{
                                "type": "game_play",
                                "title": messageButtonName1,
                                "payload": JSON.stringify({
                                    "gift": false,
                                    "name": "Nancy",
                                    "id": "",
                                    "bot_coin": 10
                                })
                            }]
                        }
                    ]
                }
            }
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);


    }


    else if (day === 1) {
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": messageTitle2,
                            "image_url": messageImage2,
                            "subtitle":messageSubTitle2,
                            "default_action": {
                                "type": "game_play",
                            },
                            "buttons": [{
                                "type": "game_play",
                                "title": messageButtonName2,
                                "payload": JSON.stringify({
                                    "gift": true,
                                    "name": "Nancy",
                                    "id": "",
                                    "bot_coin": 0
                                })
                            }]
                        }
                    ]
                }
            }
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);

    }




    else if (day === 2) {
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": messageTitle3,
                            "image_url": messageImage3,
                            "subtitle":messageSubTitle3,
                            "default_action": {
                                "type": "game_play",
                            },
                            "buttons": [
                                {
                                    "type": "game_play",
                                    "title": messageButtonName3,
                                    "payload": JSON.stringify({
                                        "top": 0
                                    })
                                }
                            ],


                        }
                    ]
                }
            }
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);

    }



    else if (day === 3) {
        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": messageTitle4,
                            "image_url": messageImage4,
                            "subtitle": messageSubTitle4,
                            "default_action": {
                                "type": "game_play",
                            },
                            "buttons": [{
                                "type": "game_play",
                                "title": messageButtonName4,
                                "payload": JSON.stringify({
                                    "bot_data": 0
                                })
                            }]
                        }
                    ]
                }
            }
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);

    }



    else if (day === 4) {

        let response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": messageTitle5,
                            "image_url": messageImage5,
                            "subtitle":messageSubTitle5,
                            "default_action": {
                                "type": "game_play",
                            },
                            "buttons": [
                                {
                                    "type": "game_play",
                                    "title": messageButtonName5,
                                    "payload": JSON.stringify({
                                        "bot_data": 0
                                    })
                                }

                            ]
                        }
                    ]
                }
            }
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);



    }

    else {


        let response = {
            "text": `Text ${day}`
        }

        callSendAPI(sender_psid, response, PAGE_ACCESS_TOKEN);

    }
}



module.exports.check = check;




//heroku config:set messageTime1=1 messageTime2=2 messageTime3=3 messageTime4=4 messageTime5=5
//heroku config:set messageSubTitle1=messageSubTitle1 messageSubTitle2=messageSubTitle2 messageSubTitle3=messageSubTitle3 messageSubTitle4=messageSubTitle4 messageSubTitle5=messageSubTitle5
//heroku config:set messageTitle1=messageTitle1 messageTitle2=messageTitle2 messageTitle3=messageTitle3 messageTitle4=messageTitle4 messageTitle5=messageTitle5
//heroku config:set messageImage1=messageImage1 messageImage2=messageImage2 messageImage3=messageImage3 messageImage4=messageImage4 messageImage5=messageImage5
//heroku config:set messageButtonName1=Play messageButtonName2=Play messageButtonName3=Play messageButtonName4=Play messageButtonName5=Play