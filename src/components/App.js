import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
// TODO: Determine appropriate imports
import SignX  from './SignX';
import NavBar from './NavBar';
import LogOut from './Logout';
import NewsFeed from './NewsFeed';
import Profile from './Profile';
import AuthHOC from './AuthHOC';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: should create a router with the following structure
    // /profile/:id? => Profile must be protected (hint how  can we use AuthHOC?)
    // /signx => SignX
    // /logout => Logout (must be protected)
    // /edit-profile  => EditProfile must be authenticated
    // /feed => NewsFeed must be authenticated
    // If it doesn't match anything, just put  the following syntax to say, render the signx page
    // <Route component={SignX}/>
    // Note the above should all be within a switch
    //
    // final html structure will look like
    //
    return (
    <div className='container-fluid'>
      <NavBar/>
      <div>
        <Switch>
        <Route path='/signx' component={SignX}/>
        <Route path='/logout' component={AuthHOC(LogOut)}/>
        <Route path='/feed' component={AuthHOC(NewsFeed)}/>
        <Route path='/profile/:id?' component={AuthHOC(Profile)}/>
        <Route component={SignX}/>
        </Switch>
      </div>
    </div>
    )
  }
}


export default App;
