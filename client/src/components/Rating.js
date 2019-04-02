import React from "react";
import BlackStar from "../images/BlackStar.png";
import HalfStar from "../images/HalfStar.png";
import NoStar from "../images/NoStar.png";
import "./quoteGetter.css";

//Forming a post request for rating storage
const poster = (rating, quote) => {
  fetch("http://localhost:5000/RateQuote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rating: rating, quote: quote })
  })
    .then(response => response.json())
    .then(payload => alert(payload.status))
    .catch(e => console.log(e));
};

const Rating = props => {
  let stars = [];
  let halfie = true;
  for (let index = 1; index < 6; index++) {
    //Finding Range for quotes and pusing visual feedback
    if (props.rating >= index) {
      stars.push(
        <img
          className="stars"
          alt="Filled in Star"
          key={Math.random()}
          onClick={() => poster(index, props.quote)}
          src={BlackStar}
        />
      );
      //Finding Average for quotes and pusing visual feedback
    } else if (props.rating % 1 !== 0 && halfie) {
      halfie = false;
      stars.push(
        <img
          className="stars"
          key={Math.random()}
          src={HalfStar}
          alt="Half Filled Star"
          onClick={() => poster(index, props.quote)}
        />
      );
      //Finding Range for quotes and pusing visual feedback
    } else {
      stars.push(
        <img
          className="stars"
          alt="Empty Star"
          key={Math.random()}
          onClick={() => poster(index, props.quote)}
          src={NoStar}
        />
      );
    }
  }

  return stars;
};

export default Rating;
