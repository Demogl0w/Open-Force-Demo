const express = require("express");
const https = require("https");
const app = express();
const cors = require("cors");
const port = 5000;
var bodyParser = require("body-parser");
let database = []; // in place of a database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Pulling in quotes from Ron Swanson API
const getQoutes = () => {
  https
    .get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/58", resp => {
      let data = "";
      console.log("Working");
      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        let parsed = JSON.parse(data);
        database = parsed.map(quote => {
          return {
            ratings: [],
            averageRating: 0,
            quote: quote,
            rateingIps: []
          };
        });
        // console.log(database);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
};

// Rating Quotes and Checking IP Adress for duplicate rating
app.post("/RateQuote", (req, res) => {
  let entry =
    database[
      database.findIndex(e => {
        if (e.quote === req.body.quote) {
          return true;
        }
      })
    ];

  if (entry && !entry.rateingIps.includes(req.ip)) {
    entry.ratings.push(req.body.rating);
    entry.rateingIps.push(req.ip);
    entry.averageRating =
      entry.ratings.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) / entry.ratings.length;
    res.send(JSON.stringify({ status: "Sucssessfully Rated" }));
  } else {
    res.send(JSON.stringify({ status: "Already Rated" }));
  }
  console.log(req.ip);
});

getQoutes();

// Case Handler for Quote size sorting. Small ,Medium, Large
function quoteSizer(size, numOfWords) {
  switch (size) {
    case "Large":
      if (numOfWords >= 12) {
        return true;
      } else {
        return false;
      }
      break;
    case "Medium":
      if (numOfWords < 12 && numOfWords > 4) {
        return true;
      } else {
        return false;
      }
      break;
    case "Small":
      if (numOfWords <= 4) {
        return true;
      } else {
        return false;
      }
      break;
    default:
      return true;
      break;
  }
}

//Finding number of words sentence
app.get("/Quote/:size", (req, res) => {
  let Quotes = database.filter(entry => {
    let numOfWords = entry.quote.split(" ").length;
    if (quoteSizer(req.params.size, numOfWords)) {
      return entry;
    }
  });

  let randomNumber = Math.floor(Math.random() * (Quotes.length - 1));

  res.send(Quotes[randomNumber]);
});

//Randomizing
app.get("/Quote", (req, res) => {
  let randomNumber = Math.floor(Math.random() * (database.length - 1));
  res.send(database[randomNumber]);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
