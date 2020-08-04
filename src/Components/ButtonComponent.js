import React from 'react';
import Button from '@material-ui/core/Button';

function ButtonComponent(props) {
  const { title, onClick, icon, style } = props;
  return (
    <Button
      style={style}
      variant='contained'
      color='primary'
      size='large'
      onClick={onClick}
      startIcon={icon}>
      {title}
    </Button>
  );
}

export default ButtonComponent;
