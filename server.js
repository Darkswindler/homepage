const express = require('express');
var request = require('request'); // 後端request 模組 記得npm install
const app = express();

console.log('Server-side code running');

// 預設靜態生成資料夾 public 記得放你的 css 與 圖片 這樣才能在local:8080/public 找的到
app.use(express.static('public'));

var port = process.env.PORT || 8080;

// start the express web server listening on 8080
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

//預防前端data前往後端路上遺失
app.use(require("body-parser").json());

// 使用picker.js
app.use('/picker', express.static('node_modules/pickerjs/dist'));

// serve the homepage 預設主頁面為 index.html
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/login.html');
// });

// 後端接收前端  POST 的 接口  拿前端資料做壞事的地方!!!!
app.post('/clicked', (req, res) => {
    const click = { clickTime: new Date() };
    res.send(click);
});

// 後端進行資料處理 (向伺服器要資料) GET 接口

// token
app.post('/lineAccessToken', (req, res) => {

    var formBody = [];
    var encodedKey, encodedValue;
    for (var property in req.body) {
        encodedKey = encodeURIComponent(property);
        encodedValue = encodeURIComponent(req.body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    request.post("https://api.line.me/oauth2/v2.1/token", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: formBody
        },
        (error, response, body) => {
            console.log("lineAccessToken-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// line userID
app.post('/lineUserID', (req, res) => {

    request.get("https://api.line.me/v2/profile", {
            headers: {
                'Authorization': 'Bearer ' + req.body.access_token
            }
        },
        (error, response, body) => {
            console.log("lineUserID-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN guestKey
app.get('/guestKey', (req, res) => {

    request.get("http://api-dev.bluenet-ride.com/v2_0/GetGuestKey",
        (error, response, body) => {
            console.log("guestKey-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN user verify
app.post('/userVerify', (req, res) => {

    var body = {
        guestKey: req.body.BNguestKey,
        kind: 4,
        uid: req.body.lineID,
        code: req.body.lineToken
    }

    request.post("https://api-dev.bluenet-ride.com/v2_0/register/verify", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: body
        },
        (error, response, body) => {
            console.log("userVerify-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN user signin
app.post('/userSignin', (req, res) => {

    var body = {
        guestKey: req.body.BNguestKey,
        kind: 4,
        uid: req.body.lineID,
        accessToken: req.body.lineToken
    }

    request.post("https://api-dev.bluenet-ride.com/v2_0/register/signin", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: body
        },
        (error, response, body) => {
            console.log("userSignin-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// historyAddress
app.post('/historyAddress', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/taxi/order/post/history", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("historyAddress-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// delHistoryAddress
app.post('/delHistoryAddress', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/taxi/order/post/history/del", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("delHistoryAddress-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// favoriteAddress
app.post('/favoriteAddress', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/taxi/order/favorite/list", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("favoriteAddress-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// delFavoriteAddress
app.post('/delFavoriteAddress', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/taxi/order/favorite", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("delFavoriteAddress-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN post order
app.post('/postOrder', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/post", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("postOrder-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN submit order
app.post('/submitOrder', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/submit", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("submitOrder-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN cancel order
app.post('/cancelOrder', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/cancel", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("cancelOrder-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN refresh
app.post('/refresh', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/request/refresh", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("refresh-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// LINE message
app.post('/lineMessage', (req, res) => {

    request.post("https://bn-bot.herokuapp.com/api", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("phoneVerify-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// progress order list
app.post('/progressList', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/progress/list", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("progressList-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// done order list
app.post('/doneList', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/done/list", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("doneList-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// order detail
app.post('/orderDetail', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/detail", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("orderDetail-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// order favorite
app.post('/orderFavorite', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/taxi/order/favorite", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("orderFavorite-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// submit grade
app.post('/submitGrade', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/passenger/order/user/grade", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("submitGrade-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN phone signup
app.post('/phoneSignup', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/user/phone/signup", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("phoneSignup-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// BN phone verify
app.post('/phoneVerify', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/user/phone/verify", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("phoneVerify-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});

// merge account
app.post('/mergeAccount', (req, res) => {

    request.post("https://api-dev.bluenet-ride.com/v2_0/user/account/merge", {
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        },
        (error, response, body) => {
            console.log("mergeAccount-response-statusCode", response.statusCode);
            if (error) {
                console.log('Error while sending message' + error);
                return;
            }
            if (response.statusCode !== 200) {
                console.log('Error status code while sending message ' + body.errMsgs);
                return;
            }
            console.log('Send registerPost succeeded');
            res.send(body);
        })

});