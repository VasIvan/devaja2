import React, {useState, useEffect} from 'react';
import './App.css';
import {useForm, Controller} from 'react-hook-form'
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';


function App() {
  const {register, handleSubmit, errors, control} = useForm()

  const [open, setOpen] = useState(false)

  const [categ, setCateg] = useState("")

  const [stop, setStop] = useState(8)

  useEffect( () => {
    setStop(8)
} , [categ])

  const date = new Date().toLocaleString()
  const localStr = JSON.parse(localStorage.getItem('question'));
  const filteredStorage = localStr ? localStr.reduce(
    (acc, ele) =>
      ele.category.includes(categ)
        ? acc.concat({
            question: ele.question,
            category: ele.category,
            date: ele.date
          })
        : acc,
    []
  ) : []

  const onSubmit = (data, e) => {
    e.preventDefault()
    data.date = date
    let exphone = [];
    if(localStorage.getItem("question") != undefined){ // do not change to !== it should be only !=
     exphone = JSON.parse(localStorage.getItem("question"));
    }
    exphone.push(data);
    localStorage.setItem("question",JSON.stringify(exphone));
    handleClose()
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCateg(event.target.value);
  };

  const isEmptyArray = () => {
    if (filteredStorage === undefined || filteredStorage.length == 0){
        return true
    }
    return false
  }

  return (
    <Container 
      maxWidth="lg" 
      style={{
        border: "5px solid #4954ad", 
        borderRadius: "5px", 
        textAlign: "center",
        padding: "10px"
        }}
    >
      <Button
        style={{ width: "30%", margin: "20px 20px 20px 0" }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => handleClickOpen()}
        startIcon={<AddCircleIcon />}
        >
            Add
      </Button>
      <FormControl
        style={{ width: "30%", margin: "15px 20px 20px 0" }} 
        variant="standard"
      >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categ}
          onChange={handleChange}
        >
          <MenuItem value={""}>ALL</MenuItem>
          <MenuItem value={"HTML"}>HTML</MenuItem>
          <MenuItem value={"CSS"}>CSS</MenuItem>
          <MenuItem value={"JS"}>JS</MenuItem>
        </Select>
      </FormControl>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ask The Guru!</DialogTitle>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>

          {errors.question &&  <Alert variant="outlined" severity="error">{errors.question.message}</Alert>}
          {errors.category &&  <Alert variant="outlined" severity="error">{errors.category.message}</Alert>}

          <TextField
              variant="standard"
              margin="normal"
              inputRef={register({required: 'Question required', minLength: {value:5, message: 'Question Min. lenght 5'}, maxLength: {value:255, message: 'Question Max. lenght 255'}})}
              fullWidth
              multiline
              rowsMax={5}
              name="question"
              label="Question for the Guru?"
              type="text"
          />

          <FormControl 
            style={{ width: "100%" }} 
            variant="standard"
            margin="normal"
          >
            <InputLabel>Category</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="HTML">HTML</MenuItem>
                  <MenuItem value="CSS">CSS</MenuItem>
                  <MenuItem value="JS">JS</MenuItem>
                </Select>
              }
              name="category"
              rules={{ required: "category is required" }}
              control={control}
              defaultValue=""
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' color="primary">
            Save
          </Button>
        </DialogActions>
        </form>
      </Dialog>

      <Grid container spacing={1} justify="center">
            { isEmptyArray()
              ?
              <Grid item xs={12} sm={6}>
                <Alert severity="warning">
                    <strong>0 questions found in the Local Storage!</strong>
                </Alert> 
              </Grid>
              :
            filteredStorage && filteredStorage.reverse().slice(0, stop).map( 
              element => 
                <Grid item xs={12} sm={3} key={element.date}>
                  <Typography variant="h6" style={{ wordWrap: "break-word" }}>{element.date}</Typography>
                  <Typography variant="h3" style={{ wordWrap: "break-word" }}>{element.category}</Typography>
                  <Typography variant="h5" style={{ wordWrap: "break-word" }}>{element.question}</Typography>
                </Grid>
            )}
      </Grid>
      {filteredStorage.length>8 && filteredStorage.length>stop && <Button
          style={{ width: "60%", margin: "20px 20px 20px 0" }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setStop(stop + 8)}
          startIcon={<ArrowDropDownCircleIcon />}
          >
          Load more
       </Button>}
    </Container>
  );
}

export default App;
