const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    let firstName = req.body.inName;
    let lastName = req.body.inLastName;
    let email = req.body.inEmail;
    let data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/1ff4b01b41",
        method: "POST",
        headers: {
            "Authorization" : "andrea 5ba5e31e643c6627d761b1bd31a2d541-us20"
        },
        body: jsonData,
    };

    request(options, function(error, response, body){
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }

    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

// 5ba5e31e643c6627d761b1bd31a2d541-us20

//list id 1ff4b01b41