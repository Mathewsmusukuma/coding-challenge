import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
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
    const { data, loading } = useFetch(`https://fakestoreapi.herokuapp.com/products/${id}`);
  
    return (
        <Container maxWidth="sm">
        {loading ? (
          <Container style={{marginTop: 20}}>
            <Typography>Loading...</Typography>
          </Container>
        ) : (
          <div className={classes.root} >
          <Paper className={classes.paper} m={-2}>
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={data.image.replace('https://fakestoreapi.com/', 'https://fakestoreapi.herokuapp.com/')} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {data.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ cursor: 'pointer' }}>{data.description}</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{ currency_symbol } { (data.price * currency).toFixed(2) }</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div> 
      )}
    </Container>
    );
}
