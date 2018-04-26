import React, { Component } from 'react';
import EventList from './EventList';
import ProfileBox from './ProfileBox';
import CreateEventBox from './CreateEventBox';
import { loadEventsForProfile } from '../actions/eventActions';
import { getUser } from '../actions/profileActions';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: the component should have  a ProfileBox  and EventList component, if
    // no id is specified in the url (you can check this by looking at
    // this.props.match.params.id) then render out a CreateEventBox else dont
    // the ProfileBox should have the props `id` corresponding  to this.props.match.params.id
    // `user` corresponding to a  function that will dispatch the getUser async function with
    // appropriate arguments
    // `favUnfav` corresponding to a function that  will dispatch the favUnfav async function with
    // appropriate arguments
    // the EventList should have a single property `loadEvents` equal  to a function that will
    // dispatch the loadEvents async function with appropriate arguments (in this case the
    // current user id which you can grab from this.props.match.params.id
    //
    // html structure
    let pID = this.props.match.params.id;
    let eventBox;
    let profBox;
    if (pID) {
      profBox = <ProfileBox id={pID} user={() => this.props.getUser(pID)} />;
    } else {
      eventBox = <CreateEventBox />;
      profBox = <ProfileBox user={() => this.props.getUser()} />
    }
    return (<div className="container">
      <h2>Profile</h2>
      <div className="row">
        <div className="col-md-4">
          {profBox}
        </div>
        <div className="col-md-8">
          {eventBox}
          <EventList loadEvents = {() => this.props.loadEvents(pID)} />
        </div>
      </div>
     </div>
  );
  }
}

const mapDispatchToProps = dispatch => ({
  // optionally use this to handle assigning dispatch actions to props
    getUser: id => dispatch(getUser(id)),
    loadEvents: id => dispatch(loadEventsForProfile(id))
  });

export default connect(null, mapDispatchToProps)(Profile);
