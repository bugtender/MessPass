import React, { Component } from "react";
import { Card, CardText } from "material-ui/Card";
import TextField from "material-ui/TextField";
import injectTapEventPlugin from "react-tap-event-plugin";
import sha256 from "crypto-js/sha256";
import bigInt from "big-integer";
import "./App.css";

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this.digitsStr =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let hashBase = String(
      sha256(
        this.refs.base.getValue() +
          this.refs.domain.getValue() +
          this.refs.counter.getValue()
      )
    );
    // hashBase = bigInt(hashBase,16)
    this.setState({ password: hashBase });
  }

  render() {
    return (
      <Card className="App">
        <CardText>
          <TextField
            hintText="Main Password"
            ref="base"
            value={this.state.base}
            onChange={event => this.handleChange()}
          />
          <br />
          <TextField
            hintText="Domain"
            ref="domain"
            value={this.state.domain}
            onChange={event => this.handleChange()}
          />
          <br />
          <TextField
            hintText="Counter"
            ref="counter"
            value={this.state.counter}
            onChange={event => this.handleChange()}
          />
          <br />
          <TextField value={this.state.password} />
          <br />
        </CardText>
      </Card>
    );
  }
}

export default App;
