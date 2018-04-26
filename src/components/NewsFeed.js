import React, { Component } from 'react';
import EventList from './EventList';
import { connect } from 'react-redux';
import { loadEvents } from '../actions/eventActions';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: render out this component that is the newsfeed
    // should render out the DiscoverBirds component
    // note that it needs a property getDiscoverBirds that
    // is a function which dispatches the getDiscoverBirds action
    // also needs to mount TweetList with a property
    // loadTweets that is a function which dispatches the
    // loadTweets action.
    // ultimate html structure will look like
    // <div class="container">
    //  <h2>News Feed</h2>
    //  <div class="row">
    //    <div class="col-md-4">
    //      ...discoverbirds
    //    </div>
    //    <div class="col-md-8">
    //      ...tweetlist
    //    </div>
    //  </div>
    // </div>
    return (
      <div className="container">
        <h2>News Feed</h2>
          <div className="col-md-8">
            <EventList loadEvents = {this.props.loadEvents}/>
          </div>
        </div>
    );
  }
}


// hint hint ;)
const mapDispatchToProps = dispatch => ({
  loadEvents: () => dispatch(loadEvents())
});

export default connect(null, mapDispatchToProps)(NewsFeed);
