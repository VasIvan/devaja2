import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import ButtonComponent from './ButtonComponent';

function Display(props) {
  const { categ } = props;

  const [stop, setStop] = React.useState(8);

  React.useEffect(() => {
    setStop(8);
  }, [categ]);

  const localStr = JSON.parse(localStorage.getItem('question'));
  const filteredStorage = localStr
    ? localStr.reduce(
        (acc, ele) =>
          ele.category.includes(categ)
            ? acc.concat({
                question: ele.question,
                category: ele.category,
                date: ele.date,
              })
            : acc,
        []
      )
    : [];

  const isEmptyArray = () => {
    if (filteredStorage === undefined || filteredStorage.length == 0) {
      return true;
    }
    return false;
  };

  const handleLoadMore = () => setStop(stop + 8);

  return (
    <>
      <Grid container spacing={1} justify='center'>
        {isEmptyArray() ? (
          <Grid item xs={12} sm={6}>
            <Alert severity='warning'>
              <strong>0 questions found in the Local Storage!</strong>
            </Alert>
          </Grid>
        ) : (
          filteredStorage &&
          filteredStorage
            .reverse()
            .slice(0, stop)
            .map((element) => (
              <Grid item xs={12} sm={3} key={element.date}>
                <Typography variant='h6' style={{ wordWrap: 'break-word' }}>
                  {element.date}
                </Typography>
                <Typography variant='h3' style={{ wordWrap: 'break-word' }}>
                  {element.category}
                </Typography>
                <Typography variant='h5' style={{ wordWrap: 'break-word' }}>
                  {element.question}
                </Typography>
              </Grid>
            ))
        )}
      </Grid>
      {filteredStorage.length > 8 && filteredStorage.length > stop && (
        <ButtonComponent
          style={{ width: '60%', margin: '20px 20px 20px 0' }}
          title={'Load More'}
          onClick={handleLoadMore}
          icon={<ArrowDropDownCircleIcon />}
        />
      )}
    </>
  );
}

export default Display;
