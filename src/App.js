import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Menu from './components/Menu';
import Product from './components/Product';
import Home from './components/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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

}));


export default function  App() {
  const classes = useStyles();
  return (
    <div>
      <Menu />

   <Switch>
        <Route exact path="/" > <Home /> </Route>
        <Route exact path="/product/:id"> <Product/> </Route>
   </Switch>
   <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          Copy right 2021
        </Toolbar>
  </AppBar>
   </div>
  );
}
