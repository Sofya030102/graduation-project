import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authorization from './components/authorization/index';
import Registration from './components/registration/index';
import Cabinet from './components/cabinet/index';
import Header from './components/header';
import Admin from './components/admin';
import Home from './components/Home';
import './main.css';
import VotingResults from "./components/Voting_results/Voting_results";
import Auditor from "./components/auditor";
import EcPanel from "./components/ec_panel/ecPanel";

class Main extends Component {

  render() {

    return (
      <div className="main">
        <Router>
          <Switch>
            <Route path="/authorization">
              <Authorization />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/vote_results">
              <Header />
              <VotingResults />
            </Route>
            <Route path="/cabinet">
              <Header />
              <Cabinet />
            </Route>
            <Route path="/admin">
              <Header />
              <Admin />
            </Route>
            <Route path="/home">
              <Header />
              <Home />
            </Route>
            <Route path="/auditor">
              <Header />
              <Auditor />
            </Route>
            <Route path="/ecPanel">
              <Header/>
              <EcPanel/>
            </Route>
          </Switch>
         </Router>
      </div>
    );
  }
}

export default Main;
