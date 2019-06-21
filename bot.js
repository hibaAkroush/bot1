var request = require('request');
var access_token ='EAAJM4NcgsGEBAEcTPiZCbYUZBtPfLhZB1Yn8r4OcVDdArvT5P62awlZAG0mGQZC53cv61aXWfEmeXaycmRDpwohxtKblEjG8TZAKZAZARyIQyQv4v990MCoO2c26ofH9a7JfHhRHdgrvebGnzyF1xIZBmqSL0GReUVbZAp4qJee5SKQGRHU50yZBEX7YwA8dEhSXGgZD';

module.exports = function(app) {
    //
    // GET /bot
    //
    app.get('/bot', function(request, response) {
        if (request.query['hub.mode'] === 'subscribe' &&
            request.query['hub.verify_token'] === '654321') {
            console.log("Validating webhook");
            response.status(200).send(request.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            response.sendStatus(403);
        }
    });

    //
    // POST /bot
    //
    app.post('/bot', function(request, response) {
       var data = request.body;
       console.log('received bot webhook');


        if (data.object === 'page') {

            data.entry.forEach(function(entry) {
               var pageID = entry.id;
               var timeOfEvent = entry.time;

               entry.messaging.forEach(function(event) {
                    if (event.message) {
						console.log('Message Event');
                        receivedMessage(event);
                    } else if (event.game_play) {
						console.log('Game play Event');
                        receivedGameplay(event);
                    } else {
                       // console.log("Webhook received unknown event: ", event);
                    }
                });
            });
        }
        response.sendStatus(200);
    });

    //
    // Handle messages sent by player directly to the game bot here
    //
    function receivedMessage(event) {

    }

    //
    // Handle game_play (when player closes game) events here.
    //
    function receivedGameplay(event) {

        var senderId = event.sender.id;
        // FBInstant player ID
        var playerId = event.game_play.player_id;
        // FBInstant context ID
        var contextId = event.game_play.context_id;

        sendMessage(senderId, null, 'Thanks for playing! 😋 Come back anytime soon ❤️️', "Play NOW!", null,'https://3.bp.blogspot.com/-GCthVhwGrmI/XOGMz9u1GkI/AAAAAAAAGdk/yyVw-IbUIm0haaVFL9mwRdi07i20maUCwCPcBGAYYCw/s400/400.png');

    }

    //
    // Send bot message
    //

    function sendMessage(player, context, message, cta, payload,imageUrl) {

        var button = {
            type: "game_play",
            title: cta
        };

        if (context) {
            button.context = context;
        }
        if (payload) {
            button.payload = JSON.stringify(payload)
        }
        var messageData = {
            recipient: {
                id: player
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                        {
                            title: message,
							image_url:imageUrl,
                            buttons: [button]
                        }
                        ]
                    }
                }
            }
        };

        callSendAPI(messageData);

    }

	function sendMessageNoImage(player, context, message, cta, payload) {

        var button = {
            type: "game_play",
            title: cta
        };

        if (context) {
            button.context = context;
        }
        if (payload) {
            button.payload = JSON.stringify(payload)
        }
        var messageData = {
            recipient: {
                id: player
            },
            message: {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                        {
                            title: message,
                            buttons: [button]
                        }
                        ]
                    }
                }
            }
        };

        callSendAPI(messageData);

    }

    function callSendAPI(messageData) {
        var graphApiUrl = 'https://graph.facebook.com/me/messages?access_token='+access_token;
        request({
            url: graphApiUrl,
            method: "POST",
            json: true,
            body: messageData
        }, function (error, response, body){
            console.error('send api returned', 'error', error, 'status code', response.statusCode, 'body', body);
        });
    }

}
