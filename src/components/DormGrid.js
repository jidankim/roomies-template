import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  demo: {
    height: 540,
    width: 720,
  },
  card: {
    padding: theme.spacing.unit * 2,
    height: 270,
    color: theme.palette.text.secondary,
  },
  media: {
    height: 200
  }
});


const DormGrid = props => {
  const { classes, dormData } = props;

  const images = {
    N20: {
      img: 'https://kds.kaist.ac.kr/static/images/goods/a1311558903.jpg',
      title: 'Seongsil'
    },
    N17: {
      img: 'https://kds.kaist.ac.kr/static/images/goods/a1311558764.jpg',
      title: 'Shilloe'
    },
    W4: {
      img: 'https://kds.kaist.ac.kr/static/images/goods/a1311555136.jpg',
      title: 'Heemang'
    },
    W6: {
      img: 'https://kds.kaist.ac.kr/static/images/goods/a1311556328.jpg',
      title: 'Miru'
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={40}
        className={classes.demo}
        alignItems='flex-start'
        direction='row'
        justify='center'
      >
        {Object.keys(dormData).map((key, index) => (
          <Grid key={index} item xs={6}>
            <Link to={`/${key}`}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={images[key].img}
                  title={images[key].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="title" component="h2">
                    {dormData[key].name}
                  </Typography>
                  <Typography component="p">
                    {`${dormData[key].capacity} left`}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(DormGrid);
