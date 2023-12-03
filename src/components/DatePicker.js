import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  datePicker: {
    width: '100px',
  },
});

export default function DatePickerComp({onDateChange}) {
  const classes = useStyles();
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(null);
  const [selectedDateTo, setSelectedDateTo] = React.useState(null);


  const handleDateFromChange = (date) => {
    setSelectedDateFrom(date);
    onDateChange({ from: date, to: selectedDateTo });
  };

  const handleDateToChange = (date) => {
    setSelectedDateTo(date);
    onDateChange({ from: selectedDateFrom, to: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date From"
          onChange={handleDateFromChange}
          className={classes.datePicker}
        />
      </DemoContainer>
      <div style={{ marginRight: '20px' }} />
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Date To"
          minDate={selectedDateFrom}
          onChange={handleDateToChange}
          className={classes.datePicker}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
