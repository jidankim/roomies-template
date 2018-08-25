import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Day, Write } from 'components';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 32
  },
  dayOfWeek: {
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
    marginRight: theme.spacing.unit * 2,
    textAlign: 'right'
  },
  filterHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    fontSize: 20
  }
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      common: true,
      personal: true
    };
    this.handleUpdateMonth = this.handleUpdateMonth.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    let prev = {
      props: prevProps,
      state: prevState
    };

    let current = {
      props: this.props,
      state: this.state
    };

    if (JSON.stringify(prev) !== JSON.stringify(current)) {
      let filter = this.state.common ? 'c' : '';
      filter = this.state.personal ? filter + 'p' : filter;
      this.props.updateFilter(filter);
    }
  }

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.checked
    });
  };

  handleUpdateMonth = name => event => {
    if (name === 'left')
      this.props.updateMonth(this.props.monthIndex - 1);
    else
      this.props.updateMonth(this.props.monthIndex + 1);
  };

  handleToday = event => {
    this.props.updateMonth(moment().month() + 1);
  };

  render() {
    const {
      classes,
      currentUser,
      data,
      handlePost,
      month,
      monthIndex,
      onEdit,
      onRemove,
      year
    } = this.props;
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
        <div className={classes.filterHeader}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Filter: </FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.common}
                    onChange={this.handleChange('common')}
                    value="common"
                    color="primary"
                  />
                }
                label="Common"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.personal}
                    onChange={this.handleChange('personal')}
                    value="personal"
                  />
                }
                label="Personal"
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className={classes.header}>
          <Write onPost={handlePost} />
          <div>
            <IconButton
              disabled={monthIndex === 1}
              onClick={this.handleUpdateMonth('left')}
            >
              <KeyboardArrowLeftIcon className={classes.icon} />
            </IconButton>
            {` ${month} ${year} `}
            <IconButton
              disabled={monthIndex === 12}
              onClick={this.handleUpdateMonth('right')}
            >
              <KeyboardArrowRightIcon className={classes.icon} />
            </IconButton>
          </div>
          <Button onClick={this.handleToday}>Today</Button>
        </div>
        <Grid container spacing={0}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => {
            return (
              <Grid className={classes.dayOfWeek} key={d} item xs>
                {d}
              </Grid>
            );
          })}
        </Grid>
        {startOfWeeks.map(i => {
          return (
            <Week
              classes={classes}
              currMonth={currMonth}
              data={data}
              endOfPrevMonth={endOfPrevMonth}
              key={i}
              month={monthIndex}
              numDays={numDays}
              onEdit={onEdit}
              onRemove={onRemove}
              start={i}
              year={year}
            />
          );
        })}
      </div>
    );
  }
}

const Week = props => {
  const {
    classes,
    currMonth,
    data,
    endOfPrevMonth,
    month,
    numDays,
    onEdit,
    onRemove,
    start,
    year
  } = props;

  return (
    <Grid container spacing={0}>
      {[...Array(7).keys()].map(i => {
        return (
          <Day
            currMonth={currMonth}
            data={data}
            date={i + start}
            endOfPrevMonth={endOfPrevMonth}
            key={i}
            month={month}
            numDays={numDays}
            onEdit={onEdit}
            onRemove={onRemove}
            year={year}
          />
        );
      })}
    </Grid>
  );
};

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  data: PropTypes.array,
  handlePost: PropTypes.func,
  month: PropTypes.string,
  monthIndex: PropTypes.number,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  updateFilter: PropTypes.func,
  updateMonth: PropTypes.func,
  year: PropTypes.number
};

Calendar.defaultProps = {
  currentUser: '',
  data: [],
  onEdit: (id, index, contents) => {
    console.error('edit function not defined');
  },
  onRemove: (id, index) => {
    console.error('remove function not defined');
  }
};

export default withStyles(styles)(Calendar);
