import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, Grid } from '@material-ui/core';
import { Event } from 'components';

const styles = theme => ({
  card: {
    border: 'gray 1px solid',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    // minHeight: 155
    minHeight: 250
  },
  chips: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dateHeader: {
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'flex-end'
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

const Day = props => {
  const {
    classes,
    currMonth,
    data,
    date,
    endOfPrevMonth,
    month,
    numDays,
    onEdit,
    onRemove,
    year
  } = props;

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

  const chips = (
    <div className={classes.chips}>
      {data.map((event, i) => {
        return event.endDate.split('T')[0] ===
          moment()
            .year(year)
            .month(month - 1)
            .date(date)
            .format('YYYY-MM-DD') ? (
          <Event
            data={event}
            key={event._id}
            index={i}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ) : (
          undefined
        );
      })}
    </div>
  );
  return (
    <Grid item xs>
      <Card className={classes.card}>
        {dateHeader}
        {chips}
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(Day);
