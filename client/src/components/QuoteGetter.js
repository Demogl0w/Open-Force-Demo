import React, { Component } from "react";
import Rating from "./Rating";
import { connect } from "react-redux";
import { GET_NEW_QUOTE, SET_SIZE } from "../store/actions/constants";
import "./quoteGetter.css";
import "./ratings.css";

// import store from "../store";

const mapStateToProps = state => ({
  ...state.customers
});
const mapDispatchToProps = dispatch => ({
  setSize: quoteSize => dispatch({ type: SET_SIZE, payload: quoteSize }),
  getQuote: size => {
    fetch(`http://localhost:5000/Quote/${size}`)
      .then(res => res.json())
      .then(tempQuote => {
        console.log(tempQuote);
        dispatch({ type: GET_NEW_QUOTE, payload: tempQuote });
      })
      .catch(e => {
        console.log(e);
      });
  }
});

class Quoter extends Component {
  componentWillMount() {
    this.props.getQuote();
  }

  newQuoteView() {
    if (this.props.tempQuote) {
      return (
        <div key={this.props.tempQuote.quote} className="ronsWords">
          {this.props.tempQuote.quote}
        </div>
      );
    }
  }

  render() {
    return (
      <div id="QuoteGetter">
        <div>
          <button
            className="quoteButton"
            onClick={() => {
              this.props.getQuote(this.props.size);
            }}
          >
            Wisdom
          </button>{" "}
          <select onChange={e => this.props.setSize(e.target.value)}>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
          {this.newQuoteView()}
        </div>
        <div id="ratinghousing">
          {this.props.tempQuote.averageRating !== undefined && (
            <Rating
              rating={this.props.tempQuote.averageRating}
              quote={this.props.tempQuote.quote}
            />
          )}
        </div>
        <span className="guideline" />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quoter);
