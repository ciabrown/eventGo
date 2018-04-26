import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewEvent } from '../actions/eventActions';

class CreateEventBox extends Component {
  constructor(props) {
    super(props);
    this.submitEvent = this.submitEvent.bind(this);
  }

  submitEvent(e) {
    e.preventDefault();
    let evDate = this.refs.eventDate.value;
    let evCat = this.refs.eventCat.value;
    let evLoc = this.refs.eventLoc.value;
    let evDesc = this.refs.eventDesc.value;
    // DONE: include a call to create a new event
    this.props.createNewEvent(evDate, evCat, evLoc, evDesc);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitEvent}>
          <div>
            <div className="form-group">
              <label>
                Event date?
              </label>
              <textarea className="form-control" ref="eventDate"></textarea>
              <label>
                Event category?
              </label>
              <textarea className="form-control" ref="eventCat"></textarea>
              <label>
                Event location?
              </label>
              <textarea className="form-control" ref="eventLoc"></textarea>
              <label>
                Event description?
              </label>
              <textarea className="form-control" ref="eventDesc"></textarea>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  // supply the component with a property 'createNewEvent' that will dispatch
  // the createNewEvent action  with the new event's content
  return {
    createNewEvent: (evDate, evCat, evLoc, evDesc) => dispatch(createNewEvent(evDate, evCat, evLoc, evDesc))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateEventBox);
