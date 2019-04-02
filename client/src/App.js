import React, { Component } from "react";
import { Provider } from "react-redux";
import QuoteGetter from "./components/QuoteGetter";
import "./App.css";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img
              src="http://gentlemint-media.s3.amazonaws.com/images/2012/03/09/4b1558ac.jpeg.563x405_q85_crop-smart_upscale.jpg"
              className="App-logo"
              alt="logo"
            />

            <h1 className="App-title">Ron Swanson Musings</h1>
          </header>
          <div className="quote-getter">
            <QuoteGetter />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
