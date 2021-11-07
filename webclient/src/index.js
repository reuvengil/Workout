import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import apiGuiRequests from "./api/GuiRequests";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Container from './components/container';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import CreateNew from './components/createNew';
import ShowWorkout from './components/showWorkout';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: apiGuiRequests.loadTheRightContent({ true: Home, false: Login }),
      createNew: apiGuiRequests.loadTheRightContent({ true: CreateNew, false: Login }),
      showWorkout: apiGuiRequests.loadTheRightContent({ true: ShowWorkout, false: Login }),
      navbar: apiGuiRequests.createNavbar({ title: props.title, subtitle: props.subtitle }),
    }
  }
  render() {
    return (
      <>
        {this.state.navbar}
        <Router>
          <Switch>
            <Route path="/register">
              <Container inContainer={<Register />} />
            </Route>
            <Route path='/createNew'>
              <Container inContainer={this.state.createNew} />
            </Route>
            <Route path='/showWorkout'>
              <Container inContainer={this.state.showWorkout} />
            </Route>
            <Route path="/">
              <Container inContainer={this.state.home} />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

ReactDOM.render(<App title='WorkOut' subtitle='No Pain No Gain' />, document.getElementById('root'));