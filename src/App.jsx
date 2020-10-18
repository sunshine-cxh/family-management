import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  }
}
