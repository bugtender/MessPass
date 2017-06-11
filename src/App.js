import React, { Component } from "react";
import { Card, CardText, CardTitle } from "material-ui/Card";
import TextField from "material-ui/TextField";
import injectTapEventPlugin from "react-tap-event-plugin";
import sha256 from "crypto-js/sha256";
import "./App.css";

injectTapEventPlugin();

const passChar =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";
const template = "vvvvvvvvvvvv";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.generatePass = this.generatePass.bind(this);
  }

  generatePass(hashBase) {
    return template
      .split("")
      .map(function(c, i) {
        return passChar[parseInt(hashBase[i], 16) % passChar.length];
      })
      .join("");
  }

  handleChange(event) {
    let hashBase = "";
    if (
      this.refs.base.getValue() ||
      this.refs.domain.getValue() ||
      this.refs.counter.getValue()
    ) {
      hashBase = sha256(
        this.refs.base.getValue() +
          this.refs.domain.getValue() +
          this.refs.counter.getValue()
      );
    } else {
      return this.setState({ password: "" });
    }
    let seed = new Uint8Array(hashBase.words.length * 4);
    let seedView = new DataView(seed.buffer, seed.byteOffset, seed.byteLength);
    for (let i = 0; i < hashBase.words.length; i++) {
      seedView.setInt32(i * 4, hashBase.words[i], false);
    }
    this.setState({ password: this.generatePass(seed) });
  }

  render() {
    return (
      <Card className="App">
        <CardTitle title="MessPass" />
        <CardText>
          <TextField
            ref="base"
            hintText="Main Password"
            onChange={e => this.handleChange()}
          />
          <br />
          <TextField
            ref="domain"
            hintText="Domain"
            onChange={e => this.handleChange()}
          />
          <br />
          <TextField
            ref="counter"
            hintText="Counter"
            onChange={e => this.handleChange()}
          />
          <br />
          <TextField 
            name="password"
            value={this.state.password} />
          <br />
        </CardText>
      </Card>
    );
  }
}

export default App;
