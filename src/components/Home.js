import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    width: 1000,
    marginTop: 20,
    marginBottom: 60,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const useFetch = (url) => {

  const [data, setData] = useState("");
  
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
  
    setData(data);
    setLoading(false);
  }, []);
  return {data, loading};
};

export default function  Home() {

  const [currency_symbol, setSymbol] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect (() => {
    const dollar = localStorage.getItem('dollar');
    const cur_symbol = localStorage.getItem('currency');
    setSymbol(cur_symbol);
    setCurrency(dollar);
    
  })
  const classes = useStyles();
  const { data, loading } = useFetch('https://fakestoreapi.com/products?limit=10');
  console.log(data);
  return (
    <Container maxWidth="sm">
      {loading ? (
        <Container style={{marginTop: 20}}>
          <Typography>Loading...</Typography>
        </Container>
      ) : (
       data.map((result=>(
        <div className={classes.root} >
        <Paper className={classes.paper} m={-2}>
          <Grid container spacing={16}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={result.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {result.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ cursor: 'pointer' }}><Link to={`/product/${result.id}`}>Description</Link></Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Price { currency_symbol } { (result.price * currency).toFixed(2) }</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div> 
    ))))}
   </Container>
   );
}