// JavaScript source code
// JavaScript source code
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})


// API End Point - added by Stefan

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'menu') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'parent') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'student') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'help') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'Menu') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'Parent') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'Student') {
                sendGenericMessage(sender)
                continue
            }
            if (text === 'Help') {
                sendGenericMessage(sender)
                continue
            }
         sendTextMessage(sender, "Sorry I don't Understand:  "+ text.substring(0, 200)+"  :Type words according to the instructions")
        }
        if (event.postback) {
            sendTextMessage(sender, event.postback.payload, token)
            continue
        }
    }
    res.sendStatus(200)
})

var token = "EAAByJOS1OvIBAPeGZBjhgNuNpVEuyDJujcEbtn2pBSIH18eTkOBBGjq8dZCZCusSHkPmZBs06ZAkMV8C6xIN8ZBxpgb7JueWgpKhIPZCJFCQhp8dWClkMgrZBKPac9vs6ZB9XroZC5Af6iKnB3pUVEcFh4ynfdRp2EgXYl2Tti7ydJPoZBBnLmmpq7X"

// function to echo back messages - added by Stefan

function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


// Send an test message back as two cards.

function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Are you a Parent?",
                    "subtitle": "Choose from the following:",
                    "image_url": "https://www.stac.edu/sites/default/files/parent-portal.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Seek Admission",
                        "payload": "Admissions are open for classes 1 - 4 and will be closed by 13th of this month. The Admissions for other classes have been closed. Stay updated to know more.",
                    }, {
                        "type": "postback",
                        "title": "Fee Structure",
                        "payload": "*PRIMARY SCHOOL- Rs. 20,000 - Rs.30,000/-P.A  MIDDLE SCHOOL- Rs. 40,000 - Rs 60,000/-P.A HIGH SCHOOL- Rs.70,000 - Rs. 1,00,000/-P.A*. The fees mentioned includes- mess charges, books and all the other requirements.",
                    }, {
                        "type": "postback",
                        "title": "Appointments",
                        "payload":"Principal and Dean will be available from MONDAY to SATURDAY from 9.00 am to 11.00 am. Also, the parents can meet their child's respective subject teachers from 10.00am every Saturday. ",
                    }],
                }, {
                    "title": "Are you a Student?",
                    "subtitle": "Choose from the following",
                    "image_url": "https://yt3.ggpht.com/-XcCpDxeWwUM/AAAAAAAAAAI/AAAAAAAAAAA/780KY8z0Wrs/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "Exam Schedule",
                        "payload": "Exams are scheduled to start from Dec 4th 2017.",
                    }, {
                        "type": "postback",
                        "title": "Timings",
                        "payload": "MON-FRI 8.30 to 3.30 SAT 8.30 to 1",
                    }, {
                        "type": "postback",
                        "title": "List of Holidays",
                        "payload": "Apart from national holidays, every 2nd and 4th Saturday is a holiday",
                    }],
                }, {
                    "title": "Know more about us",
                    "subtitle": "Choose from the following",
                    "image_url": "https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_960_720.png",
                    "buttons": [{
                        "type": "phone_number",
                        "title": "Contact us",
                        "payload": "+91 XXXXXXXXXX",
                    }, {
                        "type": "web_url",
                        "title": "Address",
                        "url": "https://www.google.co.in/maps/place/Hussain+Sagar/@17.4241047,78.457007,14z/data=!3m1!4b1!4m5!3m4!1s0x3bcb97558c2e9b6b:0x25705363cc844e9d!8m2!3d17.4238798!4d78.4738215",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


