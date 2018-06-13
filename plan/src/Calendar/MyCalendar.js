import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from 'prop-types';
import DayEvent from './DayEvent.js';
BigCalendar.momentLocalizer(moment);

const messages = {
  allDay: 'Celý den',
  previous: '<',
  next: '>',
  today: 'Dziś',
  month: 'Miesiąc',
  week: 'Tydzien',
  day: 'Dzien',
  agenda: 'Plan',
  date: 'Data',
  time: 'Godzina',
  event: 'Wydarzenie',
};

class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDate: props.defaultDate,
      defaultView: props.defaultView,
      events: []
    };
  }

  componentDidMount() {
    var name = this.props.filteredName;
    if (name !== "") {
      var filteredArray = [];
      for (let index = 0; index < this.props.events.length; index++) {
        const element = this.props.events[index];
        var name1 = element.person.split(' ').join('');
        var name2 = name.split(' ').join('');
        if (name1 === name2) {
          filteredArray.push(element);
        }
      }
      this.setState({
        events: filteredArray
      });
    } else {
      this.setState({
        events: this.props.events
      });
    }
  }


  render() {
    return (
      <div className="container">
        <BigCalendar
          defaultDate={this.state.defaultDate}
          defaultView={this.state.defaultView}
          events={this.state.events}
          messages={messages}
          style={{ height: "100vh" }}
          eventPropGetter={this.eventStyleGetter}
          components={{
            day: { event: DayEvent },
          }}
          onView={this.onView}
          onNavigate={this.onNavigate}
        />
      </div>);
  }
  onView = (view) => {
    this.props.updateView(view);
  }
  onNavigate = (date) => {
    this.props.updateDate(date);
  }
  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      opacity: 0.8,
      color: 'black',
      border: '1px',
      display: 'block'
    };
    return { style: style };
  };
}

MyCalendar.propTypes = {
  events: PropTypes.array,
  filteredName: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
  updateView: PropTypes.func,
  updateDate: PropTypes.func
};


export default MyCalendar;