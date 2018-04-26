import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event';

class EventList extends Component {

  componentDidMount() {
    // DONE: load the tweets and set up an interval
    // that loads the tweets again every 2500 ms
    // Think about how you'd be able to load tweets
    // without doing additional imports...
    let me = this;
    me.props.loadEvents();
    let intervalFunc = setInterval(() => me.props.loadEvents(), 2500);
    this.setState({interval: intervalFunc});
  }

  componentWillUnmount() {
    // DONE: when the component is about to unmount
    // clear the interval (the one running every 2500 ms
    // ie stop  the refreshing)
    clearInterval(this.state.interval);
    this.setState({interval: null});
  }

  render() {
    // DONE: render out your  tweets (use the Tweet component with
    // appropriate arguments `id` to represent  the tweetId and
    // a key for react
    // ultimate html should look like
    let events = this.props.ids.map((i, idx) => {
      return (
        <Event id={i} key={idx}/>
      );
    });
    return (
      <div className="col-md-12">
      { events }
      </div>
    );
    
  }
}

const mapStateToProps = state => state.eventList;


export default connect(
  mapStateToProps,
  null
)(EventList);
