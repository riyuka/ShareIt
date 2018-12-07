import React, { Component } from "react";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Search from "./Search";
import MyAccount from "./MyAccount";


class App extends Component {
  render() {
    return (
      <div className="appSite">
        <Header />
        <div className="card-columns">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/" component={LinkList} />
          
            <Route exact path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
            <Route exact path="/myaccount" component={MyAccount} />
          </Switch>
        </div>
        <div className="appContent2">
          <Switch>
           
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            
          </Switch>
        </div>
      </div>
     
    );
  }
}

export default App;
