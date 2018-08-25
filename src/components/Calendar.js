import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, Divider, Grid, IconButton } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 20
  },
  card: {
    border: 'gray 1px solid',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    minHeight: 155
  },
  dateHeader: {
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 20
  },
  pastDates: {
    color: theme.palette.text.secondary
  },
  spacing: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  today: {
    height: 36,
    padding: 0,
    marginTop: 0,
    width: 36
  }
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleToday = this.handleToday.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let current = {
      props: this.props,
      state: this.state
    };

    let next = {
      props: nextProps,
      state: nextState
    };
    let update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }

  handleDecrement = event => {
    this.props.updateMonth(this.props.monthIndex - 1);
  };

  handleIncrement = event => {
    this.props.updateMonth(this.props.monthIndex + 1);
  };

  handleToday = event => {
    this.props.updateMonth(moment().month() + 1);
  };

  render() {
    const { classes, month, monthIndex, year } = this.props;
    // current month using month
    const currMonth = moment()
      .year(year)
      .month(month);
    // 0 for Sunday, month is 0 based index
    const startOfMonth = currMonth.startOf('month').day();
    const startOfWeek1 = 1 - startOfMonth;
    const startOfWeeks = [...Array(6).keys()].map(i => 7 * i + startOfWeek1);
    const numDays = currMonth.endOf('month').date();
    const endOfPrevMonth = currMonth
      .clone()
      .subtract(1, 'month')
      .endOf('month')
      .date();

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div>{`${month} ${year}`}</div>
          <div>
            <IconButton
              disabled={monthIndex === 1}
              onClick={this.handleDecrement}
            >
              <KeyboardArrowLeftIcon className={classes.icon} />
            </IconButton>
            <Button onClick={this.handleToday}>Today</Button>
            <IconButton
              disabled={monthIndex === 12}
              onClick={this.handleIncrement}
            >
              <KeyboardArrowRightIcon className={classes.icon} />
            </IconButton>
          </div>
        </div>
        {startOfWeeks.map(i => {
          return (
            <Week
              classes={classes}
              currMonth={currMonth}
              endOfPrevMonth={endOfPrevMonth}
              key={i}
              month={monthIndex}
              numDays={numDays}
              start={i}
            />
          );
        })}
      </div>
    );
  }
}

const Week = props => {
  const { classes, currMonth, endOfPrevMonth, month, numDays, start } = props;

  return (
    <Grid container spacing={0}>
      {[...Array(7).keys()].map(i => {
        return (
          <Day
            classes={classes}
            currMonth={currMonth}
            date={i + start}
            endOfPrevMonth={endOfPrevMonth}
            key={i}
            month={month}
            numDays={numDays}
          />
        );
      })}
    </Grid>
  );
};

const Day = props => {
  const { classes, currMonth, date, endOfPrevMonth, month, numDays } = props;

  const pastDates = date < 1 || date > numDays ? classes.pastDates : '';
  const monthPrefix = date === 1 ? currMonth.format('MMM') + ' ' : '';
  const nextMonthPrefix =
    date - numDays === 1
      ? currMonth
          .clone()
          .add(1, 'month')
          .format('MMM') + ' '
      : '';

  let displayDate;
  if (date < 1) displayDate = date + endOfPrevMonth;
  else if (date > numDays) displayDate = date - numDays;
  else displayDate = date;

  const dateHeader = (
    <div className={`${pastDates} ${classes.dateHeader}`}>
      <div className={classes.spacing}>
        {`${monthPrefix}${nextMonthPrefix}`}
      </div>
      {date === moment().date() && month === moment().month() + 1 ? (
        <Button
          variant="fab"
          color="secondary"
          className={classes.today}
          disabled
          style={{
            backgroundColor: '#f50057',
            color: 'white'
          }}
        >
          {`${displayDate}`}
        </Button>
      ) : (
        <div className={classes.spacing}>{`${displayDate}`}</div>
      )}
    </div>
  );
  return (
    <Grid item xs>
      <Card className={classes.card}>{dateHeader}</Card>
    </Grid>
  );
};

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  month: PropTypes.string,
  monthIndex: PropTypes.number,
  updateMonth: PropTypes.func,
  year: PropTypes.number
};

export default withStyles(styles)(Calendar);
