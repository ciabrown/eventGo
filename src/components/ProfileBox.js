import React, { Component } from 'react';
import EventList from './EventList';
import { loadEventsForProfile } from '../actions/eventActions';
import { connect } from 'react-redux';

class ProfileBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.user(this.props.id);
  }

  render() {
    let email = this.props.profile.email;
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            { this.props.profile.name }
          </div>
          <br /> Email:
          { email }
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps, null)(ProfileBox);
