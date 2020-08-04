import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

function SelectMenu(props) {
  const { handleChange, categ } = props;

  const changeCategory = (event) => {
    handleChange(event.target.value);
  };
  return (
    <FormControl
      style={{ width: '30%', margin: '15px 20px 20px 0' }}
      variant='standard'>
      <InputLabel id='demo-simple-select-label'>Category</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={categ}
        onChange={changeCategory}>
        <MenuItem value={''}>ALL</MenuItem>
        <MenuItem value={'HTML'}>HTML</MenuItem>
        <MenuItem value={'CSS'}>CSS</MenuItem>
        <MenuItem value={'JS'}>JS</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectMenu;
