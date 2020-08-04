import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import SelectMenu from './Components/SelectMenu';
import DialogForm from './Components/DialogForm';
import ButtonComponent from './Components/ButtonComponent';
import Display from './Components/Display';

function App() {
  const [open, setOpen] = React.useState(false);

  const [categ, setCateg] = React.useState('');

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (value) => setCateg(value);

  return (
    <Container
      maxWidth='lg'
      style={{
        border: '5px solid #4954ad',
        borderRadius: '5px',
        textAlign: 'center',
        padding: '10px',
      }}>
      <ButtonComponent
        style={{ width: '30%', margin: '20px 20px 20px 0' }}
        title={'Add'}
        onClick={handleClickOpen}
        icon={<AddCircleIcon />}
      />
      <SelectMenu handleChange={handleChange} categ={categ} />
      <DialogForm open={open} handleClose={handleClose} />
      <Display categ={categ} />
    </Container>
  );
}

export default App;
