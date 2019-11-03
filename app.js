const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async function(req, res){
    let keywords = ["otters", "computers", "monterey", "nerds"];
    let orientation = "horizontal";
    let keyword = keywords[Math.floor(Math.random() * keywords.length)];
    console.log(keyword);
    let results = await getImages(keyword, orientation);
    let pictures = [];
    let likes = [];
    let numbers = [];
    for(var i = 0; i < 4; i++){
        let randomIndex = Math.floor(Math.random() * results.hits.length);
        while(numbers.includes(randomIndex)){
            randomIndex = Math.floor(Math.random() * results.hits.length);
        }
        numbers.push(randomIndex);
        pictures.push(results.hits[randomIndex].previewURL);
        likes.push(results.hits[randomIndex].likes);
    }
    res.render("index", { "pictures" : pictures, "likes" : likes });
});

app.get("/results", async function(req, res){
    let keyword = req.query.keyword;
    let orientation = req.query.orientation;
    let results = await getImages(keyword, orientation);
    let pictures = [];
    let likes = [];
    let numbers = [];
    for(var i = 0; i < 4; i++){
        let randomIndex = Math.floor(Math.random() * results.hits.length);
        while(numbers.includes(randomIndex)){
            randomIndex = Math.floor(Math.random() * results.hits.length);
        }
        numbers.push(randomIndex);
        pictures.push(results.hits[randomIndex].previewURL);
        likes.push(results.hits[randomIndex].likes);
    }
    res.render("results", { "pictures" : pictures, "likes" : likes });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is Running...");
});

function getImages(keyword, orientation){
    return new Promise(function(resolve, reject){
        request('https://pixabay.com/api/?key=13852021-d3f51acbba5987d024b1be305&q=' + keyword + '&orientation=' + orientation, function (error, response, body){
            if(!error && response.statusCode == 200){
                let results = JSON.parse(body);
                resolve(results);
            }
            else{
                reject(error);
            }
        });
    });
}