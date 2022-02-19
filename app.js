const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const mail = req.body.mails;
    const firstname = req.body.firstname;
    var data = {
        members: [{
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/5d815353da";
    const options = {
        method: "POST",
        auth: "pratik:8d34ca2f2b518d3aab2e6ceb6a01d355-us14",
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data1) {
            const x = JSON.parse(data1);
            console.log(x);
        });
        if (response.statusCode == 200) {

            res.sendFile(__dirname + "/success.html");

        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});
app.listen(3000, function () {
    console.log("started on 3000!");
});

// apikey 8d34ca2f2b518d3aab2e6ceb6a01d355-us14
// List id 5d815353da