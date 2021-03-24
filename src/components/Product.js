import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    height: 'auto',
    marginTop: 10,
    paddingTop: 15,
  },
  img:{
    height: 600,
  },
}));

const useFetch = (url) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    }, []);
    return { data, loading };
  };
  
export default function  Product() {
    const currency = localStorage.getItem('dollar');
    const currency_symbol = localStorage.getItem('currency');
    const {id} = useParams()
    const classes = useStyles();
    const { data, loading } = useFetch(`https://fakestoreapi.com/products/${id}`);
  
    return (
        <Container maxWidth="sm">
        {loading ? (
          <Container style={{marginTop: 20}}>
            <Typography>Loading...</Typography>
          </Container>
        ) : (
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={data.image}
              title="Contemplative Reptile"
              className={classes.img}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button disabled size="small" color="primary">
              {currency_symbol} { (data.price * currency).toFixed(2) }
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
    );
}