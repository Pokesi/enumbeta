const styles = theme => ({
  container: {
    padding: '24px',
    margin: '8px 0 2rem',
    border: '2px solid ' + theme.palette.background.border,
    backgroundColor: theme.palette.background.primary,
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: '7.5px',
  },

  selectorContainer: {
    width: '100%',
    borderRadius: '15px',
  },

  selectorLabel: {
    color: theme.palette.text.secondary,
    marginBottom: '10px',
  },

  selector: {
    padding: '0',
    margin: '0',
  },

  label: {
    color: theme.palette.text.primary,
    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  },
  boost: {
    color: '#1a9467',
    fontWeight: 'bold',
    '& .MuiAvatar-root': {
      position: 'absolute',
      top: 0,
      right: '-20px',
    },
  },
  reset: {
    border: '1px solid ' + theme.palette.background.border,
    padding: '4px 8px',
    position: 'absolute',
    top: '7.5px',
    right: '7.5px',
    borderRadius: '15px',
    backgroundColor: theme.palette.background.default,
    '& .MuiButton-label': {
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  },
});

export default styles;
