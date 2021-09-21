import React, { FC } from 'react';
import './App.css';
import Counter from './Counter';
import Dependency from './Dependency';
import HttpRequest from './HttpRequest';

const App: FC = () => (
  <div className="App">
    <Dependency />
    <hr />
    <Counter />
    <hr />
    <HttpRequest />
  </div>
);

export default App;
