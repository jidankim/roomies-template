import React from 'react';

class Calendar extends React.Component {
    render() {
      let weekRows = [];

        return (
          <div className="container cal">

          </div>
        );
    }
}

const Week = (props) => {
  return props.days.map((d) => {
    <Day num={d} />
  });
}

const Day = (props) => {
  return (
    <div>
      `Day #${props.num}`
    </div>
  )
}

export default Calendar;
