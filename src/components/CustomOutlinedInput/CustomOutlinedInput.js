import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { primaryColor, secondaryColor } from 'assets/jss/material-kit-pro-react';

const useStyles = makeStyles({
  showDetail: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '56px',
    borderRadius: '12px',
    fontSize: '18px',
    color: primaryColor[0],
    lineHeight: '24px',
    fontWeight: '500',
    outline: 'none',
  },
  focused: {
    '& fieldset': {
      border: `1px solid${primaryColor[0]} !important`,
    },
  },
});

export default function CustomOutlinedInput(props) {
  const commonStyle = useStyles();
  const commonClasses = {
    root: commonStyle.showDetail,
    focused: commonStyle.focused,
  };
  const { classes } = props;
  return <OutlinedInput {...props} classes={Object.assign({}, commonClasses, classes)} />;
}

CustomOutlinedInput.defaultProps = {
  variant: 'outlined',
  fullWidth: true,
};
