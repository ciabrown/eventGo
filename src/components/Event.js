import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { eventId, authorName, authorId, date, category, location, description} = this.props;
    let cardStyles = {
      marginBottom: '40px',
      padding: '10px',
    };
    let favoriteStyles = {
      color: '#FFF',
    };
    let authorUrl = `/profile/${authorId}`;
    return (
      <div className="card" style={cardStyles}>
        <h5 className="card-title">
          <Link to={authorUrl}> { authorName } </Link>
        </h5>
        <p>
          Date: 
          { date }
        </p>
        <p>
          Category: 
          { category }
        </p>
        <p>
          Location: 
          { location }
        </p>
        <p>
          Description: 
          { description }
        </p>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  // DONE: setup this function so that you're rendering the correct  event
  // ie looking at your state and just mapping the correct props onto
  // this component
  return state.event[ownProps.id]
}
  



export default connect(
  mapStateToProps,
)(Event);
