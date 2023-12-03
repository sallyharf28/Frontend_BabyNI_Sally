
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth({ handleKpiChange }) {
  const [kpi, setKpi] = React.useState('MAX_RX_LEVEL');

  const handleChange = (event) => {
    const selectedKPI = event.target.value;
    setKpi(selectedKPI);
    handleKpiChange(event.target.value);
  };


  return (
    <div>
      <FormControl sx={{ m: 3, minWidth: 80, height: '50px' }}>
        <InputLabel id="demo-simple-select-autowidth-label">KPI</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={kpi}
          onChange={handleChange}
          autoWidth
          label="KPI"
        >
          <MenuItem value="MAX_RX_LEVEL">MAX_RX_LEVEL</MenuItem>
          <MenuItem value="RSL_DEVIATION">RSL_DEVIATION</MenuItem>
          <MenuItem value="RSL_INPUT_POWER">RSL_INPUT_POWER</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
