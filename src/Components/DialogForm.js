import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { useForm, Controller } from 'react-hook-form';

function DialogForm(props) {
  const { open, handleClose } = props;

  const date = new Date().toLocaleString();

  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.date = date;
    let localStorageArray = [];
    // do not change to !== it should be only !=
    if (localStorage.getItem('question') != undefined) {
      localStorageArray = JSON.parse(localStorage.getItem('question'));
    }
    localStorageArray.push(data);
    localStorage.setItem('question', JSON.stringify(localStorageArray));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Ask The Guru!</DialogTitle>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {errors.question && (
            <Alert variant='outlined' severity='error'>
              {errors.question.message}
            </Alert>
          )}
          {errors.category && (
            <Alert variant='outlined' severity='error'>
              {errors.category.message}
            </Alert>
          )}

          <TextField
            variant='standard'
            margin='normal'
            inputRef={register({
              required: 'Question required',
              minLength: { value: 5, message: 'Question Min. lenght 5' },
              maxLength: { value: 255, message: 'Question Max. lenght 255' },
            })}
            fullWidth
            multiline
            rowsMax={5}
            name='question'
            label='Question for the Guru?'
            type='text'
          />

          <FormControl
            style={{ width: '100%' }}
            variant='standard'
            margin='normal'>
            <InputLabel>Category</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value='HTML'>HTML</MenuItem>
                  <MenuItem value='CSS'>CSS</MenuItem>
                  <MenuItem value='JS'>JS</MenuItem>
                </Select>
              }
              name='category'
              rules={{ required: 'category is required' }}
              control={control}
              defaultValue=''
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogForm;
