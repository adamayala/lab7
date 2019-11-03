const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", function(req, res){
    
    request('https://pixabay.com/api/?key=13852021-d3f51acbba5987d024b1be305&', function (error, response, body){
        if(!error && response.statusCode == 200){
            let results = JSON.parse(body);
            let pictures = [];
            let likes = [];
            for(var i = 0; i < 4; i++){
                let randomIndex = Math.floor(Math.random() * results.hits.length);
                pictures.push(results.hits[randomIndex].previewURL);
                likes.push(results.hits[randomIndex].likes);
            }
            res.render("index", { "pictures" : pictures, "likes" : likes });
            console.log(pictures, likes);
        }
        else{
            console.log(error);
        }
        console.log(response.statusCode);
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is Running...");
});