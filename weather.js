const express=require("express");
const app = express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");


});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const appKey="19367729105b86431149b6444b4b4747"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +appKey+"&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const weatherData= JSON.parse(data);

      const temp=weatherData.main.temp;
      const icon= weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weatherData);
      res.write("<h1>The weather in " +query+" is " + weatherData.weather[0].description+"</h1>");
      res.write("<h3>The temp of " +query+ " is " + temp+ "</h3>");
      res.write("<img src=" + imageURL + ">" )
      res.send();
    })
  })

})



app.listen("3000", function(){
  console.log("Server running");
})
