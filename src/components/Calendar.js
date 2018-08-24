import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

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
  }
});

class Calendar extends React.Component {
  render() {
    // let weekRows = [];
    //
    // return <div className="container cal" />;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
