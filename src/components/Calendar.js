import React from 'react';
import PropTypes from 'prop-types';
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
    padding: theme.spacing.unit * 2,
    textAlign: 'right',
    color: theme.palette.text.secondary,
    minHeight: 100
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
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement = (event) => {
    this.props.updateMonth(this.props.monthIndex - 1);
  }

  handleIncrement = (event) => {
    this.props.updateMonth(this.props.monthIndex + 1);
  };

  render() {
    // let weekRows = [];
    //
    // return <div className="container cal" />;
    const { classes, month, monthIndex, year } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div>{`${month} ${year}`}</div>
          <div>
            <IconButton
              disabled={monthIndex === 1}
              name="left"
              onClick={this.handleDecrement}
            >
              <KeyboardArrowLeftIcon className={classes.icon} />
            </IconButton>
            <Button>Today</Button>
            <IconButton
              disabled={monthIndex === 12}
              name="right"
              onClick={this.handleIncrement}
            >
              <KeyboardArrowRightIcon className={classes.icon} />
            </IconButton>
          </div>
        </div>
        <Grid container spacing={0}>
          <Grid item xs>
            <Card className={classes.card}>1</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>2</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>3</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>4</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>5</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>6</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>7</Card>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={0}>
          <Grid item xs>
            <Card className={classes.card}>1</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>2</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>3</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>4</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>5</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>6</Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card}>7</Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
//
// const Week = props => {
//   return props.days.map(d => {
//     <Day num={d} />;
//   });
// };
//
// const Day = props => {
//   return <div>`Day #${props.num}`</div>;
// };

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Calendar);
