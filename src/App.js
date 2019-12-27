import React, { Component } from 'react';
import * as f1 from "./files/1.json";
import * as f2 from "./files/2.json";
import * as f3 from "./files/3.json";
import * as f4 from "./files/4.json";
import * as f5 from "./files/5.json";
import * as f6 from "./files/6.json";
import * as f7 from "./files/7.json";
import * as f8 from "./files/8.json";
import * as f9 from "./files/9.json";
import { checkEligibility } from './utils/utils';
import './App.css';

const files = [
  f1, f2, f3, f4, f5, f6, f7, f8, f9,
];

class App extends Component {

  constructor(props) {
    super(props);
    this.results = files.map((f) => checkEligibility(f));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Liberis Eligibility Test
          </p>
          <div>
          <ul>
            {this.results.map((r, i) => (
              <li>Input {i + 1} - {r ? 'Eligible' : 'Ineligible'}</li>
            ))}
          </ul>
        </div>
        </header>
      </div>
    );
  }
}

export default App;
