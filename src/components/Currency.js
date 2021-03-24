import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CurrencySwich() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleCurrencyChange = (event) => {

      const currency = event.target.value;
      setAge(currency);
      localStorage.setItem('currency', currency);
      const base_currency = localStorage.getItem('currency');
      console.log(base_currency);
      fetch(`https://api.exchangeratesapi.io/latest?base=${base_currency}`)
      .then(res => res.json())
      .then(json => localStorage.setItem('dollar', json.rates["USD"]));
      window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Currency</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleCurrencyChange}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
